const state = {
  currentVideoIndex: "",
	arr:[]
}

const getters = {
	  currentVideo(state){
		    
			var index = state.currentVideoIndex;
			state.arr.map((item, num) => {
				if(num == index){
					item.isPlaying = true
				}else{
					item.isPlaying = false
				}
			})
			var obj = {
				name: state.arr[index].name,
				src: state.arr[index].path
			}
			return obj;
		}
}	

const mutations = {
  pushList(state, result){
		state.arr = state.arr.concat(result)
		state.currentVideoIndex = state.arr.length - 1;
	},
	nextplayVideo(state){
		if(state.currentVideoIndex == 0){
			state.currentVideoIndex = state.arr.length - 1;
		}else{
			state.currentVideoIndex--;
		}
	},
	lastPlayVideo(state){
		if(state.currentVideoIndex == (state.arr.length - 1)){
			state.currentVideoIndex = 0;
		}else{
			state.currentVideoIndex++;
		}
	},
	selectPlayVideo(state, index){
		state.currentVideoIndex = index
	},
	over(state){
		state.arr.map(_=> _.isPlaying = false)
	}
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
	namespaced: true,
  state,
	getters,
  mutations,
  actions
}
