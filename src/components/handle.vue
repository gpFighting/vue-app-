<template>
	<div class="handle">
		<transition name="slide">
			<div class="down" v-if="count" @tap.stop="decrease">-</div>
		</transition>
		<div class="count" v-if="count">{{count}}</div>
		<div class="up"  @tap.stop="increment">+</div>
		<transition
		@before-enter="beforeEnter_ball"
		@enter="enter_ball"
		@after-enter="afterEnter_ball">
		<span  v-if="isshow" ref="ball_out" class="ball_out">
			<div class="ball"  ref="ball"></div>
		</span>
		</transition>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				// count: 0,
				isshow: false
			}
		},
		props: ['name','price'],
		methods: {
			increment(){
				this.isshow = true
				this.$store.commit('incrementStore',{name: this.name,price: this.price})

			},
			decrease(){
				if (this.count == 0) return;
				this.$store.commit('decreaseStore',{name: this.name,price: this.price})

			},
			beforeEnter_ball(el){
				el.style.transform = 'translate(0,0)'
			},
			enter_ball(el,done){
				el.offsetHeight
				let ball_position = this.$refs.ball.getBoundingClientRect();
				let x = this.$store.state.carposition.left - ball_position.left+15
				let y = this.$store.state.carposition.top - ball_position.top +15
				//通过设置内部小球的x轴运动匀速 外部盒子y轴运动贝塞尔曲线来实现抛物线
				this.$refs.ball.style.transform = `translateX(${x}px)`
				this.$refs.ball_out.style.transform = `translateY(${y}px)`
				this.$refs.ball.style.transition = 'all 0.5s linear';
				this.$refs.ball_out.style.transition = 'all 0.5s cubic-bezier(.34,-0.21,1,.54)';
				done()
			},
			afterEnter_ball(el){
				this.isshow = false
			}
		},
		computed: {
			count(){
				return this.$store.getters.getnum(this.name)
			}
		}
	}
</script>

<style lang="less" scoped>
.handle {
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
		right: 0;
		bottom: 0;
	}
	.up {
		background-color: rgb(0,160,220);
		color: #fff;
		z-index: 3;
	}
	.down {
		border: 2px solid rgb(0,160,220);
		background-color: #fff;
		line-height: 20px;
		color: rgb(0,160,220);
		transform: translateX(-54px);
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
	.slide-enter,
	.slide-leave-to {
		transform: translateX(0)
	}
	.slide-enter-active,
	.slide-leave-active {
		transition: all 0.3s ease;
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