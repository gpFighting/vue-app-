<template>
	<div class="header">
		<div class="bg">
			<div class="top">
				<img :src="seller.avatar" alt="">
				<div class="msg">
					<div class="title">
						<span class="brand"></span>
						<span>{{seller.name}}</span>
					</div>
					<div class="distribution">
						{{seller.description}}/{{seller.deliveryTime}}分钟送达
					</div>
					<div class="discount">
						<span class="jian"></span>
						<span>{{decrease.description}}</span>
					</div>
				</div>
				<div class="num" @click="showDetail">5个 ></div>
			</div>
			<div class="notice" @click="showDetail">
				<span class="notice-icon"></span>
				<span>{{seller.bulletin}}</span>
			</div>
		</div>
	<transition enter-active-class="animated bounceIn" leave-active-class="animate bounceOut">
		<div class="detail" v-if="detail" @click="showDetail">
			<h1>{{seller.name}}</h1>
			<div class="rate">
			<Rate allow-half disabled v-model="valueDisabled"></Rate>				
			</div>
			<div class="info">
				<span class="line"></span>
				<span>优惠信息</span>
				<span class="line"></span>
			</div>
			<ul>
				<li v-for="item in seller.supports"><span :class="icon_class[item.type]"></span><span>{{item.description}}</span></li>
			</ul>
			<div class="good_notice">
				<span class="line"></span>
				<span>商家公告</span>
				<span class="line"></span>
			</div>
			<p>{{seller.bulletin}}</p>
		</div>
	</transition>				
	</div>

</template>

<script>
import 'iview/dist/styles/iview.css';
import 'animate.css'
	export default {
		data () {
			return {
				valueDisabled: 0,
				detail: false,
				seller: {},
				icon_class: ['icon_decrease','icon_discount','icon_guarantee','icon_invoice','icon_special'],
				decrease: ''
			}
		},
		created(){
			this.getmsg()
		},
		methods: {
			showDetail(){
				this.detail = !this.detail
			},
			getmsg(){
				this.$http.get('http://localhost:4200')
				.then(res=>{
					// console.log(res)
					if (res.status === 200) {
						this.seller = res.body.seller
						this.decrease = res.body.seller.supports[0]
						this.valueDisabled =res.body.seller.score
						this.$store.commit('minPrice',res.body.seller.minPrice)    //将起送价格存储到store中 以备后续使用
					}
				})
			}
		}

	}
</script>

<style lang="less" scoped>
.header{
	width: 100%;
	color: #fff;
	.bg {
		background: url('http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg') 0 0 no-repeat;
		background-size: 120% 120%;
		.top {
			background-color: rgba(0, 0, 0, .4);
			display: flex;
			height: 100px;
			align-items: center;
			justify-content: space-around;
			img {
				width: 64px;
				height: 64px;
			}
			.msg {
				line-height: 22px;
				.title {
					display: flex;
					align-items: center;
					.brand {
						width: 30px;
						height: 18px;
						font-size: 14px;
						margin-right: 5px;
						background: url('../img/brand@2x.png') 0 0 no-repeat;
						background-size: contain;
					}					
				}
				.distribution {
					font-size: 12px;
				}
				.discount {
					font-size: 12px;
					.jian {
						display: inline-block;
						width: 12px;
						height: 12px;
						background: url('../img/decrease_1@2x.png');
						background-size: contain;
					}
				}				
			}
			.num {
				font-size: 12px;
				position: relative;
				transform: translateY(25px);
				padding: 3px 8px;
				border-radius: 11px;
				background-color: rgba(0, 0, 0, .3);
			}		
		}
		.notice {
			color: #fff;
			font-size: 12px;
			padding: 4px 8px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
				.notice-icon {
					display: inline-block;
					width: 22px;
					height: 12px;
					background: #fff url(../img/bulletin@2x.png) 0 0 no-repeat;
					background-size: contain;
				}
				background-color: rgba(0, 0, 0, .5);
		}
	}
	.detail {
		z-index: 999;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background-color: rgba(0, 0, 0, .7);
		width: 100%;
		padding: 60px 40px;
		box-sizing: border-box;
		font-size: 13px;
		h1 {
			font-size: 16px;
			text-align: center;
		}
		.rate {
			text-align: center;
		}
		.info,.good_notice {
			font-size: 16px;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 10px 0;
		}
		ul {
			list-style: none;
			li {
				display: flex;
				align-items: center;
				padding: 0 15px;
				line-height: 30px;
				.icon_decrease,
				.icon_discount,
				.icon_guarantee,
				.icon_invoice,
				.icon_special {
					width: 16px;
					height: 16px;
					margin-right: 5px;
				}
				.icon_decrease {
					background: url('../img/decrease_2@2x.png') 0 0 no-repeat;
					background-size:contain;

				}
				.icon_discount {
					background: url('../img/discount_2@2x.png') 0 0 no-repeat;
					background-size:contain;

				}
				.icon_guarantee {
					background: url('../img/guarantee_2@2x.png');
					background-size:contain;

				}
				.icon_invoice {
					background: url('../img/invoice_2@2x.png') 0 0 no-repeat;
					background-size:contain;

				}
				.icon_special {
					background: url('../img/special_2@2x.png') 0 0 no-repeat;
					background-size:contain;

				}
			}
		}
		p {
			line-height: 30px;
			padding: 0 15px;
		}
		.line {
			height: 1px;
			flex: 1;
			background-color: #888;
		}
	}
}
</style>