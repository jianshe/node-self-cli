// async函数的实现原理
// 1.async 函数的实现原理，就是将Generator函数和自动执行器，包装在一个函数里。
async function fn(args) {
  // ...
}
// 等同于
function fn(args) {
  return spawn(function* () {
    // ...
  });
}
// spawn 函数的实现，基本就是前文自动执行器的翻版
function spawn(genF) {
  return new Promise(function(resolve,reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject[e];
      }
      if (next.done) {
        return resolve(next.value);
      }

      Promise.resolve(next.value).then(function (v) {
        step(function () {
          return gen.next(v);
        }, function (e) {
          step(function () {
            return gen.throw(e);
          })
        })
      })
    }
    step(function() {
      return gen.next(undefined);
    })
  })
}