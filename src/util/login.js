import Mock from 'mockjs'

var data = Mock.mock('/login',{
	"canlogin": 1,
	"users" :[
		{
			"id":1 ,
			"username" :"zhangsan",
			"password" :"123"
		},
		{
			"id": 2 ,
			"username":"lisi" ,
			"password":"123" ,
		},
		{
			"id":3 ,
			"username":"root" ,
			"password" :"root",
		},
	],

})