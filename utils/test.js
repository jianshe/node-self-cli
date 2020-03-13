const path = require('path')
const delDir = require('./delDir')
const {dirExists} = require('./dirExists')
const SOURCE_PATH = path.resolve(__dirname, './test/a')
const handleCopy = require('./handleCopy')
const INPUT_SOURCE_PATH = 'G:/gitPro/vue-self-ssr/dist'
const rmdirp = require('./rmdirp')
const { logger } = require('./logger')
async function main() {
//   const DELDIR_PATH = path.resolve(__dirname, './test')
//   await delDir(SOURCE_PATH)
    await dirExists(SOURCE_PATH)
    // await handleCopy(INPUT_SOURCE_PATH,SOURCE_PATH)
}

// main()
// logger.error('输入错误')
// rmdirp(SOURCE_PATH)