<template>
	<div class="tab">
		<router-link class="tab_item" to="/goods" tag="span">商品</router-link>
		<router-link class="tab_item" to="/comment" tag="span">评论</router-link>
		<router-link class="tab_item" to="/seller" tag="span">商家</router-link>
	</div>
</template>

<script>
	export default {
		data () {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.tab {
		width: 100%;
		display: flex;
		font-size: 14px;
		color: #666;
		background: #fff;
		border-bottom: 1px solid #eee;
		.tab_item {
			width: 33.3333%;
			flex: 1;
			text-align: center;
			padding: 10px 0;
		}
		.router-link-active {
			color: red;
		}
	}
</style>