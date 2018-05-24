<template>
	<div class="car_foods">
		<h5><span>购物车</span><span class="clear" @click="clear">清空</span></h5>
		<ul class="foods_list">
			<li v-for="item in $store.state.checkFoods">
				<span>{{item.name}}</span>
				<div class="right">
					<span class="text">￥{{item.price*item.count}}</span>
					<shopcarHandle :precount="item.count" :name="item.name"></shopcarHandle>
				</div>
			</li>
		</ul>
	</div>		
</template>

<script>
	import shopcarHandle from './shopcar-handle.vue'
	export default {
		data () {
			return {

			}
		},
		methods: {
			clear(){
				this.$store.commit('clearAll')
				this.$store.commit('control')
			}
		},
		
		components: {
			shopcarHandle
		}
	}
</script>

<style lang="less" scoped>
.car_foods {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 50px;
		z-index: 2;
		font-size: 14px;
		color: #333;
		text-shadow: 0 0 1px #888;
		h5 {
			 padding: 0 20px;
			 display: flex;
			 justify-content: space-between;
			 height: 40px;
			 border-bottom: 1px solid #ccc;
			 line-height: 40px;
			 background-color: #f3f5f7;
			.clear {
				color: #00a0dc;
			}
		}
		.foods_list {
			padding: 0 20px;
			background-color: #fff;
			li {
				height: 48px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #ccc;
				&:last-child {
					border-bottom: none;
				}
				.right {
					display: flex;
					justify-content: space-between;
					.text {
						color: red;
						margin-right: 10px;
					}
				}
			}
		}
	}
</style>