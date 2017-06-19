<template>
<div>
<el-row class="topBar">
  <h1 style="margin-top: 7px">会议管理系统</h1>
</el-row>
<el-row>
	<el-col :span="4">
	<nav-bar></nav-bar>
	</el-col>
	<el-col :span="19">
		<transition><router-view></router-view></transition>
	</el-col>
</el-row>
</div>
</template>

<script>
import NavBar from '@/components/home/navBar'

export default{
	data(){
		return {

		}
	},
	components :{
		NavBar
	}

}

</script>

<style scoped>

	.topBar{
		width: 100% ;
		background-color : rgb(46, 55, 68);
		height: 70px ;
		/*text-align: center;*/
	}

	.topBar > h1 {
		color : white;
		text-align: center;
	}
</style>