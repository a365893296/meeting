<template>
<div class="searchBar">
	<el-row :gutter="20">
		<el-form v-model="query">
			<el-col :span="4">
				<el-form-item label="会议名称">
					<el-input v-model="query.topic"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="4">
				<el-form-item label="会议级别">
					<el-select v-model="query.meeting_level" >
						<el-option v-for="item in meeting_level_option" :key="item.meeting_level" :label="item.label" :value="item.meeting_level">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="4">
				<el-form-item label="会议性质">
					<el-select v-model="query.meeting_feature" >
						<el-option v-for="item in meeting_feature_option" :key="item.meeting_feature" :label="item.label" :value="item.meeting_feature">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="4">
				<el-form-item label="会议状态">
					<el-select v-model="query.meeting_state" >
							<el-option v-for="item in meeting_state_option" :key="item.meeting_state" :label="item.label" :value="item.meeting_state">
							</el-option>
						</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="4" >
				    <el-form-item label="日期选项">
					    <el-date-picker
					      v-model="query.meeting_time"
					      type="daterange"
					      align="right"
					      placeholder="选择日期范围"
					      :picker-options="pickerOptions2">
					    </el-date-picker>
				    </el-form-item>
			</el-col>
			<el-col :span="3" style="margin-top:35px ">
				<el-button type="info" class="el-icon-search" @click="getTabelData(query)">查询</el-button>	
			</el-col>
			</el-form>
	</el-row>
	<hr>
	<el-row>
		<div>
			<el-table ref="multipleTable" border tooltip-effect="dark" :data="tableData" max-height="475px" >
				<el-table-column type="selection"></el-table-column>
				<el-table-column prop="date" label="日期" sortable></el-table-column>
				<el-table-column prop="time" label="时间" sortable></el-table-column>
				<el-table-column prop="duration" label="时长" sortable></el-table-column>
				<el-table-column prop="site" label="地点" sortable></el-table-column>
				<el-table-column prop="feature" label="性质" sortable></el-table-column>
				<el-table-column prop="content" label="会议内容" sortable></el-table-column>
				<el-table-column prop="master" label="主持人" sortable></el-table-column>
				<el-table-column prop="host" label="主办单位" sortable></el-table-column>
			</el-table>
		</div>
		<div>
			<el-pagination 
			 
			:current-page="currentPage" 
			:page-size="10" 
			:page-sizes="[5,6,7,8,9,10,15,20]"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
			>
				
			</el-pagination>
		</div>
	</el-row>
</div>
</template>

<script>
import mockdata from '@/util/tabledata.js'
import axios from 'axios'
	export default{
		data (){
			return{ 
				
				query:{
					topic:'',
					meeting_time: '',
					meeting_level : 'all',
					meeting_state : 'all' ,
	      			meeting_feature : 'all' ,
	      		},

				pickerOptions2: {
          		shortcuts: [{
	            text: '最近一周',
	            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', [start, end]);
		            }
	            }, {
	            text: '最近一个月',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
	              picker.$emit('pick', [start, end]);
	            }
	          	}, {
	            text: '最近三个月',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
	              picker.$emit('pick', [start, end]);
	            }
	          }]
	        },
	       
	        

	       
	        meeting_level_option :[
	        	{
	        	 label : '高级' ,
	        		meeting_level : 'high'
	        	},{
	        		label :'中级',
	        		meeting_level :'middle'
	        	},{
	        		label : '普通' ,
	        		meeting_level : 'common'
	        	},{
	        		label :'不限' ,
	        		meeting_level :'all',
	        	}
	        ],

	        meeting_feature_option:[
	        	{
	        		label : '网络会议' ,
	        		meeting_feature : 'net' ,
	        	},{
	        		label:'电话会议' ,
	        		meeting_feature : 'phone' 
	        	},{
	        		label : '普通会议',
	        		meeting_feature : 'common'
	        	},{
	        		label : '不限' ,
	        		meeting_feature :'all'
	        	}
	        ],

	        
	        meeting_state_option :[
	        	{
	        		label:'准备',
	        		meeting_state:'prepare'
	        	},{
	        		label:'进行中' ,
	        		meeting_state:'ing' ,
	        	},{
	        		label : '已完成' ,
	        		meeting_state :'complete',
	        	},{
	        		label : '不限',
	        		meeting_state : 'all',
	        	}
	        ],

	        tableData :[],

	        currentPage : 1,
	        total:1 ,


	      };
  		},
  		methods : {
  			getTabelData:function(){

  			}
  		},
  		created :function(){
  				var data = [] ;

  				let _this = this ; 
  				axios.post('/getTabelData',{}).then(function (response){
  					var meetings = response.data.meeting ;
  					_this.tableData = meetings ;
  					_this.total=meetings.length;
					
					// for (let i = 0; i <meetings.length ; i++) {
					// 		var obj = {} ;
					// 		obj.date = meetings[i].date ;
					// 		obj.time = meetings[i].time ;
					// 		obj.duration = meetings[i].duration ;
					// 		obj.site = meetings[i].site ;

					// 		data[i] = obj ;
					// } 
					// _this.tableData = data		//若不先获取this 就取不到	

  				}).catch(function(error){
  					console.log(error)
  				})
  			
  			}
  	}
	
  		
	
</script>

<style>
	.searchBar{
		margin-top: 10px;
		padding-left: 20px; 
		/*margin-left: 10px ;*/
		background-color :white;
		height: 30% ;
	}
</style>