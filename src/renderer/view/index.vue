<template>
	<div class="box">
		<span style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;" v-show="!showVideo">	
				<span style="display: flex;width: 100%;height: 100%;overflow: hidden;">
					<span style="flex: 1;" >
						<ExportView @playVideo='playVideo'></ExportView>
					</span>
					<span style="display: flex;width: 240px;">
						
					</span>
				</span>		
		</span>
		<span v-if="showVideo">
			 <VideoPlayer @eventVideo="event"></VideoPlayer> 
		</span>
		<span style="display: flex;width: 240px;position: absolute;right: 0;top:0;height: 100%;z-index: 10;" v-show="!showVideo" :class="{list:showVideo}">
			<SiderList></SiderList>
		</span>
		
	</div>
</template>

<script>
	import ExportView from '../components/export'
	import SiderList from '../components/sider'
	import VideoPlayer from '../components/video'
	export default {
		components:{
			ExportView,
			SiderList,
			VideoPlayer
		},
		data() {
			return {
				showVideo:false
			};
		},
		methods:{
			playVideo(){
				this.showVideo = true
			},
			event(e){
				console.log(e)
				this.showVideo = false
			}
		}
	}
</script>

<style scoped="scoped">
 .box{
	 width: 100%;
	 height: 100%;
	 background: beige;
	 position: relative;
	 overflow: hidden;
 }
 .list{
	 transition: all 1s;
	 transform: translateX(240px);
 }
 .box:hover .list{
	  transform: translateX(0);
 }
</style>
