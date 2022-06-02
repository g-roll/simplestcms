#!/usr/bin/env node

import {readFileSync, readdirSync, lstatSync, existsSync} from 'fs'
import {outputFile} from 'fs-extra'
import {program} from 'commander'
import Handlebars from 'handlebars'

program
  .option('-s, --source <path/to/source/dir>', 'input directory')
  .option('-t, --target <path/to/target/dir>', 'output directory')
  .option('-d, --data <path/to/file.json>', '[optional] global data file')
  .description('Specify a source and destination directory of your HTML/XML code. Handlebars expressions are dynamically resolved using the JSON file of the corresponding filename (e.g. index.html.json), optionally with a declared global data JSON file.. More information at github.com/g-roll/simplestcms.')
  .usage('-s <path/to/source/dir> -t <path/to/target/dir>')
program.parse()

const templateList = []
const partialList = []

async function dataOption() {
  if (existsSync(program.opts().data)) {
      let result = await JSON.parse(readFileSync(program.opts().data), 'utf8')

      return result
  } else {
      let result = null

      return result
  }
}

async function fileLookup(sourceDir) {
  readdirSync(sourceDir).forEach(async function(file) {
      let filePath = sourceDir + file

      if (lstatSync(filePath).isDirectory()) {
          await fileLookup(filePath + '/')
      } else if (/^.*((\.html)|(\.xml))$/.test(filePath)) {
          if (/^.*(\.partial).*$/.test(filePath)) {
              partialList.push(filePath)
          } else {
              templateList.push(filePath)
          }
      }
  })
}

async function partialRegistration(dataSpread) {
  partialList.forEach(async function(partial) {
      let partialContents = Handlebars.compile(readFileSync(partial, 'utf8'))

      Handlebars.registerPartial(partial.split(program.opts().source + '/').pop(), partialContents(dataSpread))
  })
}

console.time('[simplestcms]: Done 🎉 Completed in')
async function main(source, target, _dataSrc) {
  const dataGlobal = await dataOption()

  await fileLookup(source)

  templateList.forEach(async function(template) {
      let templateContents = Handlebars.compile(readFileSync(template, 'utf8').toString())
      let relPath = target + await template.split(program.opts().source + '/').pop()

      if (existsSync(template + '.json')) {
          let dataLocal = await JSON.parse(readFileSync(template + '.json', 'utf8'))

          partialRegistration({
              ...dataGlobal,
              ...dataLocal
          }) // await was not used because a promise would have led to a distorted result

          await outputFile(relPath, templateContents({
              ...dataGlobal,
              ...dataLocal
          }))
      } else {
          partialRegistration(dataGlobal)
          await outputFile(relPath, templateContents(dataGlobal))
      }
  })
}

await main(program.opts().source + '/', program.opts().target + '/', program.opts().data)
console.log('[simplestcms]: {' + templateList.map(e => ['\n'+e]) + '\n} generated.')
console.timeEnd('[simplestcms]: Done 🎉 Completed in')