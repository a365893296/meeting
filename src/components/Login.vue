<template>
  <div id="background">
    <el-row align="middle">
      <div id="login">

        <el-col :xs="4" :sm="4" :md="8" :lg="8">&nbsp</el-col>

        <el-col :xs="16" :sm="16" :md="8" :lg="8" class="form">

          <h1> 会议管理系统</h1>

          <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="90px"
                   class="demo-loginForm">

            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginForm.username"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" type="password"
                        v-on:keyup.enter.native="login(loginForm)"></el-input>
            </el-form-item>

            <el-row>
              <el-form-item>
                <el-col :span="12">
                  <el-button type="primary" v-on:click="login(loginForm)">登录</el-button>
                </el-col>
                <el-col :span="3">

                  <router-link to="register" tag="el-button">注册</router-link>
                </el-col>
              </el-form-item>
            </el-row>

          </el-form>


        </el-col>

        <el-col :xs="4" :sm="4" :md="8" :lg="8"></el-col>

      </div>

    </el-row>
  </div>
</template>

<script>
//  import mockdata from '@/util/login.js'
import  store from '../vuex/store'
  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {
              required: true, message: "请输入用户名", trigger: 'blur',
            }
          ],
          password: [
            {
              required: true, message: "请输入密码", trigger: 'blur',
            }
          ]
        },

      }
    },
    methods: {
      login(formName) {
        let _this = this;
        axios.post('/login', {
          'username': formName.username,
          'password': formName.password
        }).then(function (response) {
          var data = response.data ;
          _this.$store.commit('SETUSER',data.user) ;
          if (data.islogin) {
            _this.$router.push({path: '/home'})
          } else {
            _this.$message({
              message: '用户名或密码错误',
              type: 'error'
            })
          }
        }).catch(function (error) {
          console.log(error)
        })
      },

      showRegisterForm: function () {
        router.push({path: 'register'})
      }
    },


  }
</script>

<style scoped>
  .form {
    margin-top: 15%;
    /*border:  1px solid;*/
    padding: 20px 20px 20px 0px;
    background: #fff;
    border-radius: 5px;
  }

  #background {
    display: table;
    width: 100%;
    height: 100%;
    padding: 0px 0;
    text-align: center;
    /*color: #fff ;*/
    background: url('../assets/background2.jpg') center;
    background-color: #000;
    background-size: cover;
    background-attachment: fixed;
    background-repeat: repeat;
    /*position: fixed;*/
  }

  .el-form-item__label {
    color: #e9e9e9;
  }
</style>
