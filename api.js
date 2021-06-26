const { readFileSync } = require('fs')
const { join } = require('path')
const axios = require('axios')
const movies = require('./App')
const { render } = require('ejs')

async function current (ID) {
  console.log(ID)
  try {
    const main = await mainDt(ID)
    if (typeof main === 'object') return render(readFileSync(join('_files', 'badge.ejs')).toString(), { main: main, cover: await getBase64(main.coverImage) })
    else return readFileSync(join('_files', 'nothing.ejs')).toString()
  } catch (e) {
    console.log(e)
    return readFileSync(join('_files', 'oop.ejs')).toString()
  }
}
module.exports = { current, mainDt }
async function getBase64 (url) {
  return Buffer.from((await axios.get(url, { responseType: 'arraybuffer' })).data).toString('base64')
}
async function mainDt (ID) {
  return await movies(ID, process.env.TRAK, process.env.TMDB, 300)
}
