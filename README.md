# KOA-VUE

> 这是一个 后端采用 nodejs，前端采用 Vue 的全栈项目。
Vue 部分集成了 Vue + Vue Router + Vuex 三个套件，并且使用 webpack 4.x 进行编译。webpack 中还包括了例如 babel, webpack-dev-server 等等常规功能。支持 stylus。

nodejs 部分使用Koa2框架，定义好了路由和中间件得自动引入，数据库使用mysql，另有包含日志记录和错误处理。

最后使用 webpack-dev-middleware 把两者合并，只要启动一个服务器，就能把两者都启动起来，前后端可以正常通讯。

可以把这个项目当做初始模板启动新的 nodejs + Vue 项目。

# 使用安装
## 本地环境

`npm run dev`

## 生产环境

* build

`npm install
npm run build`

* start

`npm run start`

## 文件目录
```
├── actions koa2路由以及接口得主要逻辑
├── configs koa2相关配置
├── logs 日志文件
├── middlewares koa2中间件
├── models 数据库相关操作
├── public 静态文件目录
├── schemas 数据库字段定义
├── utils 类库文件
│   ├── log.js 记录日志
├── vue vue 相关代码
│   ├── public 前端静态资源目录，如图片、字体等。
│   ├── src vue开发目录
│   │   ├── assets 放置一些图片，如logo等
│   │   ├── components vue组件目录
│   │   ├── views vue项目页面
│   │   ├── App.vue: vue项目入口文件
│   │   ├── router.js: vue项目路由文件
│   │   ├── store.js: vuex文件
│   ├── .babelrc vue项目babel配置文件
│   ├── .postcssrc.js 浏览器兼容配置
│   ├── index.html 首页入口文件
│   ├── webpack.config.js webpack配置文件
├── .eslintrc.js eslint配置文件
├── .index.js 项目入口文件
├── LICENSE 版权许可证
├── package.json 项目基本信息（项目开发所需模块、项目名称、版本、运行脚本）
├── README.md 项目的说明文档，markdown 格式
```
