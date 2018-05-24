<template>
	<div class="shopcarhandle">		
		<div class="down" @click="decrease">-</div>
		<div class="count" >{{count}}</div>
		<div class="up"  @click="increment">+</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
			}
		},
		props: ['precount','name'],
		methods: {
			increment(){
				// console.log(11)
				// this.count += 1
				this.$store.commit('incrementStore',{name:this.name})

			},
			decrease(){
				// console.log(1111)

				this.$store.commit('decreaseStore',{name:this.name})
				if (!this.$store.state.checkFoods.length) {
					this.$store.commit('control')
				}

			}
		},
		computed: {
			count: {
				get(){
					return this.precount
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.shopcarhandle {
	position: relative;
	font-size: 25px;
	width: 80px;
	.down,
	.up {
		width: 24px;
		height: 24px;
		box-sizing: border-box;
		text-align: center;
		line-height: 24px;
		border-radius: 50%;
		position: absolute;
		bottom: 0;
	}
	.up {
		background-color: rgb(0,160,220);
		color: #fff;
		right: 0;
	}
	.down {
		border: 2px solid rgb(0,160,220);
		line-height: 16px;
		background-color: #fff;
		color: rgb(0,160,220);
		left: 0;
		z-index: 2;
	}
	.count {
		font-size: 14px;
		line-height: 22px;
		position: absolute;
		bottom: 0;
		width: 100%;
		text-align: center;
	}
	.ball_out {
		position: absolute;
		right: 4px;
		bottom: 4px;
		z-index: 5;
	}
	.ball {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		// background-color: rgb(0,160,220);
		background-color: red;
		
	}
}
</style>