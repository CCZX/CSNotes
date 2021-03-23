// mod.js
let count = 1;
let friends = ['夏洛'];

function plusCount() {
    count++
};

function plusYuanhua() {
    friends.push('袁华');
}

setInterval(() => {
    console.log('mod.js 每秒打印 - count', count);
    console.log('mod.js 每秒打印 - friends', friends);
}, 1000);

module.exports = {
    count,
    friends,
    plusCount,
    plusYuanhua,
}
