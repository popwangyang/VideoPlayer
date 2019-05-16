<template>
	<div class="box">
		<span class="box_span1">播放记录</span>
		<span class="box_span2" id="style-2">
			<ul>
				<template v-for="(item, index) in arr">
					<li v-if="item.type == 'file'" :title="item.name" :class="{b:item.isPlaying}" :key="index">
						<span style="display: flex;width: 90%;height: 26px;align-items: center;overflow: hidden;" class="list" @click="selectClick(index)">{{item.name}}</span>
					</li>
					<li v-if="item.type == 'directory'" :key="index">
						<Directory :children="item"></Directory>
					</li>
				</template>	
				<li v-show="flage">没有更多了...</li>
			</ul>			
		</span>
		<span class="box_span3">
			<i class="el-icon-sort iconBox"></i>
			<i class="el-icon-document iconBox"></i>
		</span>		
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import Directory from './directoryComponent'
	export default {
		components:{
			Directory
		},
		data() {
			return {
				flage:false
			};
		},
		computed:{
			...mapState({
				
				arr: (state) => {
					console.log(state)
					return state.Counter.arr;
				}
			})
		},
		methods: {
			selectClick(index) {
				this.$emit('selectClick', index)
			}
		},
		mounted(){
			var _this = this;
			var box = document.getElementById('style-2');
			box.onscroll = function(){
				_this.flage = true				 
			}
		}
	}
</script>

<style scoped="scoped">
 .box{
	width: 240px;
	height: 100%;
	background: #212121;
	display: flex;
	flex-direction: column;	
	color: #979797;
	padding-left: 10px;
	overflow: hidden;
 }
 li{
	 
	 cursor: pointer;
	
	 padding-left:10px;
	 overflow: hidden;
	 text-overflow:ellipsis;
	 white-space: nowrap;
 }
 li span {
	 
 }
 .list:hover{
	
	 color: #3091db;
	 
 }
 .b{
	 color: #3091db;
 }
 .box_span1, .box_span3{
	 display: flex;
	 height: 50px;
	 background: yellow;
	 align-items: center;
	 background: #212121;
 }
 .box_span3{
	justify-content: flex-end; 
 }
 .box_span3 i{
	 margin-right: 20px;
	 font-size: 20px;
 }
 .box_span2{
	 flex: 1;
	 overflow: auto;
	 background: #212121;	 
 }
.iconBox{
	cursor: pointer;
}
.iconBox:hover{
	color: white;
}
   /*定义滚动条轨道*/
    #style-2::-webkit-scrollbar-track
    {
        background-color: #212121;
        /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.22); */
    }
    /*定义滚动条高宽及背景*/
    #style-2::-webkit-scrollbar
    {
        width: 15px;
        background-color: #5b5c5f;
    }
    /*定义滚动条*/
    #style-2::-webkit-scrollbar-thumb
    {
        background-color: #4c4b4b;
        /* border-radius: 10px; */
    }
</style>
