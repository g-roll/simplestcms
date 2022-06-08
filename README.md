# simplestCMS

The **simplest "headless" Content Management System** to simplify your everyday life as a web developer, empowered by [Handlebars](https://www.npmjs.com/package/handlebars/).

> The quieter you become, the more you are able to hear. ~ Rumi

## Installation

Simply run:

```
npm i -g @g-roll/simplestcms
```

## Usage

Specify a source and destination directory of your HTML and XML, as well as a data source file in JSON format and generate a static site on the fly 🚀

```
simplestcms -s <path/to/source/dir> -t <path/to/target/dir>

Options:
  -s, --source <path/to/source/dir>     input directory
  -t, --target <path/to/target/dir>     output directory
  -d, --data <path/to/file.json>        [optional] global data file
  -f, --functions <path/to/file.js>     [optional] custom handlebars helpers file
  -h, --help                            display help for command
```

### Expressions

Write your HTML as usual and add handlebars expressions for your dynamic content.

#### Example:

```html
<p class="{{foo}}">{{bar}}</p>
```

Handlebars expressions correspond to **keys** and add the matching **value** you set in the JSON source files.


```json
{
  "foo": "Hello",
  "bar": "World"
}
```

Turns into:

```html
<p class="Hello">World</p>
```

For advanced functionality, like **loops** or **if functions**, please read the official [Handlebars docs](https://handlebarsjs.com/guide/expressions.html).

### Data mapping

To map a JSON file to an HTML or XML file, name the JSON file the same as the source file, including the file extension (for example, *index.html.json*), and place it in the same directory.

Optionally, you can also specify a JSON file for global expressions with the `-d <path/to/file.json>` option.

> **Note**: Local expressions **will override** global expressions, if they have the same key.

#### Example

In this example, an angle bracket indicates which JSON file is mapped to which HTML source file.

```
simplestcms -d source/dir/global.json ...

source/dir
├── foo.html < global.json
├── global.json
└── some_dir
   ├── bar.html < global.json, bar.html.json
   └── bar.html.json
```

### Partials

Handlebars refer to parts of templates as **partials**. To nest partials within templates and resolve them recursively with expressions (or other partials), simply add `.partial` before the file extension.

> **Note**: Partials use the global and local expressions of the templates that call those.

#### Example:

```
source/dir
├── some.partial.html
└── some_dir
   └── some.partial.html
```

These partials can be called as follows:

```html
<div>
  {{some.partial.html}}
</div>
<div>
  {{some_dir/some.partial.html}}
</div>
```

Again, for advanced functionality, like **dynamic** or **contextual** partials, please read the official [Handlebars docs](https://handlebarsjs.com/guide/partials.html).

> **Note**: All files in the source directory that contain the string `.partial` are registered automatically. Therefore, contrary to the documentation, there is no need to have them registered.

### Custom helper functions

If handlebars lacks some functions, you can add the desired function in a project-wide function file with the `-f <path/to/file>` option.

#### Example

To register handlebars helpers, bundle them in an [export default](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#description) statement:

```js
import Handlebars from "handlebars"

export default function() {
  // Handlebars.registerHelper('someName', (some options/context) => {
  //   your logic    
  // })
  //
  // Handlebars.registerHelpe... etc
}
```

> **Note**: If your code runs into an error, the program will ignore **ALL** helpers and continue to generate your static pages.

### Extra: Automatic HTML (re)generation

To monitor file changes and automatically (re)generate your HTML, I recommend using [nodemon](https://www.npmjs.com/package/nodemon):

```
nodemon --exec 'simplestcms -s <path/to/source/dir> -t <path/to/target/dir>' -w <path/to/source/dir/*.html>
```

## Dependencies

- [Handlebars](https://www.npmjs.com/package/handlebars/)
- [Commander.js](https://www.npmjs.com/package/commander)
- [fs-extra](https://www.npmjs.com/package/fs-extra)

## License

MIT