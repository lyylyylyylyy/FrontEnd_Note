## 1. Java介绍

```
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}
```
- 该程序包含一个类声明，它是使用关键字public类声明的。在Java中，所有代码都存在于类中。
- 运行的代码位于一个名为main的方法中，该方法被声明为public static void main(String[] args)。
- 我们使用大括号{和}来表示一段代码的开头和结尾。
- 语句必须以分号结尾。

![](https://joshhug.gitbooks.io/hug61b/content/assets/compilation_figure.svg)

> 运行命令

```
$ javac HelloWorld.java
$ java HelloWorld
Hello World! 
```

## 2. Objects 对象

```
public class Dog {
    public int weightInPounds;

    public void makeNoise() {
        if (weightInPounds < 10) {
            System.out.println("yipyipyip!");
        } else if (weightInPounds < 30) {
            System.out.println("bark. bark.");
        } else {
            System.out.println("woof!");
        }
    }    
}

public class DogLauncher {
    public static void main(String[] args) {
        Dog d;
        d = new Dog();
        d.weightInPounds = 20;
        d.makeNoise();
    }
}
```

关键点：
- `Java`中的对象是任何类的实例。
- `Dog`类有自己的变量，也称为实例变量或非静态变量。这些必须在类内部声明。
- 我们在`Dog`类中创建的方法没有`static`关键字。我们将这些方法称为实例方法或非静态方法。
- 要调用`makeNoise`方法，我们必须首先使用new关键字实例化一个`Dog`，然后生成一个特定的`Dog bark`。换句话说，我们调用`d.makeNoise()`而不是`Dog.makeNoise()`。
- 一旦一个对象被实例化了，它就可以被赋值给一个适当类型的声明变量，例如`d = new Dog()`;
- 类的变量和方法也称为类的成员。
- 使用点表示法访问类的成员。

## 3. 类方法与实例方法

Java允许我们定义两种类型的方法:
- 类方法，又称静态方法。
- 实例方法，又称非静态方法。
- 实例方法是只能由类的特定实例执行的操作。静态方法是类本身采取的操作。

举例：

类方法：
```
x = Math.sqrt(100);
```
如果是实例方法：
```
Math m = new Math();
x = m.sqrt(100);

```

## 4. 静态变量

类偶尔使用静态变量是很有用的。这些是类本身固有的属性，而不是实例本身。
```
public class Dog {
    public int weightInPounds;
    public static String binomen = "Canis familiaris";
    ...
}
```
静态变量应该使用类的名称而不是特定的实例来访问，例如应该使用`Dog.binomen`,而不是`d.binomen`。

## 5. public static void main(String[] args)

- public: 到目前为止，我们所有的方法都是以这个关键字开头的。
- static: 它是一个静态方法，不与任何特定实例相关联。
- void: 它没有返回类型。
- main: 这是方法的名称。
- String[] args: 这是传递给主方法的参数。

## Lists

Java中数组的大小是固定的，不会改变。

计算机中的所有信息都以1和0的顺序存储在内存中。

在Java中，有8种基本类型：byte, short, int, long, float, double, boolean, and char.

引用类型(Reference Types)：Array。。。。

当我们声明任何引用类型的变量时，Java都会分配一个64位的框，不管对象的类型是什么。

64位框不包含关于引用类型的数据，而是内存中引用类型的地址。

**声明变量**

当您声明一个特定类型的变量时，Java会找到一个具有足够位元的连续块来容纳该类型的内容。

当您将值赋给一个内存盒时，它将被您指定的位所填充。

![](https://joshhug.gitbooks.io/hug61b/content/chap2/fig21/mystery_of_the_walrus_resolved_step1.png)

![](https://joshhug.gitbooks.io/hug61b/content/chap2/fig21/mystery_of_the_walrus_resolved_step2.png)

![](https://joshhug.gitbooks.io/hug61b/content/chap2/fig21/mystery_of_the_walrus_resolved_step3.png)

## public vs private

private关键字，私有变量和方法只能由相同.java文件中的代码访问，

毕竟，private关键字所做的唯一一件事就是中断那些否则会编译的程序。

public关键字应该被认为是一种声明，表明方法是可用的，并且将永远像现在一样工作。

将嵌套类声明为static意味着静态类中的方法不能访问封闭类的任何成员。(class)/.

**数组和类中内存盒的关键区别**:
- 数组框使用[]符号进行编号和访问，类框使用点符号进行命名和访问。
- 数组框必须是相同的类型。类框可以是不同的类型。