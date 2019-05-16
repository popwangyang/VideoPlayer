<template>
	<div id="exportVidew">
		<span>
			<div class="div1">
				<div class="div2">
					<i class="el-icon-d-caret" style="font-size: 16px;"></i>
					<span>打开文件/可拖拽</span>
				</div>
				<input type="file" ref="file" @change="foo" class="file_input"/>
            </div>
		</span>
		<span style="display: flex;position: absolute;width: 100%;height: 80px;bottom: 0;left: 0;justify-content: center;align-items: center;">
			<i class="iconfont icon-tingzhi icon"></i>
			<i class="iconfont icon-shangyishou icon"></i>
			<i class="iconfont icon-bofang icon icon-play"></i>
			<i class="iconfont icon-shangyishou1 icon"></i>
			<i class="iconfont icon-volume-up icon icon-audio" v-show="audio != 0"></i>
			<i class="iconfont icon-volume-off icon icon-audio" v-show="audio == 0"></i>
			<span style="display: flex;align-items: center;width:100px;height: 20px;margin-left: 10px;">			
					<el-slider v-model="audio" style='width: 90px;'></el-slider>
			</span>			
		</span>
	</div>
</template>

<script>
	import { get } from '../../lib/api.js'
	import { ExportFiles } from '../../util.js'
	import axios from 'axios'
	export default {
		data() {
			return {
               audio:20
			};
		},
		methods:{
			foo(){	
				var _this = this;
				ExportFiles(this.$refs.file.files[0], function(result){									
					if(result[0].type == 'file'){
					   _this.$emit('playVideo')						   
					}
					result[0].isPlaying = true
					console.log(result)
					_this.$store.commit('Counter/pushList',result)
				})
			}
		},
		mounted(){
			var _this = this;
			var box = document.getElementById('exportVidew');
			    box.ondragover = function (ev) {
			    		//阻止浏览器默认打开文件的操作
			    	ev.preventDefault();				    		
			    }
			    box.ondrop = function(e){
					e.preventDefault();	
					console.log( e.dataTransfer.files[0])
					ExportFiles(e.dataTransfer.files[0], function(result){
						console.log(result)
						if(result[0].type == 'file'){
						   this.$emit('playVideo')	
						}
						result[0].isPlaying = true
						_this.$store.commit('Counter/pushList',result)
						
					})
				}
		}
	}
</script>

<style scoped="scoped">
	#exportVidew {
		background: #171717;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.div1 {
        position: relative;
    }

    .div2 {
        width: 150px;
        height: 36px;
        background: #2c2e2e;
        color: #fefefe;
        text-align: center;
        line-height: 36px;
		font-size: 14px;
    }
    .file_input {
        width: 250px;/*因为file-input在部分浏览器中会自带一个输入框，需要双击才可以点击上传,放大后将其定位到div外面就好啦*/
        height: 36px;
        position: absolute;
        left: -100px;
        top: 0;
        z-index:1;
        -moz-opacity: 0;
        -ms-opacity: 0;
        -webkit-opacity: 0;
        opacity: 0;  /*css属性——opcity不透明度，取值0-1*/
        filter: alpha(opacity=0); /*兼容IE8及以下--filter属性是IE特有的，它还有很多其它滤镜效果，而filter: alpha(opacity=0); 兼容IE8及以下的IE浏览器(如果你的电脑IE是8以下的版本，使用某些效果是可能会有一个允许ActiveX的提示,注意点一下就ok啦)*/
        cursor: pointer;
    }
	.icon{
		color: #3b3b3b;
		font-size: 40px;
		margin: 0 10px;
		cursor: pointer;
	}
	.icon-play{
		font-size: 60px;
		color: #2865b1;
		font-size: 60px;
		text-shadow: 1px 2px 20px #205698;
	}
	.icon-audio{
		font-size: 26px;
		color: white;
	}

</style>
