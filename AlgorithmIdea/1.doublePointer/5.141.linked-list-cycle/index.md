
[环形链表-力扣](https://leetcode-cn.com/problems/linked-list-cycle/)
<span>简单</span>

### 题目描述
给定一个链表，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 `0` 开始）。 如果 `pos` 是 `-1`，则在该链表中没有环。注意：`pos` 不作为参数进行传递，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 true 。 否则，返回 false 。


### 输入输出示例
**示例 1:**
![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)
```js
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

**示例 2:**
![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png)
```js
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
```

**示例 3:**
![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png)
```js
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
```

**提示：**

链表中节点的数目范围是 `[0, 104]`
`-105 <= Node.val <= 105`
`pos` 为 `-1` 或者链表中的一个 有效索引 。

**进阶：**

你能用 `O(1)`（即，常量）内存解决此问题吗？

### 解题方法

#### 1、双指针（快慢指针）

定义两个变量`i`、`j`，`i`每次移动一个节点，`j`每次移动两个节点，如果有环则会出现`i`和`j`重合的情况。就比如两个速度不一样的人在环形跑道上跑步🏃，他们一定会相遇。

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
 * @return {boolean}
 */
var hasCycle = (head) => {
  let fast = head;
  let slow = head;
  while (fast) {                        
    if (fast.next == null) return false;
    slow = slow.next;            
    fast = fast.next.next;          
    if (slow == fast) return true;
  }
  return false; 
}
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`96 ms`，在所有`JavaScript`提交中击败了`54.28 %`的用户
- 内存消耗：`40.2 MB`，在所有`JavaScript`提交中击败了`37.14 %`的用户

#### 2、哈希表

我们可以将已经访问过的数据存在哈希表中，后续每次访问都判断哈希表是否有该数据，如果有那么就代表有环。

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
 * @return {boolean}
 */
var hasCycle = (head) => {
  let map = new Map();
  while (head) {
    if (map.has(head)) return true;
    map.set(head, true);
    head = head.next;
  }
  return false;
}
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`

> 执行结果：

- 执行用时：`88 ms`，在所有`JavaScript`提交中击败了`85.84 %`的用户
- 内存消耗：`40.8 MB`，在所有`JavaScript`提交中击败了`5.73 %`的用户
