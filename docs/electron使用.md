## quick start

```
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

**package.json 文件**

存储了工程配置信息的 json。例如 "version": "1.0.0" 规定了工程的版本号。

**main.js 文件**

**启动时创建窗体的 js，该文件可在 package.json 内指定。**

*mainWindow.webContents.openDevTools()* 行是启动 Chrome Inspector 的，如果不想启动直接删除该行即可。

 **index.html 文件**     

 窗体所加载的 HTML 页面，该文件可在 main.js 内指定。



## 打包 Electron

​    制作好属于自己的 Electron 工程后，我们需要将它**打包为可执行程序**才可以分享给好友，使好友们双击它就可以运行你的作品。

​    在命令提示符内输入以下内容来**安装打包工具**：

```text
npm i electron-builder
```

​    安装完成后，**配置工程的 package.json，在最后一个花括号（**}**）前添加：**

```json
    ,"build": {
      "appId": "your.id",
      "mac": {
        "category": "your.app.category.type"
      }
    }
```

​    接下来，我们开始打包：

​    再次**重启命令提示符**（win+R 后输入 cmd）

​    将**命令提示符切换到工程目录内**：

```text
cd /d 你的工程路径
```

**开始编译：**

```text
build --win --ia32
```

 *（含义：打包为适用于 windows 系统、32位元的可执行程序。了解更多：[Options · electron-userland/electron-builder Wiki · GitHub](http://link.zhihu.com/?target=https%3A//github.com/electron-userland/electron-builder/wiki/Options)）*

​    耐心等待打包完成，**在 dist\win-ia32-unpacked 目录下就是你所想要的程序了。**

## 五、使用 jquery

**jquery 是一个非常方便的 JavaScript 库，但在 Electron 中却可能出现无法使用的状况**。

​    可以尝试在**引入 jquery 后插入下面的代码**：

```html
    <script>
        if (typeof module === 'object') {
        window.jQuery = window.$ = module.exports;
        };
    </script>
```

​    这样 jquery 就**可以正常使用了。**