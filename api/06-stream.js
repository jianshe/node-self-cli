// 二进制文件传输
const fs = require('fs')
const rs = fs.createReadStream('./picture.png')
const ws = fs.createWriteStream('./picture2.png')
rs.pipe(ws)