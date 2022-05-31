# simplestCMS
The **simplest "headless" Content Management System** to simplify your everyday life as a web developer, empowered by [Handlebars](https://www.npmjs.com/package/handlebars/).

## Installation
Simply run:
```sh
npm i -g simplestcms
```

## Usage
Specify a source and destination directory of your HTML, as well as a data source file in JSON format and generate a static site on the fly 🚀
```sh
simplestcms -s <path/to/source/directory> -t <path/to/target/directory> -d <path/to/file.json>
```
> Note: The trailing slash must **not** be included.

### Handlebars expressions
Write your HTML as usual and add handlebars expressions for your dynamic content.
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

Example output:
```html
<p class="Hello">World</p>
```
For advanced functionality, like **loops** or **if functions**, please read the official [Handlebars docs](https://handlebarsjs.com/guide/).

### Extra: Automatic HTML (re)generation
To monitor file changes and automatically (re)generate your HTML, I recommend using [nodemon](https://www.npmjs.com/package/nodemon):
```sh
nodemon simplestcms -s <path/to/source/directory> -t <path/to/target/directory> -d <path/to/file.json>
```

## Dependencies
- [Handlebars](https://www.npmjs.com/package/handlebars/)
- [Commander.js](https://www.npmjs.com/package/commander)
- [fs-extra](https://www.npmjs.com/package/fs-extra)

## License
MIT