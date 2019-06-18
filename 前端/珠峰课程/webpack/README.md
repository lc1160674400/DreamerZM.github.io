## 2.自动化构建

构建是做这件事情，把源代码转换成发布到闲上的可执行的JavaScript，css，html代码，包括如下内容

- 代码转换： es5编译成es5
- 文件优化： 压缩js，css，html代码，压缩合并图片等
- 代码分割： 提取多个页面的公公代码，提取首屏不需要执行部分的代码让其异步加载
- 模块合并： 在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类并且合并到一个文件
- 自动刷新： 监听本地源代码的变化，自动重新构建，刷新浏览器
- 代码校验： 在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过
- 自动发布： 更新完代码之后，自动构建出线上发布代码并传输给发布系统

## 3.webpack

webpack是一个打包模块化JavaScript的工具，在webpack里一切文件皆模块，通过loader转换文件，通过plugin注入钩子，最后输出由多个模块组合成的文件，webapck专注于构建模块化项目

一切文件：Javascript，CSS，HTML，图片，模板，在webpack眼中都是模板，这样的好处是能清楚的描述各个模块之间的依赖关系，以方便webpack对模块进行组合和打包，经过webpack的处理最终会输出浏览器能使用的静态资源

### 3.1 安装webpack

在启用webpack之前必须先安装webpack
全局安装 `npm install webpack -g`
推荐：本地安装 `npm install webpack-cli webpack -D`
npm初始化 `npm init -y`