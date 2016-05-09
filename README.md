#### 文档目录说明

```
    .
    ├── README.md
    ├── demo.html  //入门测试demo
    ├── dist    //编译后目标文件
    ├── js  //react 相关文件
    ├── node_modules //node包
    ├── src  //源文件目录
    │   ├── test.js     //react 简单入门实例
    │   ├── todo-adon.js    //使用事件订阅
    │   ├── todo-animate.js     //添加动画
    │   ├── todo-learning.js    //未拆分的组件写法，数据直接从父组件传入
    │   └── todo.js     //未使用事件订阅
    ├── style //样式文件
    ├── todo-adon.html  //使用事件订阅
    ├── todo-animate.html  //添加动画
    └── todo.html  //未使用事件订阅
```

#### 编译运行命令

    babel -w --presets react src --out-dir dist

请先确认安装babel，更多关于babel的介绍参考[这里](http://www.ruanyifeng.com/blog/2016/01/babel.html)
