# striate

[![Join the chat at https://gitter.im/metaraine/striate](https://badges.gitter.im/metaraine/striate.svg)](https://gitter.im/metaraine/striate?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm version](https://img.shields.io/npm/v/striate.svg)](https://npmjs.org/package/striate)
[![Build Status](https://travis-ci.org/metaraine/striate.svg?branch=master)](https://travis-ci.org/metaraine/striate)

**striate** is a thin wrapper for [ejs](https://github.com/mde/ejs) that is smart about line breaks, so you don't have to worry so much about delimiter placement.

## Install

```sh
$ npm install --save striate
```

## Usage

**striate** uses `>>` at the beginning of a line as the delimiter.

The entire line will be excluded from the output.

```js
var striate = require('striate')

var input = 
`var a = 10;

>> if(b) {
var b = 20;
>> }

var c = 30;`

var output1 = striate(input, { b: true })
/*
var a = 10;

var b = 20;

var c = 30;
*/

var output2 = striate(input, { b: false })
/*
var a = 10;

var c = 30;
*/
```

### API:

`var output = striate(input, data, options)`

* **input** - The input template (string)
* **data** - The data to be injected into the template (object)
* **options** - Options that are passed along to ejs (object)

Options:

```js
{
  // By default striate takes data and renders your template using ejs.
  // Set to false to output an unrendered ejs template instead.
  render: true,
  
  // If you prefer to indent all lines of code between >> delimeters without
  // it affecting the output, set this to true.
  indent: false
}
```

## Under the hood

**striate** transforms templates directly into ejs, but with whitespace placed correctly near delimiters.

```js
var a = 10;

>> if(b) {
var b = 20;
>> }

var c = 30;
```

is exactly the same as the following [ejs]() code:

```js
var a = 10;

<% if(b) {
%>var b = 20;
<% }
%>
var c = 30;
```

*Note: **striate**'s functionality is similar to slurp syntax `<%_ ... _%>` [introduced in ejs](https://github.com/mde/ejs/pull/105), but better for nested indentation.*


## License

ISC © [Raine Lourie](https://github.com/metaraine)
