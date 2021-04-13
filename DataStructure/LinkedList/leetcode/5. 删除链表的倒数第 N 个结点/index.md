[19、删除链表倒数第n个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list)
<span>中等</span>

### 题目描述
给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

进阶：你能尝试使用一趟扫描实现吗？

### 输入输出示例
**示例 1:**
```js
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

**示例 2:**
```js
输入：head = [1], n = 1
输出：[]
```

**示例 3:**
```js
输入：head = [1,2], n = 1
输出：[1]
```

**提示：**

- 链表中结点的数目为 sz
- 1 <= sz <= 30
- 0 <= Node.val <= 100
- 1 <= n <= sz

### 解题方法

#### 1、两次遍历

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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  if(!head) return head
  const tempNode = new ListNode(-1)
  tempNode.next = head

  let linkLen = 0
  let p1 = head
  while(p1) {
    linkLen++
    p1 = p1.next
  }

  const deleteIndex = linkLen - n
  let p2 = tempNode
  while(deleteIndex !== 0) {
    deleteIndex--
    p2 = p2.next
  }
  p2.next = p2.next.next
  return tempNode.next
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`84 ms`，在所有`JavaScript`提交中击败了`83.02 %`的用户
- 内存消耗：`38.8 MB`，在所有`JavaScript`提交中击败了`96.74 %`的用户

#### 2、快慢指针

定义两个指针 p, q 让 p 先走 n 步，然后让 p 和 q 同时走，当快指针遍历到最后一个节点时慢指针刚好走到需要删除的位置。

> 代码实现：

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let preHead = new ListNode(-1);
  preHead.next = head;
  let fast = preHead;
  let slow = preHead;
  while(n != 0){
    fast = fast.next;
    n--;
  }
  while(fast.next != null){
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return preHead.next;
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`84 ms`，在所有`JavaScript`提交中击败了`83.02 %`的用户
- 内存消耗：`38.8 MB`，在所有`JavaScript`提交中击败了`96.74 %`的用户
