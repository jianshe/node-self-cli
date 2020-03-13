const fs = require('fs')
function delDir(path) {
  let files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    if (files && files.length > 0) {
      files.forEach(file => {
        const curPath = path + '/' + file
        if (fs.statSync(curPath).isDirectory()) {
          delDir(curPath) // 递归删除文件夹
        } else {
          fs.unlinkSync(curPath) // 删除文件
        }
      })
    } else {
      fs.rmdirSync(path) // 删除当前目录
    }
  }
}

module.exports = async function(path) {
  delDir(path)
}
