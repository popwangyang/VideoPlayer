<template>
	<span style="display: flex;width: 100%;height: 100%;justify-content: center;align-items: center;">
		<i class="iconfont icon-tingzhi icon" title="停止 热键:'Ctrl+S'" @click="stop"></i>
		<i class="iconfont icon-shangyishou icon" title="上一个 热键:'PgUp'" @click="playLast"></i>
		<span style="display: block;width: 70px;height: 70px;line-height: 70px;text-align: center;">
			<i class="iconfont icon-bofang1 icon icon-play"  title="暂停 热键:'空格'" v-show="!playFlage" @click="pauseVideo"></i>
			<i class="iconfont icon-bofang icon icon-play" style="font-size: 58px;" title="播放 热键:'空格'" v-show="playFlage" @click="playVideo"></i>		
		</span>		
		<i class="iconfont icon-shangyishou1 icon" title="下一个 热键:'PgDn'" @click="playNext"></i>
		<slot></slot>			
	</span>
</template>
<script>
	const ipcRenderer = require('electron').ipcRenderer;

	import { getVideoURLlist } from '../../util.js'
	export default{
		props:['playFlage'],
		data(){
			return {
				URLlist:''
			}
		},
		methods:{
			stop(){
				this.$emit('event', 'stop')
			},
			playLast(){
				this.$store.commit("Counter/lastPlayVideo")
				this.videoAddSrc(this.$store.getters['Counter/currentVideo'])
			},
			playNext(){
				this.$store.commit("Counter/nextplayVideo")
				this.videoAddSrc(this.$store.getters['Counter/currentVideo'])
			},
			videoAddSrc(resultSrc){
				ipcRenderer.once('duration',  (event, message) => {
						console.log(message, "duration")
						this.$store.commit("Silder/getTotalTime", message);
						this.$emit('event', 'initVideo')
						
				})
                ipcRenderer.send('fileDrop', resultSrc.src)				
			},
			pauseVideo(){			
				this.$emit('event', 'pause')
			},
			playVideo(){
				this.$emit('event', 'play')
			}
		},
		mounted(){
			this.URLlist = getVideoURLlist(this.$store.state.Counter.arr);

		}
	}
</script>

<style scoped="scoped">
	.icon{
		color: #3b3b3b;
		color: #c9c9c9;
		font-size: 40px;
		margin: 0 10px;
		cursor: pointer;
	}
	.icon:hover {
		color: #2865b1;
		text-shadow: 1px 2px 20px #205698;
	}
	.icon-play{
		font-size: 56px;	
	}
	.icon-audio{
		font-size: 26px;
		color: white;
	}
</style>
