#!/usr/bin/env node
import {readFileSync, readdirSync, lstatSync} from 'fs'
import {outputFile} from 'fs-extra'
import {program} from 'commander'
import Handlebars from 'handlebars'

program
  .option('-s, --source <path/to/source/directory>')
  .option('-t, --target <path/to/target/directory>')
  .option('-d, --data <path/to/file.json>')
  .description('The simplest CMS to simplify your everyday life as a web developer. Specify a source and destination directory of your HTML code, as well as a data source file in JSON format. Include some handlebars expressions in your HTML source code to fetch the data from the JSON file and generate a static site on the fly 🚀 You can find more information at github.com/g-roll/simplestcms.')
  .usage('-s <path/to/source/directory> -t <path/to/target/directory> -d <path/to/file.json>')
program.parse()

const dataJSON = JSON.parse(readFileSync(program.opts().data))
let date = new Date()

async function main(sourceDir, targetDir, _dataSrc) {
  readdirSync(sourceDir).forEach(file => {
    let filePath = sourceDir+file

    if (lstatSync(filePath).isDirectory()) {
      main(filePath+'/', targetDir, _dataSrc)
    }

    else if (/\.html$/.test(filePath)) {
      let template = Handlebars.compile(readFileSync(sourceDir+file,'utf8').toString())
      let fileContents = template(dataJSON)
      let relPath = targetDir+filePath.split(program.opts().source+'/').pop()

      outputFile(relPath, fileContents)
      console.log('🚀 simplestCMS: ´'+relPath+'´ generated. ['+date.toLocaleTimeString()+']')
    }
  })
}

await main(program.opts().source+'/', program.opts().target+'/', program.opts().data)