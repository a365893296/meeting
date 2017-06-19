<template>
	<div>
		<el-row>
			<el-col >
				<div class="leftBar" >
					<el-menu theme="dark" default-active="query" router>							
						<template v-for="item in navBarItems">
							<template v-if="item.subs">
								<el-submenu :index="item.index">
									<template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
									<el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" :route="item.route">{{subItem.title}}</el-menu-item>
								</el-submenu>
							</template>
							<template v-else>
								<el-menu-item :index="item.index"  :route="item.route" ><i :class="item.icon" ></i>{{item.title}}</el-menu-item>
							</template>
						</template>
					</el-menu>
				</div>
			</el-col>
		</el-row>
	</div>

</template>

<script>
	export default{
		data(){
			return {
				navBarItems :[
					{
						icon:'el-icon-search',
						index: '/home/query',
						title: '查询会议',
					},{
						icon:'el-icon-menu' ,
						index:'/home/create',
						title :　'添加会议',
					},{
						icon :'el-icon-setting' ,
						index : '/home/settings',
						title : '系统设置',
					},{
						icon : 'el-icon-close',
						index : '/home/exit',
						title :'退出系统'
					}
				]
			}
		},
		// computed:{
  //           onRoutes(){
  //           	console.log(this.$route.path.replace('/',''))
  //               return this.$route.path.replace('/','');
  //           }
  //       }
	}
</script>

<style scoped>
.leftBar{
        display: block;
        /*position: fixed;*/
        width: 250px;
        left: 0;
        top: 70px;
        /*bottom:0;*/
        background: #2E363F;
        height: 100% ;

    }
.leftBar > ul{
		height: 100% ;
	}

</style>