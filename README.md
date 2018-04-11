# React-Native-V2EX

基于React-Native构建的V2EX客户端

### Dev

> 本项目在windows环境下开发, mac下请自行测试

```
yarn

yarn start

// start simulator
yarn android
```

### Build

```
cd android

gradlew assembleRelease

gradlew installRelease
```


+ [v2ex api](https://github.com/djyde/V2EX-API) fetch
+ 路由 react-navigation
+ 本地存储 [react-native-store](https://github.com/thewei/react-native-store/)
+ styled-components
+ immer
+ timeago.js