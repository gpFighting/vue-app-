<template>
	<div class="goods">
		<div class="types">
			<ul >
				<li  v-for="(item,i) in goods" :class="{active: current == i}" :key="item.name" @tap="change(i)">
					<div><span :class="icon_class[item.type]" ></span>{{item.name}}</div>					
				</li>
			</ul>
		</div>
		<div class="foods">
			<div>
				<div v-for="(item,i) in goods" :id="'food'+i" class="food" :key="i" ref="food">
					<h5>{{item.name}}</h5>
					<ul>
						<li v-for="list in item.foods">
							<div class="licontent" @tap="showFood(list)">
								<img :src="list.image" alt="">
								<div>
									<p class="name">{{list.name}}</p>
									<p>{{list.description}}</p>
									<p>月售{{list.sellCount}} / 好评{{list.rating}}</p>
									<p class="price">￥{{list.price}}</p>
								</div>
							</div>
							<Handle :name="list.name" :price="list.price"></Handle>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<transition name="food">
			<food v-if="flag" @hidd="showFood" :detail="food"></food>
		</transition>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import Handle from './handle.vue'
import food from './food.vue'
	export default {
		data () {
			return {
				icon_class: ['icon_decrease','icon_discount','icon_guarantee','icon_invoice','icon_special'],           //小图标的类名
				goods: [],
				current: 0,             //当前选中 展示的是哪个食品类别
				foodHeightlist: [],           
				flag: false,             //点击菜品展示详情页面
				food: {}
			}
		},
		mounted(){
			this.initScroll()
		},
		created(){
			this.getinfo()
		},
		methods: {
			getinfo(){
				this.$http.get('http://localhost:4200')
				.then(res=>{
					if (res.status === 200) {
						this.goods = res.body.goods
					}
				})
			},
			//初始化better-scroll 并获取foodHeightList  监听滚动事件
			initScroll(){
				// 此处设置延迟获取是因为确保可以获取到DOM元素了
				setTimeout(()=>{
					this.getFoodHeightList()
				},20)
				//初始化
				this.scroll = new BScroll('.types',{tap: true})
				this.scroll1 = new BScroll('.foods',{tap:true,probeType:2})
				this.scroll1.on('scroll',(pos)=>{
					let y = Math.abs(pos.y)
					for (let i = 0;i<this.foodHeightlist.length; i++) {
						let height = this.foodHeightlist[i]
						let height2 = this.foodHeightlist[i+1]
						if (y>=height && y < height2) {
							// console.log(this.current)
							return this.current = i
						}
					}
					return this.current = 0
				})
			},
			change(i){
				this.current = i
				let el = document.getElementById(`food${i}`)
				this.scroll1.scrollToElement(el,500)                         //点击食品类别滚动到相应食品部分
			},
			getFoodHeightList(){
				let heights = [0]
				let heightitem = 0
				let foods = document.getElementsByClassName('food')
				for(var i = 0; i < foods.length; i++){
					heightitem += foods[i].offsetHeight
					heights.push(heightitem)
				}
				// console.log(heights)
				this.foodHeightlist = heights
			},
			showFood(item){
				// console.log(111)
				this.flag = !this.flag
				this.food = item
			}
		},
		computed: {
			
		},
		components: {
			Handle,
			food
		}
	}
</script>

<style lang="less" scoped>
.goods {
	display: flex;
	flex: 1;
	overflow: hidden;
	.types {
		width: 80px;
		height: 100%;
		box-sizing: border-box;
		background-color: #f3f5f7;
		overflow: hidden;
		li {
			padding: 0 12px;
			list-style: none;
			display: flex;
			align-items: center;
			height: 56px;
			font-size: 12px;
			border-bottom: 1px solid #ccc;
			.icon_decrease,
			.icon_discount,
			.icon_guarantee,
			.icon_invoice,
			.icon_special {
				float: left;
				width: 16px;
				height: 16px;
			}
			.icon_decrease {
				background: url('../img/decrease_4@2x.png') 0 0 no-repeat;
				background-size:contain;

			}
			.icon_discount {
				background: url('../img/discount_4@2x.png') 0 0 no-repeat;
				background-size:contain;

			}
			.icon_guarantee {
				background: url('../img/guarantee_4@2x.png');
				background-size:contain;

			}
			.icon_invoice {
				background: url('../img/invoice_4@2x.png') 0 0 no-repeat;
				background-size:contain;

			}
			.icon_special {
				background: url('../img/special_4@2x.png') 0 0 no-repeat;
				background-size:contain;

			}
		}
		.active {
			background-color: #fff;
		}
	}
	.foods {
		flex: 1;
		height: 100%;
		h5 {
			padding-left: 20px;
			margin: 0;
			font-size: 13px;
			color: #888;
			line-height: 30px;
			border-left: 2px solid #ccc;
			background-color: #f3f5f7;
		}
		ul {
			background-color: #fff;
			li {
				display: flex;
				justify-content: space-between;
				margin: 20px;
				padding-bottom: 5px; 
				font-size: 13px;
				color: #aaa;
				border-bottom: 1px solid #ccc;
				.licontent {
					display: flex;

				}
				&:last-child {
					border-bottom: none;
					margin-bottom: 0;	
				}
				img {
					width: 57px;
					height: 57px;
					margin-right: 10px;
				}
				.name {
					font-size: 15px;
					color: #333;
				}
				.price {
					color: red;
				}
			}
		}
	}
	.food-enter,
	.food-leave-to {
		transform: translateX(100%)
	}
	.food-enter-active,
	.food-leave-active {
		transition: all 0.5s ease;
	}
}
</style>