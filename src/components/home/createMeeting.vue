<template>
  <el-row :gutter="55" class="create_form">
    <el-form :model="create" :rules="createRules" ref="create" label-width="90px">
      <el-col :span="10" :offset="1">
        <el-form-item label="会议主题" prop="topic">
          <el-input v-model="create.topic"></el-input>
        </el-form-item>

        <el-form-item label="会议级别">
          <el-select v-model="create.meeting_level">
            <el-option
              v-for="item in meeting_level_option"
              :key="item.meeting_level"
              :label="item.label"
              :value="item.meeting_level">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="会议性质">
          <el-select v-model="create.meeting_feature">
            <el-option
              v-for="item in meeting_feature_option"
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
        <el-form-item label="参与人员" prop="participant">
          <el-col :span="17">
          </el-col>
          <el-button type="primary" @click="participantVisible = true">选择</el-button>
        </el-form-item>

        <!-- 参与人员选择框 -->
        <el-dialog title="参与人员选择" :visible.sync="participantVisible" id="dialog">
          <el-row :gutter='20'>

            <el-col :span="6">
              <el-tree
                :data="dept"
                :props="deptProps"
                @current-change="getUsers"
                highlight-current
                :indent='25'
              >
              </el-tree>
            </el-col>

            <el-col :span='18'>
              <el-transfer
                v-model="create.participant"
                :data="transferData"
                :titles="['可选人员', '已选人员']"
                :indent='25'
              >
              </el-transfer>
            </el-col>

          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" :plain="true" @click="participantVisible = false">取 消</el-button>
            <el-button type="primary" @click="participantVisible = false">确 定</el-button>
          </div>
        </el-dialog>


        <el-form-item label="日期">
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            :picker-options="datePickerOption">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="时间">
          <el-time-select
            v-model="time"
            :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '22:30'
                                }"
            placeholder="选择时间">
          </el-time-select>

        </el-form-item>

        <el-form-item label="时长">
          <el-input-number v-model="create.duration" :step="15" :min="0"
                           @change="durationIsChange = true"></el-input-number>
          （分钟）
        </el-form-item>
        <el-form-item label="会议室" prop="site">
          <el-select
            v-model="create.site"
            filterable
            placeholder="请选择"
            noDataText="请选择会议时间和时长"
            @visible-change="getEmptyRooms"
          >
            <el-option
              v-for="room in sitesOption"
              :key="room.id"
              :label="room.site"
              :value="room.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <!--todo 保存到本地  暂未实现-->
          <el-button type="primary">保存</el-button>
          <el-button type="success" @click="commit(create)">提交</el-button>
          <el-button :plain='true' type="danger">清空</el-button>
        </el-form-item>
      </el-col>
    </el-form>

  </el-row>

</template>

<script>
  //  import mockdata from '@/util/category.js'
  //  import treedata from '@/util/treedata.js'
  //  import transfer from '@/util/transfer.js'
  //  import rooms from '@/util/rooms.js'


  export default {
    data() {
      return {
        // form数据
        create: {
          topic: '',
          meeting_feature: 'common',
          meeting_level: 'common',
          content: '',
          host: '',
          master: '',
          participant: [],
          duration: 0,
          site: '',

        },

        meeting_feature_option: [
          {
            label: '网络会议',
            meeting_feature: 'net',
          },
          {
            label: '电话会议',
            meeting_feature: 'phone'
          },
          {
            label: '普通会议',
            meeting_feature: 'common'
          },
        ],

        meeting_level_option: [
          {
            label: '高级',
            meeting_level: 'high'
          },
          {
            label: '中级',
            meeting_level: 'middle'
          },
          {
            label: '普通',
            meeting_level: 'common'
          },
        ],

        createRules: {
          topic: [
            {required: true, message: "请输入会议主题", trigger: 'blur',}
          ],
          participant: [
            {required: true, message: "请选择参与人员", trigger: 'blur'}
          ],
          site: [
            {required: true, message: '请选择会议室', trigger: 'blur'}
          ],
        },

        time: '',
        date: '',
        sitesOption: [],

        //参与人员选择 dialog
        participantVisible: false,
        dept: [],
        deptProps: {
          id: 'id',
          children: 'children',
          label: 'name',
        },

        transferData: [],

        datePickerOption: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        datetimeIsChange: false,
        durationIsChange: false,
      }
    },

    computed: {
      datetime: function () {
        this.durationIsChange = true;
        var d = new Date(this.date);
        //转换时间格式 2000-00-00 00:00:00
        var res = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + this.time;

        return res;
      }
    },

    methods: {
      getDept() {
        let _this = this;
        if (_this.dept) {
          axios.get('/getDept', {})
            .then(function (response) {
              var data = response.data.dept;
              _this.dept = data;
            }).catch(function (error) {
            console.log(error);
          })
        }
      },

      getUsers(data) {
        //能正确获取人员，但只在部门下显示对应已被选择人员

        console.log(this.create.participant);

        let _this = this;
        axios.post('/getUsers', {id: data})
          .then(function (response) {
            const data = response.data.users;
            const transferData = [];
            for (let i = 0; i < data.length; i++) {
              transferData.push({
                key: data[i].id,
                label: data[i].name,
              });
            }

            _this.transferData = transferData;

          }).catch(function (error) {
          console.log(error);
        });
      },

      getEmptyRooms() {
        let _this = this;
        if (this.datetime != null && this.create.duration != 0) {
          if (_this.datetimeIsChange || _this.durationIsChange) {
            axios.post('/getEmptyRooms', {
              'meeting_time': _this.datetime,
              'duration': _this.create.duration,
            }).then(function (response) {

              var emptyRooms = response.data.emptyRooms;
              _this.sitesOption = emptyRooms;
              _this.create.site = null ;
              _this.datetimeIsChange = false;
              _this.durationIsChange = false;
//              console.log(emptyRooms);
            }).catch(function (error) {
              console.log(error);
            });
          }
        }
      },

      commit(create) {
        let _this = this;
        axios.post('/createMeeting',
          {
            data: create,
            meeting_time: this.datetime
          }
        ).then(function (response) {

          var data = response.data;
          if (data.isSuccess) {
            _this.$message({
              'type': 'success',
              'message': '添加成功~',
            });
          } else {
            _this.$message.error('添加失败!');

          }

        }).catch(function (error) {
          console.log(error);
        })

      },


    },

    mounted: function () {
      this.getDept();
    },


  }

</script>

<style>
  .create_form {
    margin-top: 3%;
  }

  .el-dialog {
    text-align: left;
  }
</style>
