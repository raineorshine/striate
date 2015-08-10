var ejs = require('ejs')
var detectIndent = require('detect-indent')

var templateChar = '>>'
var ejsStart = '<%'
var ejsEnd = '%>'
var regex = {
  blocks: new RegExp('^([\\bt ]*>>.*{\\s*\\n)([\\s\\S]*?)(\\n\\s*>>\\s*}\\s*$)', 'gm'),
  templateLine: new RegExp('^[\\t ]*' + templateChar + '(.*\\n)', 'gm')
}

// de-ident the given input one level
function deindent(input, indent) {
  return input.replace(new RegExp('^' + indent, 'gm'), '')
}

// replace blocks as long as there is a match
function deindentBlocks(input) {
  var indent = detectIndent(input).indent
  return input.replace(regex.blocks, function (match, start, body, end) {
    return start + deindent(body, indent) + end
  })
}

function striate(input, data, options) {

  options = options || {}

  // if data was provided and options.render was not defined, default to render
  if (data && typeof options.render === 'undefined') {
    options.render = true
  }

  var template = (options.indent ? deindentBlocks(input) : input)
    // now replace striate template with ejs
    .replace(regex.templateLine, function (match, content) {
      return ejsStart + content + ejsEnd
    })

  return data && options.render ? ejs.render(template, data) : template
}

module.exports = striate
