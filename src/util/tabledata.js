import Mock from 'mockjs' 


export default Mock.mock('/getTableData',{
	'total': 66 ,
	'meetings|66':[{
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