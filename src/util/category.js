import Mock from 'mockjs'

export default Mock.mock('/getTableCategory',{
	    "meeting_level_option" :[
	        	{
	        	 "label" : '高级' ,
	        		"meeting_level" : 'high'
	        	},{
	        		"label" :'中级',
	        		"meeting_level" :'middle'
	        	},{
	        		"label" : '普通' ,
	        		"meeting_level" : 'common'
	        	},{
	        		"label" :'不限' ,
	        		"meeting_level" :'all',
	        	}
	        ],

        "meeting_feature_option":[
	        	{
	        		"label" : '网络会议' ,
	        		"meeting_feature" : 'net' ,
	        	},{
	        		"label":'电话会议' ,
	        		"meeting_feature" : 'phone' 
	        	},{
	        		"label" : '普通会议',
	        		"meeting_feature" : 'common'
	        	},{
	        		"label" : '不限' ,
	        		"meeting_feature" :'all'
	        	}
	        ],
})