import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const  store = new Vuex.Store({
	state: {
		carposition: {},
		checkFoods: [],
		mprice: 0,
		flag: false
	},
	mutations: {
		//商家的配送价格
		minPrice(state, price){
			state.mprice = price
		},
		//购物车的位置
		setCarPosition(state,obj){
			state.carposition = obj
		},
		//增加数量
		incrementStore(state,obj){
			let index = state.checkFoods.findIndex(item=>item.name == obj.name)
			if (index == -1) {
				obj.count = 1;
				state.checkFoods.push(obj)
			}else {
				state.checkFoods[index].count+=1

			}
		},
		//减少数量
		decreaseStore(state,obj){
			// console.log(state.checkFoods)
			let index = state.checkFoods.findIndex(item=>item.name == obj.name)
			state.checkFoods[index].count -=1
			if (state.checkFoods[index].count == 0) {
				state.checkFoods.splice(index,1)
			}
		},
		control(state){
			state.flag = !state.flag
		},
		//清空
		clearAll(state){
			state.checkFoods = []
		}
	},
	getters: {
		//购物车选中商品数量
		count(state){
			let totalCount = 0
			// console.log(state.checkFoods)
			state.checkFoods.forEach(item=>{
				totalCount += item.count
			})
			return totalCount
		},
		//总价格
		totalPrice(state){
			let price = 0
			state.checkFoods.forEach(item=>{
				price += item.count * item.price
			})
			return price
		},
		getnum(state){
			return (n=>{
				let index = state.checkFoods.findIndex(item=>item.name == n)
				if (index == -1) {
					return 0
				}else {
					return state.checkFoods[index].count
				}
			})
			
		}
	}
})


export default store;