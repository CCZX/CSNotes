defer和async都是异步加载的不会阻塞HTML的解析

## async
文件加载完成就立即执行，多个文件不能保证执行的顺序

## defer
所有DOM元素解析完成，DOMContentLoad前执行，可以保证执行的顺序
