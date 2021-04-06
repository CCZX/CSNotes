[21、合并两个有序链表-力扣](https://leetcode-cn.com/problems/merge-two-sorted-lists/description/)
<span>简单</span>

### 题目描述
将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

### 输入输出示例
**示例 1:**
```js
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```
**示例 2:**
```js
输入：l1 = [], l2 = []
输出：[]
```
**示例 3:**
```js
输入：l1 = [], l2 = [0]
输出：[0]
```
**提示：**

- 两个链表的节点数目范围是 [0, 50]
- -100 <= Node.val <= 100
- l1 和 l2 均按 非递减顺序 排列

### 解题方法

#### 1、

> 代码实现：

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  var prevHead = new ListNode(-1);
  var prevNode = prevHead;
  while (l1 != null && l2 != null) {
    if(l1.val <= l2.val){
      prevNode.next = l1; 
      l1 = l1.next
    }else{
      prevNode.next = l2;
      l2 = l2.next;
    }
    prevNode = prevNode.next;
  }
  prevNode.next = l1 ? l1 :l2;
  return prevHead.next;
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n+m)`
- 空间复杂度：`O(n+m)`

> 执行结果：

- 执行用时：`92 ms`，在所有`JavaScript`提交中击败了`70.04 %`的用户
- 内存消耗：`39.4 MB`，在所有`JavaScript`提交中击败了`69.24 %`的用户

#### 2、递归

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  if(l1 === null){
    return l2;
  }
  if(l2 === null){
    return l1;
  }
  if(l1.val < l2.val){
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  }else{
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
```
