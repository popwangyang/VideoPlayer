<template>
	<div class="box"  @mouseleave="showNave = false">
		<span class="box1">
			<video id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9">
				 
			</video>
		</span>
		<span class="box2">
			<span class="box2_span1" @mousemove="myMousemove">
				<transition name="title-fade">
				  <span class="box15_top" v-show="showNave" >
					{{videoName}}
				  </span>									 
				</transition>
				<span class="box15_top" style="-webkit-app-region: drag;opacity: 0;"></span>
				<transition name='controls-fade'>
				  <span class="box15_bottom" v-show="showNave">
				  	<span class="jindutiao">
				  		<i class="iconfont icon-rewind-left" @click="moveLeft"></i>
				  		<div class="jindutiao-silder"><Silder ref="silder" @setTime="setTime"></Silder></div>
				  		<i class="iconfont icon-rewind-right" @click="moveRight"></i>
				  	</span>
				      <span class="kongjian">
				  		<span style="display: flex;width: 200px;height: 100%;align-items: center;justify-content: center;color: #c7c7c7;">
				  			{{videoCurrentTime}} / {{videoTotalTime}}
				  		</span>
				  		<span style="display: flex;height: 100%;flex: 1;align-items: center;justify-content: center;">
				  			<KongJian @event="eventVideo" :playFlage="playFlage">
								<i class="iconfont icon-volume-up icon icon-audio" v-show="audio != 0" title="静音 热键:'Ctrl+M'" @click="stopVolume"></i>
								<i class="iconfont icon-volume-off icon icon-audio" v-show="audio == 0" title="取消静音 热键:'Ctrl+M'" @click="startVolume"></i>
								<span style="display: flex;align-items: center;width:100px;height: 20px;margin-left: 10px;">
								   <el-slider v-model="audio" style='width: 90px;' :max="10" @change="volumeChange"></el-slider>
								</span>
							</KongJian>
				  		</span>
				  		<span style="display: flex;width: 200px;height: 100%;align-items: center;justify-content: flex-end;color: #c7c7c7;margin-right: 40px;cursor: pointer;">
				  			<i class="iconfont icon-quanping icon" title="全屏 热键:'Ctrl+回车'" @click="fullScreen"></i>
				  		</span>
				  	</span>
				  </span>	
				</transition>				
			</span>
			<span class="box2_span2" @mouseenter="myMouseEnter">
				  <span class="box2_list_button" @click="listButton">
				  	  <i class="el-icon-arrow-left" style="color: #6d6c6c;font-size: 20px;"></i>
				  </span>
				 <transition name="slide-fade">
				  <span class="box2_list" v-show="showList" @mouseleave="myMouseLeave">	
					  <SiderList @selectClick="selectClick"/>
				  </span>
				  </transition>
			</span>
		</span>
	</div>
</template>

<script>
	var ipcRenderer = require('electron').ipcRenderer;
	const remote = require('electron').remote;
	const BrowserWindow = remote.getCurrentWindow();
	import Silder from './silder'
	import KongJian from '../kongJian'
	import SiderList from '../sider'
	import { getVideoURLlist } from '../../util.js'
	export default {
		components:{
			Silder,
			KongJian,
			SiderList
		},
		data() {
			return {
				value:'right: -240px;',
				showList:false,
				showNave:true,
				video:null,
				URLlist:'',
				options:{
					contorls: false,
					autoplay: true,  // 播放器准备好后，是否自动播放；
					preload: 'auto',
					muted: false,
					sources: [{
						type: 'video/mp4',
			            src: 'http://localhost:4398?startTime=0'
					}]
				},
				currentSrc:'http://localhost:4398?startTime=',
                playFlage:false,
				audio:2,
				saveAudio:0,
			};
		},
		computed:{
			videoTotalTime(){
				return this.$store.getters['Silder/videoTotleTime']
			},
			videoCurrentTime(){
				return this.$store.getters['Silder/videoCurrentTime']
			},
			videoSrc(){
				console.log(this.$store.getters['Counter/currentVideo'])
				return this.$store.getters['Counter/currentVideo'].src
			},
			videoName(){
				
				return this.$store.getters['Counter/currentVideo'].name
			}
		},
		methods:{
			listButton(){
				this.showList = true;
			},
			myMousemove(e){
				this.showNave = true;
			},
			myMouseEnter(){
				this.showNave = false;
			},
			myMouseLeave(){
				this.showList = false;   
			},
			moveLeft(){
				console.log('moveLeft')
				this.$refs.silder.moveLeft()
			},
			moveRight(){
				console.log('moveRight')
				this.$refs.silder.moveRight()
			},
			volumeChange(e){
				console.log(e)
				this.video.volume(e/10)
			},
			stopVolume(){
				this.saveAudio = this.audio;
				this.audio = 0;
				this.video.volume(this.audio/10)
			},
			startVolume(){
				this.audio = this.saveAudio;	
				this.video.volume(this.audio/10)
			},
			fullScreen(){
				console.log(BrowserWindow)
				var flag = BrowserWindow.isFullScreen()
				BrowserWindow.setFullScreen(!flag)
			},
			selectClick(index){
				this.$store.commit('Counter/selectPlayVideo', index)
				ipcRenderer.send('fileDrop', this.videoSrc);
				ipcRenderer.once('duration',  (event, message) => {
						console.log(message, "duration")
						this.$store.commit("Silder/getTotalTime", message);
						this.initVideo()
				});
			},
			setTime(offset){
				var startTime = offset * this.$store.state.Silder.totlTime;
				this.video.src([
				  {
				    type: 'video/mp4',
				    src: this.currentSrc+startTime
				  },
				  ]);
				this.video.load(this.currentSrc+startTime);
				this.video.play();
				this.$store.commit("Silder/setStartTime", startTime);
			},
			eventVideo(e){
				switch(e){
					case 'stop':
					  this.video.pause()
					  this.video.dispose()
					  this.video = null;
					  this.$store.commit('Counter/over')
					  this.$emit("eventVideo", e)
                      
					  break;
					case 'play':
					  this.video.play();
					  break;
					case 'pause':
					  this.video.pause();
					  break;
					case 'initVideo':
					  this.initVideo();
					  break;
				}
			},
			init(){
				this.$store.commit("Silder/setStartTime", 0);
				this.$store.commit("Silder/getCurrentTime", 0);
				this.playFlage = false;
				this.video.play();
				console.log("play")
				this.video.on('play', (e) => {
					this.playFlage = false
				})
				this.video.on('pause', (e) => {
					this.playFlage = true
				})
				this.video.on('timeupdate', (e) => {
					this.playFlage = false
					if(this.$store.state.Silder.canUpdate){
						this.$store.commit("Silder/getCurrentTime", this.$store.state.Silder.startTime + this.video.currentTime());
					}
				})
			},
			initVideo(){
				if(this.video == null){
					  this.video = this.$video(myVideo, this.options, () =>{
						  this.init()
					  })
				}else{
					this.video.src([{
						  type: 'video/mp4',
						  src: this.currentSrc+this.$store.state.Silder.startTime
						  }]);
					this.video.load(this.currentSrc+this.$store.state.Silder.startTime);
					this.video.play(); 
				}		
			}
		},
		mounted(){
			this.$store.commit("Silder/setStartTime", 0);
			this.$store.commit("Silder/getTotalTime", 0);
			console.log(this.videoSrc)
			ipcRenderer.on('error', (event, message) => {
				console.log(message)
			})
			ipcRenderer.send('fileDrop', this.videoSrc);
			ipcRenderer.once('duration',  (event, message) => {
					console.log(message, "duration")
					this.$store.commit("Silder/getTotalTime", message);
					this.initVideo()
			});
		}
	}
</script>

<style scoped="scoped">
#video{
	width: 100%;
	margin: 0;
	padding: 0;
}
.box{
	width: 100%;
	height: 100%;
	position: relative;
}
.box1, .box2, .box15{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}
.box1{
	display: flex;
	align-items: center;
	background: black;
}
.box15_top{
	position: absolute;
	top: 0px;
	left: 0;
	display: flex;
	width: 100%;
	height: 50px;
	background: #242525;
	align-items: center;
	color: white;
	padding-left: 20px;
}
.box15_bottom{
	position: absolute;
	left: 0;
	bottom: 0;
	display: block;
	width: 100%;
	height: 80px;
	background: #242525;
}
.box2{
	z-index: 8;	
	
}
.box2_span1{
	display: flex;
	height: 100%;
	width: 100%;	
	position: absolute;
	
}
.icon{
	font-size: 26px;
}
.icon:hover{
	color: #2865b1;
	text-shadow: 1px 2px 20px #205698;
}
.jindutiao{
    display: flex;
	height: 10px;
	align-items: center;
	width: 100%;
}
.jindutiao-silder{
    flex: 1;
	height: 10px;
	background: #000000;
	
}
.jindutiao i{
	font-size: 20px;
	color: #d3d3d3;
	margin: 0;
	padding: 0;
	cursor: pointer;
}
.kongjian {
	display: flex;
	width: 100%;
	height: 70px;
	justify-content: space-around;
}
.box2_span2{
	display: flex;
	height: 40%;
	width: 100%;
	
	position: absolute;
	left: 0;
	top: 30%;	
}
.box2_list_button{
	display: flex;
	width: 20px;
	height: 80px;
	background: #212121;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: all 1s;
	cursor: pointer;
	position: absolute;
	right: 0px;
	top: 40%;
}
.box2_list{
	height: 250%;
	width: 240px;
	background: #212121;
	position: absolute;
	top: -75%;
	right: 0px;
}
.box2_span2:hover .box2_list_button{
	opacity: 1;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s  ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(240px);
}

.title-fade-enter-active, .controls-fade-enter-active {
  transition: all 0.5s;
}
.title-fade-leave-active, .controls-fade-leave-active {
  transition: all 0.5s;
  transition-delay: 1.5s;
}
.title-fade-enter, .title-fade-leave-to {
	transform: translateY(-50px);
	-webkit-app-region: drag;
}

.controls-fade-enter, .controls-fade-leave-to {
	transform: translateY(80px);
}
</style>
