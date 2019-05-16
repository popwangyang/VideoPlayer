<template>
	<div class="silder">
		<span class="pass" :style="passPrecent"></span>
		<span class="kuai" :style="precent"></span>
		<span class="time">{{time}}</span>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				value:'left:0px',
				div1:null,
				div2:null,
				moveDistance:20,
				time:""
			}
		},
		computed:{
			precent(){
				 
				return "left:" + this.$store.getters['Silder/videoPrecent']+'%'
			},
			passPrecent(){
				return "width:" + this.$store.getters['Silder/videoPrecent']+'%'
			}
		},
		methods:{
			moveLeft(){
				this.move(true);
			},
			moveRight(){
				this.move(false);
			},
			move(flage){
				if(flage){
					if(this.div1.offsetLeft <= this.moveDistance){
						this.div1.style.left = 0 + 'px';
					}else{
						this.div1.style.left = this.div1.offsetLeft - this.moveDistance + 'px';
					}
				}else{
					console.log(this.div1.offsetLeft, (this.div2.offsetWidth - this.moveDistance - this.div1.offsetWidth))
					if(this.div1.offsetLeft >= (this.div2.offsetWidth - this.moveDistance - this.div1.offsetWidth)){
						this.div1.style.left = this.div2.offsetWidth - this.div1.offsetWidth + 'px';
					}else{
						this.div1.style.left = this.div1.offsetLeft + this.moveDistance + 'px';
					}
				}
			var moveTo = this.div1.style.left.replace(/px/, '') / this.div2.offsetWidth;
				this.$emit("setTime", moveTo)	
			},
			getTime(precent){
				
				var hoverTime = this.$store.state.Silder.totlTime * precent;
				var hours = Math.floor(hoverTime/3600) < 10 ?  ("0"+Math.floor(hoverTime/3600)):Math.floor(hoverTime/3600);
				var minute = Math.floor((hoverTime / 60) % 60) < 10 ? ("0"+Math.floor((hoverTime / 60) % 60)):Math.floor((hoverTime / 60) % 60);
				var seconds = Math.floor(hoverTime % 60) < 10 ? ("0"+Math.floor(hoverTime % 60)):Math.floor(hoverTime % 60);
				this.time =  hours+":"+minute+":"+seconds;
			}
			
		},
		mounted(){
			var div1 = document.getElementsByClassName('kuai')[0]
			var div2 = document.getElementsByClassName('silder')[0]
			var div3 = document.getElementsByClassName('time')[0]
			var _this = this;
			this.div1 = div1;
			this.div2 = div2;
			    div1.onmousedown = function(ev){
					
					var oevent = ev || event;
					var distanceX = oevent.clientX - div1.offsetLeft;
					document.onmousemove = function(ev){
						_this.$store.commit('Silder/changeCanUpdate', false)
						var oevent = ev || event;
						var a = div2.offsetLeft;
						var b =  div2.offsetWidth - div1.offsetWidth;
						var distance = oevent.clientX - distanceX;
						// console.log(distance , b)
						if(distance < a){
							div1.style.left = 0 + 'px'
						} else if(distance > b){
							div1.style.left = b + 'px'
						}else{
							div1.style.left = oevent.clientX - distanceX + 'px';
						}						
					};
					document.onmouseup = function() {
						document.onmousemove = null;
						document.onmouseup = null;						
						moveTo = div1.style.left.replace(/px/, '') / div2.offsetWidth;
						console.log(div1.style.left.replace(/px/, '') , div2.offsetWidth)
						_this.$emit("setTime", moveTo)	
						_this.$store.commit('Silder/changeCanUpdate', true)
					}
				}
			    div2.onmousedown = function(ev){
					var oevent = ev || event;
					console.log(oevent.clientX)
					
					var moveTo = (oevent.clientX - 30) / div2.offsetWidth;
					_this.$emit("setTime", moveTo)	
				}
				div2.onmouseover = function(ev){
					var oevent = ev || event;
					div3.style.display = 'block';
					if(oevent.clientX > (document.body.clientWidth - div3.offsetWidth / 2)){
						div3.style.left = div2.offsetWidth - (div3.offsetWidth / 2 - 20)
					}else if(oevent.clientX < div3.offsetWidth / 2){
						
						div3.style.left = div3.offsetWidth / 2 - 20
					}else{
						
						div3.style.left = oevent.clientX - 20 - div3.offsetWidth/2 + "px";
					}
					
					_this.getTime( (oevent.clientX - 20) / div2.offsetWidth)
					document.onmousemove = function(ev){
						var oevent = ev || event;
						console.log(oevent.clientX < div3.offsetWidth / 2)
						if(oevent.clientX > (document.body.clientWidth - div3.offsetWidth / 2)){
							div3.style.left = div2.offsetWidth - (div3.offsetWidth / 2 - 20)
						}else if(oevent.clientX < div3.offsetWidth / 2){
							
							div3.style.left = div3.offsetWidth / 2 - 20
						}else{
							
							div3.style.left = oevent.clientX - 20 - div3.offsetWidth/2 + "px";
						}
						
						_this.getTime( (oevent.clientX - 20) / div2.offsetWidth)
					}
					div2.onmouseleave = function(){
						document.onmousemove = null;
						div2.onmouseleave = null;	
						div3.style.display = 'none';
					}
				}
		}
	}
</script>

<style scoped="scoped">
	.silder{		
		height: 10px;
	    background: #4a4949;
		position: relative;
		cursor: pointer;
	}
	.kuai{
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 20px;
		border-radius: 4px;
		height: 10px;
		background: white;
	}
	.pass{
		position: absolute;
		left: 0;
		top: 0;
		background: black;
		display: block;
		height: 100%;
	}
	.time{
		display: none;
		min-width: 100px;
		height: 40px;
		background: wheat;
		text-align: center;
		line-height: 40px;
		position: absolute;
		top: -50px;
		left: 0px;
	}
</style>
