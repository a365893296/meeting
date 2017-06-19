import Mock from "mockjs"

export default Mock.mock('/register ',{
	'name' :'@name',
	'age|1-100':11 ,
	'color' : '@color'
})

