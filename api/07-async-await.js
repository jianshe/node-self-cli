global.fetch = require('node-fetch');
// const superagent = require('superagent');
// 1.1分钟后输出hello world
// function timeout(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve,ms)
//   })
// }
// async function asyncPrint(value,ms) {
//   await timeout(1000);
//   console.log(value)
// }

// asyncPrint('hello world', 50);
// 2.返回Promise对象
// async function f() {
//   return 'hello world';
// }

// f().then(v => console.log(v))

// 3.错误处理
// async function f() {
//   throw new Error('出错了');
// }
// f().then(v => console.log(v),e => console.log(e))
// 4.Promise对象的状态变化
// async function getTitle(url) {
//   let response = await fetch(url);
//   let html = await response.text();
//   return html.match(/<title>([\s\S]+)<\/title>/i)[1];
// }

// getTitle('https://tc39.github.io/ecma262/').then(console.log)
// 5.await命令后面是一个thenable对象（即定义then方法的对象），那么await会将其等同于Promise对象
// class Sleep {
//   constructor(timeout) {
//     this.timeout = timeout;
//   }
//   then(resolve, reject) {
//     const startTime = Date.now();
//     setTimeout(() => resolve(Date.now() - startTime), this.timeout);
//   }
// }
// (async () => {
//   const sleepTime = await new Sleep(1000);
//   console.log(sleepTime)
// })();
// 6.实现休眠效果
// function sleep(interval) {
//   return new Promise(resolve => {
//     setTimeout(resolve,interval);
//   })
// }
// // 用法
// async function one2FiveInAsync() {
//   for(let i=1;i<=5;i++) {
//     console.log(i);
//     await sleep(1000)
//   }
// }
// one2FiveInAsync()

// 7.异步操作失败，不要中断后面的异步操作
// 方法1 ：出错的await放到try...catch结构里面
// async function f() {
//   try {
//     await Promise.reject('出错了');
//   } catch (e) {
//     console.log(e)
//   }
//   return await Promise.resolve('hello world')
// }
// f().then(v => console.log(v))
// 方法2 await后面的Promise对象再跟一个catch方法，处理前面可能出现的错误。
// async function f() {
//   await Promise.reject('出错了').catch(e => console.log(e))
//   return await Promise.resolve('hello world')
// }
// f().then(v => console.log(v))
// 8.如果await后面的异步操作出错，那么等同于async函数返回的Promise对象被reject。
// async function f() {
//   await new Promise(function (resolve, reject) {
//     throw new Error('出错了');
//   })
// }
// f().then(v=> console.log(v)).catch(e => console.log(e))
// 防止出错
// async function f() {
//   try {
//     await new Promise(function (resolve, reject) {
//       throw new Error('出错了')
//     })
//   } catch (e) {
//     console.log(e)
//   }
//   return await 'hello world'
// }
// f().then(v=> console.log(v)).catch(e => console.log(e))

// 9.实现多次重复尝试
// const superagent = require('superagent');
// const NUM_RETRIES = 3;

// async function test() {
//   let index;
//   for (index = 0; index < NUM_RETRIES; index++) {
//     try {
//       await superagent.get('http://google.com/this-throws-an-error');
//     } catch (e) {
      
//     }
//   }
//   console.log(index)
// }

// test();

// 10.多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。这样可以缩短程序的执行时间
// // 写法一
// let [foo,bar] = await Promise.all([getFoo(),getBar()]);

// // 写法二
// let fooPromise = getFoo();
// let barPromise = getBar();
// let foo = await fooPromise;
// let bar = await barPromise;

// 11、使用注意点：
 // 1.下面代码会报错，因为await用在普通函数之中了。但是，如果将forEach方法的参数改为async函数，也有问题,原因是这时三个db.post操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用for循环
//  async function dbFun(db) {
//    let docs = [{},{},{}];
//    // 报错
//    docs.forEach(async doc => {
//      await db.post(doc);
//    })
//  }
// 方法一 使用for循环
//  async function dbFun(db) {
//    let docs = [{}, {}, {}]
//    for(let doc of docs) {
//      await db.post(doc);
//    }
//  }
//  // 方法2 使用数组的reduce方法。
//  async function dbFun(db) {
//    let docs = [{}, {}, {}];
//    await docs.reduce(async (_,doc) => {
//      await _;
//      await db.post(doc);
//    }, undefined);
//  }
// 2.如果确实希望多个请求并发执行，可以使用Promise.all方法。当三个请求都会resolved时，下面两种写法效果相同。
// async function dbFuc(db) {
//   let docs = [{},{},{}]
//   let promises = docs.map((doc) => db.post(doc));

//   let results = Promise.all(promises);
//   console.log(results);
// }

// // 或者使用下面的写法
// async function dbFuc(db) {
//   let docs = [{},{},{}]
//   let promises = docs.map((doc) => db.post(doc));

//   let results = [];
//   for (let promise of promises) {
//     results.push(await promise);
//   }
//   console.log(results)
// }
// 12、经典案例一 按顺序完成异步操作
// 依次远程读取一组URL,然后按照读取的顺序输出结果。
// 1.promise的写法如下 
// function logInOrder(urls) {
//   // 远程读取所有URL
//   const textPromises = urls.map(url => {
//     return fetch(url).then(response => response.text());
//   })

//   // 按次序输出
//   textPromises.reduce((chain, textPromises) => {
//     return chain.then(() => textPromises).then(text => console.log(text),Promise.resolve());
//   })
// }
// 2.async 函数实现,这样做效率很差，非常浪费时间。我们需要的是并发发出远程请求。
  // async function logInOrder(urls) {
  //   for (const url of urls) {
  //     const response = await fetch(url);
  //     console.log(await response.text());
  //   }
  // }
  // 3.async 函数实现，并发发出远程请求。虽然map方法的参数是async函数，但它是并发执行的，因为
  // 只有async函数内部是继发执行，外部不受影响。后面的for...of 循环内部使用了await，因此实现了按顺序输出。
  // async function logInOrder(urls) {
  //   // 并发读取远程URL
  //   const textPromises = urls.map(async url => {
  //     const response = await fetch(url);
  //     return response.text();
  //   });

  //   // 按次序输出
  //   for(const textPromise of textPromises) {
  //     console.log(await textPromise)
  //   }
  // }
  //经典案例二 顶层await
  // awaiting.js
  const dynamic = import(someMission);
  const data = fetch(url);
  export const output = someProcess((await dynamic).default, await data)
  // usage.js
  import { output } from "./awaiting.js";
  function outputPlusValue(value) {return output + value};
  console.log(outputPlusValue(100));
  setTimeout(() => {
    console.log(outputPlusValue(100))
  }, 1000);