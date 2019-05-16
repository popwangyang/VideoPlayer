<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'my-project'
  }
</script>
<style>
	body, html{
		margin: 0;
		padding: 0;
		-webkit-user-select:none; 
		height: 100%;
	}	
	ul, li{
		margin: 0;
		padding: 0;		
	}
	li{
		list-style: none;
	}
	
</style>
<style scoped="scoped">
  /* CSS */
	
	#app{
		height: 786px;
		height: 100%;
	}
</style>
