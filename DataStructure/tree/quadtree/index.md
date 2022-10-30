## QuadTree

四叉树在每个节点都会有四个子区块。常用于二维空间的数据索引，图片压缩等，比如二维游戏中的碰撞检测，四叉树将数据分为四个象限，使用四叉树能够减少计算的时间复杂度。时间复杂度log(n)，空间复杂度n。

四叉树会将二维区域划分为为四个子区域，然后递归将子区域划分四个子区域，递归结束需要我们自行处理退出条件。需要注意的是**只有叶子节点才会存储数据对象。**

一般情况我们使用四叉树有以下两种情况：
1. 将现有数据生成四叉树使用
2. 从0到1添加数据，并生成四叉树

### 生成四叉树

在初始化四叉树时需要指定四叉树的最大深度，最大数据对象容量

### 添加数据对象

添加数据对象时，如果一个四叉树节点内的数据对象超出了最大容量就需要分裂生成四个子区域

### 检索

检索的时候需要传入一个Bounds，表示需要检索的区域，然后会递归对所有节点进行判断该待检索区域是否包含在该区域。

- https://timohausmann.github.io/quadtree-js/simple.html
- https://www.bilibili.com/video/BV1By4y1i7pX
- https://www.bilibili.com/video/BV1WK4y1S7A6