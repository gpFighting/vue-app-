<template>
		<div class="foodDetail">
			<div class="foodContent">
				<div class="top">
					<Icon type="reply" color="white" @click="hidden"></Icon>
					<img :src="detail.image" alt="">
					<div class="top_msg">
						<h5>{{detail.name}}</h5>
						<p>月售{{detail.sellCount}} / 好评率{{detail.rating}}%</p>
						<p>￥{{detail.price}}</p>
						<Handle :name="detail.name" :price="detail.price"></Handle>
					</div>
				</div>
				<div class="desc">
					<h5>商品信息</h5>
					<p>{{detail.info}}</p>
				</div>
				<div class="comment">
					<div class="comment_title">
						<h5>商品评价</h5>
						<div @click="choose($event)">
							<Button type="info">全部{{totalComment}}</Button>
						    <Button type="success">推荐{{Recommend}}</Button>
						    <Button type="warning">吐槽{{Disappointment}}</Button>
						</div>
					</div>
					<div class="comment_chose" @click="onlyContent">
						<Icon type="checkmark-circled" v-if="isChoose"></Icon>
						<Icon type="checkmark-circled" color="#00a0dc" v-else></Icon>
						<span>只看有内容的评价</span>
					</div>
					<ul class="comment_list">
						<li v-for="item in showComment">
							<p class="tip">
								<span>{{item.rateTime | dateFormat}}</span>
								<span>{{item.username}}</span>
							</p>
							<p v-if="item.rateType">
								<Icon type="thumbsdown"></Icon> {{item.text}}
							</p>
							<p v-else>
								<Icon type="thumbsup" color="#00a0dc"></Icon> {{item.text}}
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		
</template>

<script>
	import Handle from './handle.vue'
	import BScroll from 'better-scroll'
	export default {
		data () {
			return {
				isChoose: true,           //是否只展示有评论内容的
				type: '全部'              //全部 推荐  吐槽
			}
		},
		props: ['detail'],
		mounted(){
			const scroll = new BScroll('.foodDetail',{tap: true,click:true})
		},
		methods: {
			//控制该组件的显示隐藏
			hidden(){
				this.$emit('hidd')
			},
			choose(e){
				this.type = e.target.innerText.substr(0,2)
			},
			onlyContent(){
				this.isChoose = !this.isChoose
			}
		},
		computed: {
			//全部评论数
			totalComment(){
				return this.detail.ratings.length
			},
			//推荐数
			Recommend(){
				return this.detail.ratings.filter(item=>item.rateType==0).length
			},
			//吐槽数
			Disappointment(){
				return this.detail.ratings.filter(item=>item.rateType==1).length
			},
			//点击不同按钮显示对应的评论内容
			showComment(){
				const rating = this.detail.ratings
				if (this.type == '推荐') {
					let list = rating.filter(item=>item.rateType==0)
					if (this.isChoose) {
						return list
					}else {
						return list.filter(item=>item.text.length>0)
					}
				} else if (this.type=='吐槽') {
					let list = rating.filter(item=>item.rateType==1)
					if (this.isChoose) {
						return list
					}else {
						return list.filter(item=>item.text.length>0)
					}
				}else {
					if (this.isChoose) {
						return rating
					}else {
						return rating.filter(item=>item.text.length>0)
					}
				}
			}
		},
		components: {
			Handle
		}
	}
</script>

<style lang="less" scoped>
.foodDetail {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #f3f5f7;
	font-size: 13px;
	overflow: hidden;
	.foodContent {
		padding-bottom: 50px;
		.top {
			margin-bottom: 20px;
			.ivu-icon {
				position: absolute;
				top: 10px;
				left: 20px;
				font-size: 30px;
			}
			img {
				width: 100%;
				height: 375px;
				display: block;
			}
			.top_msg {
				padding: 20px;
				background-color: #fff;
				position: relative;
				h5 {
					font-size: 15px;
					color: #000;
					line-height: 30px;
				}
				.handle {
					position: absolute;
					right: 20px;
					bottom: 20px;
				}
			}
		}
		.desc {
			padding: 20px;
			margin-bottom: 20px;
			background-color: #fff;
			line-height: 24px;

		}
		.comment {
			padding: 20px;
			background-color: #fff;
			.comment_title {
				padding-bottom: 20px;
				border-bottom: 1px solid #ccc;
				h5 {
					margin-bottom: 20px;
				}
			}
			.comment_chose {
				padding: 10px 0;
				border-bottom: 1px solid #ccc;
				.ivu-icon {
					font-size: 26px;
					vertical-align: middle;
				}
			}
			.comment_list {
				li {
					list-style: none;
					padding: 10px 0;
					border-bottom: 1px solid #ccc;
					&:last-child {
						border-bottom: none;
					}
					.tip {
						display: flex;
						justify-content: space-between;
					}
				}
			}
		}

	}

}
</style>