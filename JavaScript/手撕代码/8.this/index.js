/**
 * this用一句简单的话概括：谁调用就指向谁
 */

/**
 * 
 */
//  为什么react需要绑定this?

// 默认绑定：函数的独立调用
// 隐式绑定：作为对象属性
// call/apply/bind
// new
// 箭头函数：外层函数的this。箭头函数没有自己的this，不能new，通过call改变this不起作用
// new > call > 隐式 > 默认

// 需要注意的是，this 是在代码执行时才能确定。
