# 会议管理系统 MeetingSystem
###### 项目是由vue.js + element UI + vue-router +  axios +vuex组合而成。


### 目前本系统实现的功能
* 用户的登录注册
  + 对未登录用户的拦截
* 会议的查询
  + 条件查询
  + 模糊查询
  + 利用element UI的datatable和axios结合实现分页
* 添加会议
  + 添加会议时能根据选取时间查询出空的会议室
  + 添加会议时能根据部门选择参与会议人员


### 项目结构

```
├── App.vue
├── assets
├── components
│   ├── Home.vue
│   ├── Login.vue
│   ├── Register.vue
│   └── home
│       ├── createMeeting.vue
│       ├── navBar.vue
│       └── query.vue
├── main.js
├── router
│   └── index.js
├── util
└── vuex
    └── store.js

```

### 项目截图
查询会议截图：
![查询会议](http://ovi099wlz.bkt.clouddn.com/meetingSystem1.jpg "查询会议截图")
添加会议截图：
![添加会议](http://ovi099wlz.bkt.clouddn.com/meetingSystem2.png "添加会议截图")

## 项目总结
该项目是对vue.js的一次实践。通过本次实践，加深了我对vue.js的认识，并且学习到了很多相关知识。


### 运行及构建

```
1. cd 项目目录
2. npm install   //安装依赖
3. npm run dev   //运行项目 此时会自动打开 localhost:8080
4. npm run build  //生成静态文件
```
