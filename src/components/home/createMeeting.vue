<template>
	<div style="margin-left:30px">
	<el-row :gutter="20" >
		<el-form v-model="create" >
		
			<el-col :span="10">
				<el-form-item label="会议主题">
					<el-input v-model="create.topics"></el-input> 
				</el-form-item>

				<el-form-item label="会议级别">
					<el-select v-model="create.meeting_level" >
						<el-option 
						v-for="item in create.meeting_level_option" 
						:key="item.meeting_level" 
						:label="item.label" 
						:value="item.meeting_level">
						</el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item label="会议性质">
					<el-select v-model="create.meeting_feature" >
						<el-option 
						v-for="item in create.meeting_feature_option" 
						:key="item.meeting_feature" 
						:label="item.label" 
						:value="item.meeting_feature">
						</el-option>
					</el-select>
				</el-form-item>
				
				<!-- 上传模块 -->
				<el-form-item label="文件上传">
					<el-upload 
					drag
					action="https://jsonplaceholder.typicode.com/posts/"
					:file-list="create.fileList"
					multiple
					>
					 <i class="el-icon-upload"></i>
	  					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
	  					<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>	
					</el-upload>
				</el-form-item>

				<el-form-item label="会议内容">
					<el-input type="textarea" :autosize="{minRows:4,maxRows:8}" v-model="create.content"></el-input>
				</el-form-item>
						
			</el-col>
			
			<el-col :span="10">
					<el-form-item label="主办单位">
						<el-input v-model="create.host"></el-input> 
					</el-form-item>
					<el-form-item label="主持人">
						<el-input v-model="create.master"></el-input> 
					</el-form-item>


					<!-- openParticipant 在data中 -->
					<el-form-item label="参与人员" >
						<el-col :span="17">
							<!-- <el-input v-model="create.participant"></el-input>  -->
						</el-col>
						<el-button type="primary" @click="getTreeData">选择</el-button> 
					</el-form-item>
					
					<!-- 参与人员选择框 -->
					<el-dialog title="参与人员选择" :visible.sync="participantVisible" id="dialog">
						<el-row :gutter='20'>
							<el-col :span="6">
								<el-tree 
								:data="treeData" 
								:props="treeDataProps"
								@node-click="getEmployees" 
								highlight-current
								:indent = '25'></el-tree>
							</el-col>
							<el-col :span='18'>
								<el-transfer 
								v-model="create.participant" 
								:data="transferData"
								:titles="['可选人员', '已选人员']"
								:indent = '25'
								></el-transfer>
						    </el-col>
					    </el-row>
					    <div slot="footer" class="dialog-footer">
							<el-button @click="participantVisible = false">取 消</el-button>
							<el-button type="primary" @click="participantVisible = false">确 定</el-button>
						</div>
					</el-dialog>


					 <el-form-item label="日期选项">
					    <el-date-picker
					      v-model="create.meeting_time"
					      type="daterange"
					      align="right"
					      placeholder="选择日期范围"
					      :picker-options="pickerOptions">
					    </el-date-picker>
				    </el-form-item>
					
					<el-form-item label="持续时间">
						<el-input v-model="create.duration"></el-input> 
					</el-form-item>
					<el-form-item label="会议地点">
						<el-input v-model="create.site" readonly></el-input> 
					</el-form-item>
			</el-col>
		</el-form>
	</el-row>	
	</div>

</template>

<script>
import axios from 'axios'
import mockdata from '@/util/category.js'
import treedata from '@/util/treedata.js'
import transfer from '@/util/transfer.js'

export default{
	data(){
		return {
			// form数据 
			create:{
				topics : '',

				meeting_feature : 'all' ,
				meeting_feature_option :[] ,

				meeting_level :'all',
				meeting_level_option : [],

				content :'',
				host:'',
				master:'',
				participant:[],

				site:'',

				meeting_time:'',
			},

			//参与人员选择 dialog
			participantVisible:false ,
			treeData :[],
			treeDataProps: {
         		children: 'children',
          		label: 'label'
        	},
        	transferData:[],

			//日期选择器 datepicker
			pickerOptions: {
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
		}
	},
	methods:{

		getTreeData(){
			let _this = this ;
			// console.log(_this.treeData)
			if(_this.treeData ){
				axios.post('/getTreeData',{})
				.then(function(response){
					var data = response.data.treedata ;
					// console.log(data)
					_this.treeData = data ;
				}).catch(function(error){
					console.log(error);
				})
			}
			_this.participantVisible = true ;
		},

		getEmployees(){
			let _this = this ;
			axios.post('/getEmployees',{})
			.then(function(response){
				const data = response.data.employees ;
				// _this.create.participant = data ;
				 // _this.transferData = data ;
				const transferData = [] ;
				
				for(let i=0 ; i<data.length ; i++){
					// console.log(data[i])
					transferData.push({
						key: data[i].id ,
						label : data[i].name ,
					});
					// console.log(transferData)
				}

				_this.transferData = transferData ;
				// console.log(_this.create.participant);
			
			}).catch(function(error){
				console.log(error);
			});
			this.$message('sdasd');
		}
	},
	created:function(){
			let _this = this ;

			axios.post('/getTableCategory',{})
			.then(function(response){
				var data = response.data ;
				_this.create.meeting_feature_option = data.meeting_feature_option ;
				_this.create.meeting_level_option = data.meeting_level_option ; 
			}).catch(function(error){
				console.log(error);
			});

			
	},

}

</script>

<style>
	.el-dialog{
		text-align:left;
	}
</style>