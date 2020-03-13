//异步删除一个文件夹
const fs = require('fs')
const path = require('path')

function rmdirp(dir) {
  return new Promise((resolve, reject) => {
    fs.stat(dir, function(err, status) {
      if (err) throw err
      if (status.isDirectory()) {
        //是文件夹
        fs.readdir(dir, function(err, file) {
          let res = file.map(item => rmdirp(path.join(dir, item)))
          Promise.all(res).then(() => {
            //当所有的子文件都删除后就删除当前文件夹
            fs.rmdir(dir, resolve)
          })
        })
      } else {
        fs.unlink(dir, resolve)
      }
    })
  })
}

module.exports = rmdirp
