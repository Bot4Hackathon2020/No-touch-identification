```json
{
  "name": "demo",
  "version": "0.0.2",
  "author": "四月 &lt;507811581@qq.com&gt;",
  "build": {  // electron-builder配置
    "productName":"xxxx",//项目名 这也是生成的exe文件的前缀名
    "appId": "xxxxx",//包名  
    "copyright":"xxxx",//版权  信息
    "compression": "store", // "store" | "normal"| "maximum" 打包压缩情况(store 相对较快)，store 39749kb, maximum 39186kb
    "directories": {
        "output": "build" // 输出文件夹
    }, 
    "asar": false, // asar打包
    "extraResources":  { // 拷贝dll等静态文件到指定位置
        "from": "./app-update.yml",
        "to": "./b.txt"
    },
    "win": {  
        "icon": "xxx/icon.ico"//图标路径,
        "extraResources":  { // 拷贝dll等静态文件到指定位置(用于某个系统配置)
            "from": "./app-update.yml",
            "to": "./b.txt"
        }
    },
    "nsis": {
        "oneClick": false, // 一键安装
        "guid": "xxxx", //注册表名字，不推荐修改
        "perMachine": true, // 是否开启安装时权限限制（此电脑或当前用户）
        "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
        "allowToChangeInstallationDirectory": true, // 允许修改安装目录
        "installerIcon": "./build/icons/aaa.ico", // 安装图标
        "uninstallerIcon": "./build/icons/bbb.ico", //卸载图标
        "installerHeaderIcon": "./build/icons/aaa.ico", // 安装时头部图标
        "createDesktopShortcut": true, // 创建桌面图标
        "createStartMenuShortcut": true, // 创建开始菜单图标
        "shortcutName": "xxxx" // 图标名称
    }
  }
}
```