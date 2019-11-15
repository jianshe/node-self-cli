// 创建一个长度为10字节以0填充的Buffer
const buff1 = Buffer.alloc(10)
console.log(buff1)

// 创建一个Buffer包含ascii.
const buff2 = Buffer.from('a')
console.log(buff2,buff2.toString())

// 创建Buffer包含UTF-8字符
const buff3 = Buffer.from('中文')
console.log(buff3)

// 合并Buffer
const buff4 = Buffer.concat([buff2,buff3])
console.log(buff4, buff4.toString())