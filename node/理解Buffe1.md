在Node中，应用需要处理网络协议、操作数据库、处理图片、接收上传文件等，在网络流和文件的操作中，还要处理大量二进制数据，JavaScript自有的字符串远远不能满足这些需求，于是Buffer对象应运而生。

- Buffer是一个像Array的对象
- 主要用于操作字节，元素是16进制的2位数，0-255之间
- Buffer占用内存不由V8分配，属于堆外内存（C++层面）
- Node在进程启动时就已经加载了Buffer，将其放入全局变量，可直接使用
- 处理大量的字节数据，不能需要一点内存就向操作系统申请一点内存，会导致大量申请内存的系统调度。
- 因此，**Node在内存的使用上应用的是C++层面申请内存、在JavaScript中分配内存的策略**。
- Node以8KB为界限来区分Buffer是大对象还是小对象，8KB也是每个slab的大小值，在JavaScript层面，以它为单位单元进行内存分配。
- Buffer对象可以与字符串之间相互转换。
- Buffer提供了一个`isEncoding()`函数来判断编码是否支持转换。

## Buffer结构

### 模块结构

|性能部分|非性能部分|
|:---:|:---:|
|C++  |JavaScript|


![](buffer_layer.png)

### Buffer对象

```javascript
var str = "深入浅出node.js"
var buf = new Buffer(str, 'utf-8')
console.log(buf)
// => <Buffer e6 b7 b1 e5 85 a5 e6 b5 85 e5 87 ba 6e 6f 64 65 2e 6a 73>
```

- 不同编码的字符串占用元素个数不同，中文字在utf-8下占3个字符，字母和半角标点占1个元素。
- 可以访问`length`属性得到长度；可以通过下标访问元素，返回值为0-255之间的随机值。
- 给元素赋非0-255之间的值，若是赋值小于0，该值逐次加256，直到得到0-255之间的整数；若是大于255，逐次减256；若是小数，舍弃小数部分，保留整数部分。

### Buffer内存分配

Node采用了slab分配机制，是一种动态内存管理机制，它就是一块申请好的固定大小的内存区域，它具有以下3种状态。

- full：完全分配状态
- partial：部分分配状态
- empty：没有被分配状态

`new Buffer(size)`分配指定大小的Buffer对象；Node以8KB为界限来区分Buffer是大对象还是小对象，8KB也是每个slab的大小值，在JavaScript层面，以它为单位单元进行内存分配。

#### 分配小Buffer对象

Buffer的分配过程主要使用一个局部变量pool作为中间处理对象，处于分配状态的slab单元都指向它。以下是分配一个全新的slab单元的操作，它会将新申请的SlowBuffer对象指向它。

```javascript
var pool

function alloPool() {
    pool = new SlowBuffer(Buffer.poolSize)
    pool.used = 0
}
```
![新构造的slab单元示例](slab_init.png)
![从一个新的slab单元中初次分配一个Buffer对象](slab_allocate1.png)
![从一个新的slab单元中再次分配一个Buffer对象](slab_allocate2.png)

- 如果slab剩余的空间不够，将会创造新的slab，原slab中剩余的空间会造成浪费。
- 由于同一个slab可以分配给多个Buffer对象使用，只有这些小Buffer对象在作用域释放并都可以回收时，slab的8KB空间才会被回收。

#### 分配大Buffer对象

如果需要超过8KB的Buffer对象，将会直接分配一个SlowBuffer对象作为slab单元，这个单元将会被这个大Buffer对象独占。

## Buffer的转换

Buffer对象可以与字符串之间相互转换。

- 字符串转Buffer：`new Buffer(str, [encoding]))`
- 一个Buffer对象可以存储不同编码类型的字符串转码的值：`buf.write(string, [offset], [length], [encoding])`
- Buffer转字符串：`buf.toString([encoding], [start], [end])`

## Buffer不支持的额编码类型

Buffer提供了一个`isEncoding()`函数来判断编码是否支持转换：`Buffer.isEncoding(encoding)`。

对于不支持的编码类型，可以借助Node生态圈中的模块完成转换，如iconv和iconv-title两个模块。

## Buffer的拼接

Buffer在使用场景中，通常是以一段一段的方式传输。以下是从常见的输入流中读取内容的示例代码：

```javascript
var fs = require('fs')

var rs = fs.createReadStream('test.md')
var data = ''
rs.on("data", function (chunk) {
    data+=chunk
})
rs.on("end", function () {
    console.log(data)
})
```

chunk即为Buffer对象，当输入流中有宽字节编码时，会出现乱码情况。

潜藏的问题在于这句代码：

`data+=chunk`

这句代码里隐藏了`toString`操作，它等价于：

`data = data.toString() + chunk.toString()`

这对于英文来说没有问题，但是对于宽字节的中文，会形成问题。

### 乱码是如何产生的

```
var rs = fs.createReadStream('test.md', {highWaterMark: 11})

窗前明***光，疑***地上霜；。。。。
```
产生这个输出结果的原因在于文件可读流在读取时会逐个读取Buffer，上文提到的`buf.toString()`默认以utf-8编码，中文字在utf-8下占3个字符，所以第一个Buffer在输出时，只能显示3个字符，剩下的2个字节将会以乱码形式显示。

对于任意长度的Buffer，宽字节都可能存在被截断的情况，只不过Buffer长度越大出现的概率越低，但是该问题依然不可忽视。


### 正确拼接Buffer

正确的拼接Buffer方法：

```javascript
var chunks = []
var size = 0
rs.on("data", function (chunk) {
    chunks.push(chunk)
    size += chunk.length
})
rs.on("end", function () {
    var buf = Buffer.concat(chunks, size)
    var str = iconv.decode(buf, 'utf8')
    console.log(str)
})
```

正确的拼接Buffer方法是用一个数组来储存接收到的所有Buffer片段记录下所有片段的总长度，然后调用concat方法生成一个合并的Buffer对象。

## Buffer与性能

Buffer在网络传输过程中举足轻重，字符串一旦在网络中传输，都会转换为Buffer，以进行二进制传输，提高字符串到Buffer的转换效率，可以很大程度的提高网络吞吐率。