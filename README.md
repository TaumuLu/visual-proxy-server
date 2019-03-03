# visual-proxy-server
Node-based visual proxy service  
一款基于node的可视化代理服务  

## 开发
```
npm i
npm run start // web页面
npm run server // 启动服务端
```

## 想法
提供代理请求的能力，正向代理和反向代理  
提供cli入口启动，提供本地代理服务端，浏览器自动打开配置页面，页面类似于chrome的扩展Proxy SwitchyOmega  
页面中填写代理配置，可将配置保存在启动目录下，页面代理配置更改保存即时生效  
可代理静态页面、资源、https、ws等，代理配置项规则要强大简洁  
之后可以考虑返回mock数据，提供mock数据的json填写，最好再能智能生成扩展下  

### 正向代理

### 反向代理
类似于nginx  

## 实现
基于koa的服务，代理使用node-http-proxy，相关的中间件http-proxy-middleware
