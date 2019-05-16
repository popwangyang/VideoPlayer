<template>
	<div>
		<span style="display: flex;width: 90%;height: 26px;align-items: center;overflow: hidden;" class="list" :title="children.name" @click="btnClick">
			<i class="el-icon-arrow-right iconList" :class="{a:flage}"></i>			
			<span>{{children.name}}</span>
		</span>		
			<span v-show="flage">				
					<span v-for="item in children.children">
						<span style="margin-left: 20px;display: flex;width: 180px;height: 26px;align-items: center;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" class="list" :title="item.name">
							{{item.name}}
						</span>
					</span>
				
			</span>		
	</div>
</template>

<script>
	export default {
		props:['children'],
		data() {
			return {
				flage:false
			};
		},
		methods:{
			btnClick(){
				this.flage = !this.flage
			}
		},
		mounted(){
			console.log(this.children)
		}
	}
</script>

<style scoped="scoped">
.list:hover{
	
	 color: #3091db;
	 
 }
 .iconList{
	transition: all 0.2s;
	margin-right: 6px;
 }
 .a{
   transform: rotate(90deg);
   transform-origin: center;
}
</style>
