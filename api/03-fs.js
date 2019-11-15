const fs = require('fs')

// 同步
// const data = fs.readFileSync('../lib/download.js')
// console.log(data, data.toString())

// 异步方式 
fs.readFile('../lib/download.js',(err, data) => {
    if (err) throw err
    console.log(data.toString())
})