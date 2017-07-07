<template>
    <h1></h1>
</template>

<script>

    export default{

        methods: {
           leave : ()=>{
               this.$router.push('/login');
           }
        },
        data(){
            return {
            }
        },

        beforeRouteLeave (to, from, next) {
            let _this = this;
            this.$confirm('是否退出系统?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
//                axios.get('/logout').then(() => {
//                    console.log(1);
//                    if (response.data.isLogout) {
//                        _this.$router.push({'path': '/login'});
//                    }else{
//
//                    }
//                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消',
                });
            });
        }
    }
</script>