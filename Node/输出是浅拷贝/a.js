const mod = require('./index.js');

console.log('index.js 初次导入 - mod.count', mod.count);
console.log('index.js 初次导入 - mod.friends', mod.friends);

mod.plusCount();
mod.plusYuanhua();

console.log('index.js 执行 mod.plusCount/plusYuanhua 后 - mod.count', mod.count);
console.log('index.js 执行 mod.plusCount/plusYuanhua 后 - mod.friends', mod.friends);

setTimeout(() => {
    mod.count = 3;
    console.log('index.js 延时2s - mod.count', mod.count);
    console.log('index.js 延时2s - mod.friends', mod.friends);
}, 2000)