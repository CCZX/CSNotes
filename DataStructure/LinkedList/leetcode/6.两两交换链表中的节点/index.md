[25、两两交换链表中的节点-力扣](https://leetcode-cn.com/problems/swap-nodes-in-pairs)
<span>中等</span>

### 题目描述
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

### 输入输出示例

**示例 1:**
```js
输入：head = [1,2,3,4]
输出：[2,1,4,3]
```

**示例 2:**
```js
输入：head = []
输出：[]
```

**示例 3:**
```js
输入：head = [1]
输出：[1]
```

**提示：**

- 链表中节点的数目在范围 [0, 100] 内
- 0 <= Node.val <= 100

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
var swapPairs = function(head) {
  let tempNode = new ListNode(-1)
  tempNode.next = head
  let node = tempNode

  while(node.next && node.next.next) {
    let first = node.next
    let second = node.next.next
    let secondNext = second.next

    first.next = secondNext
    second.next = first

    node.next = second
    node = first
  }

  return tempNode.next
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`

> 执行结果：

- 执行用时：`92 ms`，在所有`JavaScript`提交中击败了`70.04 %`的用户
- 内存消耗：`39.4 MB`，在所有`JavaScript`提交中击败了`69.24 %`的用户
