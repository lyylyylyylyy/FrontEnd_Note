JavaScript字符串单引号，json字符串双引号

对象属性必须加双引号，没有变量声明

JSON.stringify()
- 将JavaScript对象序列化为JSON字符串
- 3个参数，对象，过滤器（数组或函数），是否在JSON中保留缩进
  - 过滤器：数组，返回的结果字符串只会包含数组中的属性；函数，传入（key，value）根据key以不同方式处理value，若是函数返回undefined，则这个key会被忽略掉
  - 缩进：数值，每个级别缩进的空格数；字符串，这个字符串会被当作缩进符号
JSON.parse()
- JSON字符串解析为原生JavaScript值
- 2个参数：对象，函数
  - 函数将在每个键值对儿上调用，传入（key，value），若是返回undefined，表示要从结果中删除这个键，返回其他值，则插入到结果中

