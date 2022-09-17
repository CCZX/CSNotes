
class QuadTree {
  constructor(bounds, maxObjects, maxLevel, level) {
    this.bounds = bounds // 数据对象的Bounds信息，在二维空间的位置：{x, y, width, height}
    this.level = level // 当前深度

    this.maxObjects = maxObjects // 区块所能容纳的最大数据对象数量
    this.maxLevel = maxLevel // 树的最大深度

    this.objects = [] // 区块的数据对象
    this.objects = [] // 四个子区块
  }

  /**
   * 分裂当前区块，将当前区块分离成四个子区块
   * 该方法不能直接调用，而是在向该区块添加数据对象的时候
   * 如果数据对象的数量大于最大容器时就会进行分裂
   */
  split() {
    const nextLevel = this.level + 1
    const subWidth = this.bounds.width / 2
    const subHeight = this.bounds.height / 2
    const x = this.bounds.x
    const y = this.bounds.y

    // top right
    const quad0Bounds = {
      x: x + subWidth,
      y: y,
      width: subWidth,
      height: subHeight,
    }
    this.nodes[0] = new QuadTree(quad0Bounds, this.maxObjects, this.maxLevel, nextLevel)

    // top left
    const quad1Bounds = {
      x: x,
      y: y,
      width: subWidth,
      height: subHeight,
    }
    this.nodes[1] = new QuadTree(quad1Bounds, this.maxObjects, this.maxLevel, nextLevel)

    // bottom left
    const quad2Bounds = {
      x: x,
      y: y + subHeight,
      width: subWidth,
      height: subHeight,
    }
    this.nodes[2] = new QuadTree(quad2Bounds, this.maxObjects, this.maxLevel, nextLevel)

    // bottom right
    const quad3Bounds = {
      x: x + subWidth,
      y: y + subHeight,
      width: subWidth,
      height: subHeight,
    }
    this.nodes[3] = new QuadTree(quad3Bounds, this.maxObjects, this.maxLevel, nextLevel)
  }

  /**
   * 获取一个区块被包含在了哪些区块中
   * @param {*} pRect {x, y, width, height}
   * @returns 
   */
  getIndex(pRect) {
    const indexes = []
    const verticalMidPoint = this.bounds.x + (this.bounds.width / 2)
    const horizontalMidPoint = this.bounds.y + (this.bounds.height / 2)

    const startIsNorth = pRect.y < horizontalMidpoint
    const startIsWest = pRect.x < verticalMidPoint
    const endIsEast = pRect.x + pRect.width > verticalMidPoint
    const endIsSouth = pRect.y + pRect.height > horizontalMidPoint

    // top-right
    if (startIsNorth && endIsEast) {
      indexes.push(0)
    }

    // top-left
    if (startIsWest && startIsNorth) {
      indexes.push(1)
    }

    // bottom-left
    if (startIsWest && endIsSouth) {
      indexes.push(2)
    }

    // bottom-right
    if (endIsEast && endIsSouth) {
      indexes.push(3)
    }

    return indexes
  }

  /**
   * 向四叉树中添加数据对象
   * @param {*} pRect 
   * @returns 
   */
  insert(pRect) {
    let i = 0, indexes

    // 如果有子区块，获取该区块在哪里子区块中
    if (this.nodes.length) {
      indexes = this.getIndex(pRect)

      for (i = 0; i < indexes.length; i++) {
        // 递归子区块
        this.nodes[indexes[i]].insert(pRect)
      }
      return
    }

    this.objects.push(pRect)

    // 如果超出了数据对象的最大容量，则需要进行分裂
    if (this.objects.length > this.maxObjects && this.level < this.maxLevel) {
      // 没有分裂则先进行分裂操作
      if (!this.nodes.length) {
        this.split()
      }

      // 将该区域的数据对象添加到子区块中
      for (i = 0; i < this.objects.length; i++) {
        indexes = this.getIndex(this.objects[i])
        for (let k = 0; k < indexes.length; k++) {
          // 递归子区块
          this.nodes[indexes[k]].insert(this.objects[i])
        }
      }

      // 将该区块的数据对象清空
      this.objects = []
    }

    return
  }

  /**
   * 探测所属的区块
   * @param {*} pRect 
   * @returns 
   */
  retrieve(pRect) {
    let indexes = this.getIndex(pRect)
    let returnObjects = this.objects // 只有叶子节点才会存储数据对象

    if (this.nodes.length) {
      for (let i = 0; i < indexes.length; i++) {
        // 递归调用
        returnObjects = returnObjects.concat(this.nodes[indexes[i]].retrieve(pRect))
      }
    }

    // 过滤重复
    returnObjects = returnObjects.filter((item, index) => returnObjects.indexOf(item) >= index)

    return returnObjects
  }

  clear() {
    this.objects = []

    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes.length) {
        this.nodes[i].clear()
      }
    }

    this.nodes = []
  }
}