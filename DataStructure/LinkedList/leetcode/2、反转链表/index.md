
[206、反转链表-力扣](https://leetcode-cn.com/problems/reverse-linked-list)
<span>简单</span>

### 题目描述
反转一个单链表。

### 输入输出示例
**示例 1:**
```js
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

**进阶:**
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

### 解题方法

#### 1、

> 代码实现：

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val)
 *     this.next = (next === undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  if(!head || !head.next) return head
  let prev_node = null
  let curr_node = head
  while(curr_node) {
    const next_node = curr_node.next
    curr_node.next = prev_node
    prev_node = curr_node
    curr_node = next_node
  }
  return prev_node
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`88 ms`，在所有`JavaScript`提交中击败了`68.34 %`的用户
- 内存消耗：`39.8 MB`，在所有`JavaScript`提交中击败了`38.66 %`的用户
