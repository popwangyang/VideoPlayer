const state = {
  main: 0,
  totlTime:0,
  currentTime:0,
  startTime:0,
  canUpdate:true
}

const getters = {
    videoTotleTime: (state) => {
	  var hours = Math.floor(state.totlTime/3600) < 10 ?  ("0"+Math.floor(state.totlTime/3600)):Math.floor(state.totlTime/3600);
	  var minute = Math.floor((state.totlTime / 60) % 60) < 10 ? ("0"+Math.floor((state.totlTime / 60) % 60)):Math.floor((state.totlTime / 60) % 60);
	  var seconds = Math.floor(state.totlTime % 60) < 10 ? ("0"+Math.floor(state.totlTime % 60)):Math.floor(state.totlTime % 60);
	  return hours+":"+minute+":"+seconds;
    },
    videoCurrentTime: (state) => {
		var hours = Math.floor(state.currentTime/3600) < 10 ?  ("0"+Math.floor(state.currentTime/3600)):Math.floor(state.currentTime/3600);
		var minute = Math.floor((state.currentTime / 60) % 60) < 10 ? ("0"+Math.floor((state.currentTime / 60) % 60)):Math.floor((state.currentTime / 60) % 60);
		var seconds = Math.floor(state.currentTime % 60) < 10 ? ("0"+Math.floor(state.currentTime % 60)):Math.floor(state.currentTime % 60);
		
		return hours+":"+minute+":"+seconds;
	},
    videoPrecent: (state) => {
		return (state.currentTime/state.totlTime)*100
	}
}

const mutations = {
    getTotalTime(state, num){
		state.totlTime = num;
	},
	getCurrentTime(state, num){
		state.currentTime = num;
	},
	setStartTime(state, num){
		state.startTime = num;
	},
	changeCanUpdate(state, flage){
		state.canUpdate = flage;
	}
}

const actions = {
  
}

export default {
	namespaced: true,
    state,
	getters,
    mutations,
    actions
}
