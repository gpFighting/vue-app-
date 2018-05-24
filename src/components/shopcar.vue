<template>
	<div >
		<div class="shopcar" @click="slide">
			<div class="icon_shopcar">
				<div class="innerCircle" :class="{hasfoods: checkedCount}" ref="innerCircle">
					<Icon type="android-cart"></Icon>
				</div>
				<Badge :count="checkedCount"></Badge>
			</div>
			<div class="totalPrice">￥{{price}}</div>
			<div class="tip">另需配送费￥4元</div>
			<div class="balance" v-if="!checkedCount">￥{{$store.state.mprice}}元起送</div>
			<div class="balance" v-else-if="lackPrice>0">还差￥{{lackPrice}}元起送</div>
			<div class="tobalance" v-else="lackPrice<=0" @click.stop="balance">去结算</div>
		</div>
		<div class="cover" v-if="checkedCount && $store.state.flag"></div>
		<transition name="slide">
			<Upshopcar v-if="checkedCount && $store.state.flag"></Upshopcar>
		</transition>
	</div>
</template>

<script>
	import Upshopcar from './upshopcar.vue'
	export default {
		data () {
			return {
			}
		},
		mounted(){
			this.getCarPosition()
		},
		methods: {
			//获取购物小车的位置  并存储进store中
			getCarPosition(){
				let carposition = this.$refs.innerCircle.getBoundingClientRect()
				this.$store.commit('setCarPosition',carposition)
			},
			//控制购物车详细列表的显示
			slide(){
				if (this.checkedCount) {
					this.$store.commit('control')
				}
			},
			balance(){
				alert('您好，您一共消费：'+ this.price + '元')
			}
		},
		computed: {
			//选中食品的总数量
			checkedCount(){
				return this.$store.getters.count 
			},
			//选中食品的总价格
			price(){
				return this.$store.getters.totalPrice
			},
			//还差多少起送
			lackPrice(){
				return this.$store.state.mprice - this.price
			}
		},
		components: {
			Upshopcar
		}
	}
</script>

<style lang="less" scoped>
	.shopcar {
		background-color: #141d27;
		height: 50px;
		display: flex;
		font-size: 13px;
		color: rgba(255,255,255,.4);
		align-items: center;
		position: relative;
		z-index: 5;
		.icon_shopcar {
			width: 60px;
			height: 60px;
			margin:0 18px;
			background-color: #141d27;
			border-radius: 50%;
			transform: translateY(-5px);
			position: relative;
			z-index: 888;
			.innerCircle,
			.hasfoods {
				width: 46px;
				height: 46px;
				border-radius: 50%;
				margin: 7px auto;
				background-color: rgba(255,255,255,.2);
				text-align: center;
				line-height: 46px;
				font-size: 26px;
			}
			.hasfoods {
				background-color: #00a0dc;
				color: #fff;
			}
			.ivu-badge {
				position: absolute;
				top: 0;
				right: 0;
			}

		}
		.totalPrice {
			padding-right: 18px;
			margin-right: 10px;
			border-right: 1px solid #333;
		}
		.tip {
			flex: 1;
		}
		.balance,
		.tobalance {
			width: 100px;
			height: 100%;
			line-height: 50px;
			text-align: center;
			background-color: rgba(255,255,255,.2);
		}
		.tobalance {
			background-color: #00b43c;
			color: #fff;
		}
	}
	.cover {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .4);
	}
	.slide-enter,
	.slide-leave-to {
		transform: translateY(100%);
	}
	.slide-enter-active,
	.slide-leave-active {
		transition: all .5s ease;
	}
</style>

<style type="text/css">
	/*样式无法覆盖时可以去掉scroped 或 在写个style 标签*/
	.ivu-badge-count {
		box-shadow: none;
		background-color: red;
	}
</style>