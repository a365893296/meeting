import Mock from 'mockjs' 


export default Mock.mock('/getTabelData',{

	'meeting|5-10':[{
		'date' : '@date' ,
		'time' : '@time' ,
		'duration|1-5' : 1 ,
		'site' : '@site' ,
		'feature|' : '@constellation',
		'content' : '@content',
		'master' : '@master',
		'host' : '@host'
	}]
})