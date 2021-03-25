function ListNode(value) {
  this.value = value
  this.next = null
}

const nA = new ListNode('a')
const nB = new ListNode('b')
const nC = new ListNode('c')

nA.next = nB
nB.next = nC
