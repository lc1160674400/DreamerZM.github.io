# webpack学习笔记

----

> ## 功能
构建是做这件事情，把源代码转换成发布到闲上的可执行的JavaScript，css，html代码，包括如下内容

- 代码转换： es5编译成es5
- 文件优化： 压缩js，css，html代码，压缩合并图片等
- 代码分割： 提取多个页面的公公代码，提取首屏不需要执行部分的代码让其异步加载
- 模块合并： 在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类并且合并到一个文件
- 自动刷新： 监听本地源代码的变化，自动重新构建，刷新浏览器
- 代码校验： 在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过
- 自动发布： 更新完代码之后，自动构建出线上发布代码并传输给发布系统

> ## 安装 和 使用

npm install webpack webpack-cli -D

`安装webpack和webpack命令行，并且只安装在开发环境`

使用：

    1.`npx` 直接运行node_modules/.bin/目录下的脚本

    2.通过package.json中的script属性配置运行不同的脚本

配置文件：

    在项目目录中创建webpack.config.js


    {
  "education": "UNKNOWN",
  "educationDetail": "string",
  "educationImageList": [
    "string"
  ],
  "gender": "unknown",
  <!-- "height": 0, -->
  "heightDetail": "string",
  "marriageImageList": [
    "string"
  ],
  "marriageStatus": "UNKNOWN",
  "marriageStatusDetail": "string",
  "other": "string",
  "realName": "string",
  "spouseStandard": "string",
  "submitUserId": 0,
  "webId": 0,
  "wechatId": 0,
  <!-- "weight": 0, -->
  "weightDetail": "string",
  "work": "CONTRY_ENTERPRISE",
  "workDetail": "string",
  "year": 0,
  "yearDetail": "string"
}