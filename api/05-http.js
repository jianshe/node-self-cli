const http = require('http');
const fs = require('fs');
const server = http.createServer((request, response) => {
  // response.end('hello...')
  const { url, method, headers } = request;
  if (url === '/' && method === 'GET') {
    // 静态页面服务
    fs.readFile('index.html', (err, data) => {
      if (err) {
        response.writeHead(500,{'Content-Type':'text/plain;charset=utf-8'})
        response.end('500 服务器错误')
      }
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
      response.end(data);
    });
  } else if (url === '/users' && method === 'GET') {
    // AJAX服务
    response.writeHead(200, {
      'Content-Type': 'application/json'
    });
    response.end(
      JSON.stringify({
        name: 'albert'
      })
    );
  } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    // 图片文件服务
    fs.createReadStream('./' + url).pipe(response);
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type','text/plain;chartset=utf-8')
    response.end('404 页面没有找到')
  }
});
server.listen(3000);
