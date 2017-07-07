<template>
    <div>
        <el-row>
            <el-col>
                <div class="leftBar">
                    <el-menu theme="dark" default-active="defaultActive" router>
                        <template v-for="item in navBarItems">
                            <template v-if="item.subs">
                                <el-submenu :index="item.index">
                                    <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
                                    <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index"
                                                  :route="item.route">{{subItem.title}}
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                            <template v-else>


                                <el-menu-item :index="item.index" :route="item.route">
                                    <i :class="item.icon"></i>{{item.title}}
                                </el-menu-item>

                            </template>

                        </template>
                        <template>
                            <el-menu-item index="" @click="confirmLeave">
                                <i class='el-icon-close'></i>退出
                            </el-menu-item>
                        </template>
                    </el-menu>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
//    import mockdata from '@/util/exit.js'
    import ElMenuItem from "../../../node_modules/element-ui/packages/menu/src/menu-item";
    export default{
        components: {ElMenuItem},
        data(){
            return {
                defaultActive : 'query',
                navBarItems: [
                    {
                        icon: 'el-icon-search',
                        index: '/home/query',
                        title: '查询会议',
                    }, {
                        icon: 'el-icon-menu',
                        index: '/home/create',
                        title: '添加会议',
                    }, {
                        icon: 'el-icon-setting',
                        index: '/home/settings',
                        title: '系统设置',
                    },
                ]
            }
        },
        methods: {
            confirmLeave() {
                let _this = this;
                this.$confirm('是否退出系统?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    axios.post('/logout', {}).then((response) => {
                        console.log(response.data);
                        if(response.data.isLogout){
                            _this.$router.push('/login');
                        }
                    }).catch((error) => {
                        console.log(error);
                    });

                }).catch(() => {
                    this.$router.go(0);
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });

                })
            }
        },
//        beforeRouteLeave: (to, form, next) => {
//            let _this = this;
//            this.$confirm('是否退出系统?', '提示', {
//                confirmButtonText: '确定',
//                cancelButtonText: '取消',
//                type: 'warning'
//            }).then(() => {
//                this.$message({
//                    type: 'success',
//                    message: '退出成功!'
//                });
//                next(true) ;
////                _this.$router.push()
////                axios.get('/logout').then(() => {
////                    console.log(1);
////                    if (response.data.isLogout) {
////                        _this.$router.push({'path': '/login'});
////                    }else{
////
////                    }
////                })
//            }).catch(() => {
//                this.$message({
//                    type: 'info',
//                    message: '已取消',
//                });
//            });
//        }
        // computed:{
        //           onRoutes(){
        //           	console.log(this.$route.path.replace('/',''))
        //               return this.$route.path.replace('/','');
        //           }
        //       }
    }
</script>

<style scoped>
    .leftBar {
        display: block;
        /*position: fixed;*/
        width: 250px;
        left: 0;
        top: 70px;
        /*bottom:0;*/
        background: #2E363F;
        height: 100%;

    }

    .leftBar > ul {
        height: 100%;
    }

</style>