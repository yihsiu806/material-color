// const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const data = fs.readFileSync('material-design-color-palettes', 'utf-8')
const $ = cheerio.load(data)

let palettes = []

$('.palette').each(function () {
  let palette = []
  $(this).children().each(function () {
    palette.push({
      label: $(this).find('.label').text(),
      value: $(this).find('.value').text()
    })
  })
  palettes.push(palette)
})

fs.writeFileSync('palettes.json', JSON.stringify(palettes))
