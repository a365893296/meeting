import Mock from 'mockjs'

export default Mock.mock('/getTreeData',{
	  treedata: [{
          id: 1,
          label: '业务部',
          children: [{
          	id:5 ,
          	label:'销售部',
          },{
          	id:6 ,
          	label : '市场开发部' ,
          },{
          	id:7,
          	label : '售后服务部',
          }]
        }, {
          id: 2,
          label: '工程部',
          children: [{
          	id:8 ,
          	label :'设计部'
           }]
        }, {
          id: 3,
          label: '生产部',
          children: [{ 
          	id:9 ,
          	label :'物料部'
          },{
          	id:10 ,
          	label : '统计部'
          }]
        }, {
          id: 4,
          label: '管理部',
          children: [{ 
          	id:11,
          	label: '人力资源部'
          },{
          	id:12 ,
          	label : '总裁办'
          }]
        }],
      
      
})