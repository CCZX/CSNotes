## JSON.parse(JSON.stringify())实现深拷贝缺点

1. Date对象会被转为字符串
2. RegExp、Error对象只能得到空对象
3. function和undefined会丢失
4. NaN、infinity会被转为null
5. 只能序列号可枚举的
6. 循环引用会报错
