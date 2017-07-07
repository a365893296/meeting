<template>
    <div>
        <el-row class="topBar">
            <h1 style="margin-top: 7px">会议管理系统</h1>
        </el-row>
        <el-row>
            <div>
                <el-col :span="4">
                    <nav-bar></nav-bar>
                </el-col>
            </div>
            <div>
                <el-col :span="19">
                    <transition appear name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </el-col>
            </div>
        </el-row>
    </div>
</template>

<script>
    import NavBar from '@/components/home/navBar'

    export default{
        data(){
            return {}
        },
        components: {
            NavBar
        }

    }

</script>

<style scoped>

    .topBar {
        width: 100%;
        background-color: rgb(46, 55, 68);
        height: 70px;
        /*text-align: center;*/
    }

    .topBar > h1 {
        color: white;
        text-align: center;
    }

    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-active {
        transform: translateX(10px);
        opacity: 0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>