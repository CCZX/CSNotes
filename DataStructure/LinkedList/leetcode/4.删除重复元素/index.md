[83、删除重复元素-力扣](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/description/)
<span>简单</span>

### 题目描述
存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。

返回同样按升序排列的结果链表。

### 输入输出示例
**示例 1:**
```js
输入：head = [1,1,2]
输出：[1,2]
```
**示例 2:**
```js
输入：head = [1,1,2,3,3]
输出：[1,2,3]
```

**提示：**

- 链表中节点数目在范围 [0, 300] 内
- -100 <= Node.val <= 100
- 题目数据保证链表已经按升序排列

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
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  var curr = head;
  while(curr && curr.next) {
    if(curr.val == curr.next.val) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }
  return head;
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`

> 执行结果：

- 执行用时：`92 ms`，在所有`JavaScript`提交中击败了`70.04 %`的用户
- 内存消耗：`39.4 MB`，在所有`JavaScript`提交中击败了`69.24 %`的用户
