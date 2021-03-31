## 项目架构

> 开发语言：ES6+  
> 基本架构：vue(v3.0)、vue-router(v4.0)、vuex(v4.0)
> 脚手架：vue-cli(v4.0)、Node.js(v14.16.0)
> 运行环境：Chrome、IE11+

## 使用说明

### 1、新建 env 文件并配置环境变量

**示例如下**  
本地 env 文件:.env.local

```
NODE_ENV=development
VUE_APP_BASE_API=http://localhost:3000
VUE_APP_OFFICIAL_ACCOUNT_HASH=test
VUE_APP_WEAPP_USERNAME=test
VUE_APP_WEAPP_PATH=test
```

### 3、安装全局依赖

`npm install @vue/cli -g`  
or  
`npm update @vue/cli -g`


### 4、进入项目根目录，安装项目依赖

`npm install`

### 5、运行代码

#### 热启动

本地：`npm run hot:local`  
dev：`npm run hot:dev`  
sit：`npm run hot:sit`  
生产：`npm run hot:prod`

#### 打包

本地：`npm run local`  
dev：`npm run dev`  
sit：`npm run sit`  
生产：`npm run prod`
