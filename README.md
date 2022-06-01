# simplestCMS

The **simplest "headless" Content Management System** to simplify your everyday life as a web developer, empowered by [Handlebars](https://www.npmjs.com/package/handlebars/).

> The quieter you become, the more you are able to hear. ~ Rumi

## Installation

Simply run:

```sh
npm i -g @g-roll/simplestcms
```

## Usage

Specify a source and destination directory of your HTML and XML, as well as a data source file in JSON format and generate a static site on the fly 🚀

```sh
simplestcms -s <path/to/source/dir> -t <path/to/target/dir> -d <path/to/file.json>
```

### Handlebars expressions

Write your HTML as usual and add handlebars expressions for your dynamic content.

#### Example:

```html
<p class="{{foo}}">{{bar}}</p>
```

Handlebars expressions correspond to **keys** and add the matching **value** you set in the JSON source file.

```json
{
  "foo": "Hello",
  "bar": "World",
}
```

Turns into:

```html
<p class="Hello">World</p>
```

For advanced functionality, like **loops** or **if functions**, please read the official [Handlebars docs](https://handlebarsjs.com/guide/expressions.html).

### Handlebars partials

Handlebars refer to parts of templates as **partials**. To nest partials within templates and resolve them recursively with expressions (or other partials), simply add `.partial` before the file extension.

#### Example:

```sh
path/to/source/dir
├── foo.partial.html
└── some_dir
   └── bar.partial.html
```

These partials can be called as follows:

```html
<p>{{foo.partial.html}}</p>
<p>{{some_dir/bar.partial.html}}</p>
```

Again, for advanced functionality, like **dynamic** or **contextual** partials, please read the official [Handlebars docs](https://handlebarsjs.com/guide/partials.html).

> **Note**: All files in the source directory that contain the string `.partial` are registered automatically. Therefore, contrary to the documentation, there is no need to have them registered.

### Extra: Automatic HTML (re)generation

To monitor file changes and automatically (re)generate your HTML, I recommend using [nodemon](https://www.npmjs.com/package/nodemon):

```sh
nodemon --exec 'simplestcms -s <path/to/source/dir> -t <path/to/target/dir> -d <path/to/file.json>' -w <path/to/source/dir/*.html>
```

## Dependencies

- [Handlebars](https://www.npmjs.com/package/handlebars/)
- [Commander.js](https://www.npmjs.com/package/commander)
- [fs-extra](https://www.npmjs.com/package/fs-extra)

## License

MIT