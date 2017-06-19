import Mock from 'mockjs'

export default Mock.mock('/getEmployees',{
		"employees|2-10":[
			{
				'id':'@id' ,
				'name' : '@cname',
			} 
		]
})