// Stack这个类在我的上一篇文章中，执行fn方法，要有Stack这个类，不然会报错
// 下面还有一个十进制转 2 ~ 36 任意进制的方法

function fn(num) {  // 十进制数转二进制数
	let stack = []
	let str = ''
	let str1 = ''  // 用 str1 += 就错了，因为是10先 % 2,结果是0，str = '0', 后面才变
	while (num) {
		let mo = num % 2 // 转为二进制的结果是每次取余2
		stack.push(mo) // 首先推进栈的是 10 % 2 = 0, 这个数是个位数，它最先进数组，然后最后输出，符合栈的规律
		str1 += mo
		num = Math.floor(num / 2)
	}
	while (stack.length) {
		str += stack.pop()  // 首先从栈弹出的是最后一次的结果，也就是 1 % 2的结果是0，这个0是千位数
	}
	console.log(str, str1)
}
// fn(10)


// 十进制数转任意进制
function fn1(decNumber, radix) {
	if (radix < 2 || radix > 36) return ''
	let base = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	let stack = []
	let str = ''
	while (decNumber) {
		let mo = decNumber % radix  // 每次结果都是余数
		stack.push(mo)
		decNumber = Math.floor(decNumber / radix)  // 每次把decNumber / radix
	}
	
	console.log(stack)

	while (stack.length) {
		str += base[stack.pop()]  // 10 % 2 = 0，这个0要是个位数，相当于最后输出，但是你是先计算出来的，先进后出就立马想到栈
	}

	return str
}
console.log(fn1(100345, 35)) // 2BW0
// console.log(fn1(100345, 2))  // 11000011111111001
// console.log(fn1(100345, 8)) // 303771
