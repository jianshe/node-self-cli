const fs = require('fs')

function handleCopy(src, dst) {
  const paths = fs.readdirSync(src) // 同步读取目录内容
  paths.forEach(path => {
    const _src = src + '/' + path
    const _dst = dst + '/' + path
    fs.stat(_src, (err, stats) => {
      if (err) throw err
      if (stats.isFile()) {
        // 如果是个文件则拷贝
        const readable = fs.createReadStream(_src) // 创建读取流
        const writable = fs.createWriteStream(_dst) // 创建写入流
        readable.pipe(writable)
      } else if (stats.isDirectory()) {
        // 是目录则递归
        fs.exists(_dst, exist => {
          if (exist) {
            // 存在
            handleCopy(_src, _dst)
          } else {
            // 不存在 先创建输出目录再复制
            fs.mkdir(_dst, err => {
              if (err) throw err
              // 创建目录
              handleCopy(_src, _dst)
            })
          }
        })
      }
    })
  })
}

module.exports = async function(src, dst) {
  handleCopy(src, dst)
}
