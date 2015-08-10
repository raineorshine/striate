var chai    = require('chai')
var should  = chai.should()
var fs      = require('fs')
var striate = require('../index.js')

var testFilesPath = __dirname + '/files/'

function assertTestFiles(file, data, options) {
  striate(fs.readFileSync(testFilesPath + file + '-in.js', 'UTf-8'), data, options)
  .should.equal(fs.readFileSync(testFilesPath + file + '-out.js', 'Utf-8'))
}

describe('striate', function() {

  it('should convert a basic template to ejs', function() {
    assertTestFiles('basic')
  })

  it('should handle multiple lines of templating', function() {
    assertTestFiles('two-line')
  })

  it('should de-indent blocks if the indent option is true', function() {
    assertTestFiles('indent', null, { indent: true })
  })

  it('should convert a nested template to ejs', function() {
    assertTestFiles('nested')
  })

  it('should render the template if data is passed in', function() {
    assertTestFiles('render-true', { a: true })
    assertTestFiles('render-false', { a: false })
  })

  it('should disable rendering with render:false', function() {
    assertTestFiles('basic', { a: true }, { render: false })
  })

})
