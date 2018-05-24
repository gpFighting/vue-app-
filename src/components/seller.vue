<template>
	<div class="seller">
		<div>
			<div class="seller_info">
				<div class="info_title">
					<div>
						<h5>{{seller.name}}</h5>
						<Rate allow-half disabled  v-model="seller.score">
						</Rate>				
						<span>月售{{seller.sellCount}}</span>
					</div>
					<div class="collection" @tap="collection">
						<div v-if="isCollection">
							<Icon type="heart" color="red"></Icon>
							<div>已收藏</div>
						</div>
						<div v-else>
							<Icon type="heart" color="gray"></Icon>
							<div>收藏</div>
						</div>
						
					</div>
				</div>			
				<div class="index">
					<div>
						<p>起送价</p>
						<p>{{seller.minPrice}}元</p>
					</div>
					<div>
						<p>商家配送</p>
						<p>{{seller.deliveryPrice}}元</p>
					</div>
					<div>
						<p>平均配送时间</p>
						<p>{{seller.deliveryTime}}分钟</p>
					</div>
				</div>
			</div>
			<div class="activity">
				<h5>公告与活动</h5>
				<p>粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</p>
				<ul>
					<li v-for="item in seller.supports">
						<span>{{item.description}}</span>
					</li>
				</ul>
			</div>
			<div class="picture">
				<h5>商家实景</h5>
				<div class="slide" @tap="aga">
					<ul>
						<li v-for="(item,index) in seller.pics"  @tap.stop="$preview.open(index,list)">
							<img :src="item" class="preview-img">
						</li>
					</ul>
				</div>
			</div>
			<div class="info">
				<h5>商家信息</h5>
				<ul>
					<li v-for="item in seller.infos">{{item}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		data () {
			return {
				isCollection: false,
				seller: {},
				list: [],
				width: 0
			}
		},
		created(){
			this.getinfo()
			this.width = window.outerWidth
		},
		mounted(){
			const scroll = new BScroll('.seller',{tap:true})
			const scroll1 = new BScroll('.slide',{
				scrollX: true,
				scrollY: false
				// tap:true         此处如果再次设置tap事件 就会出错  因为.seller滚动实例已经设置了tap为true 在该页面点击的时候就会派发tap事件   假如此处再次设置一次 那点击.slide区域时会派发两次tap事件，导致某些问题出现
			})
		},
		methods: {
			//请求数据
			getinfo(){
				this.$http.get('http://localhost:4200')
				.then(res=>{
					if (res.status === 200) {
						this.seller = res.body.seller
						res.body.seller.pics.forEach(item=>{
							this.list.push({
								src: item,
								w:this.width,
								h:this.width
							})
						})
					}
				})
			},
			collection(){
				// console.log(11)
				this.isCollection = !this.isCollection
			},
			aga(){
				console.log(11)
			}
		}
	}
</script>

<style lang="less" scoped>
.seller {
	flex: 1;
	background-color: #f3f5f7;
	font-size: 14px;
	overflow: hidden;
	h5 {
		font-size: 14px;
		color: #07111b;
		margin-bottom: 8px;
	}
	.seller_info {
		padding: 20px;
		margin-bottom: 20px;
		background-color: #fff;
		.info_title {
			display: flex;
			justify-content: space-between;
			padding-bottom: 20px;
			border-bottom: 1px solid #eee;
		}
		.collection {
			text-align: center;
			width: 42px;
			.ivu-icon {
				font-size: 30px;
			}
		}
		.index {
			display: flex;
			justify-content: space-between;
			padding-top: 20px;
			div {
				text-align: center;
				width: 33.3333%;
				&:nth-of-type(2) {
					border-left: 1px solid #ccc;
					border-right: 1px solid #ccc;
				}
			}
		}
	}
	.activity {
		background-color: #fff;
		padding: 20px 20px 0;
		margin-bottom: 20px;
		ul {
			li {
				list-style: none;
				line-height: 40px;
				border-bottom: 1px solid #eee;
			}
		}
	}
	.picture {
		padding: 20px;
		background-color: #fff;
		margin-bottom: 20px;
		.slide {
			width: 100%;
			overflow: hidden;
			position: relative;
			z-index: 888;
			ul {
				list-style: none;
				display: inline-block;
				white-space: nowrap;
				li {
					display: inline-block;
					margin-right: 10px;
					img {
						width: 120px;
						height: 120px;
					}
				}
			}
		}
	}
	.info {
		background-color: #fff;
		padding: 20px 20px 0;
		li {
			list-style: none;
			line-height: 40px;
			border-bottom: 1px solid #eee;
			&:last-of-type {
				border-bottom: none;
			}
		}
	}
}
</style>