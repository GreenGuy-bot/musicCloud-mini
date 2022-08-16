<template>
	<view>
		<!-- 导航图标区域 -->
		<view class="navContainer">
			<view class="navItem" v-for="(item,index) in list">
				<text :class="item[0]"></text>
				<text>{{item[1]}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				list: [
					["iconfont icon-meirituijian", "每日推荐"],
					["iconfont icon-gedan1", "歌单"],
					["iconfont icon-icon-ranking", "排行榜"],
					["iconfont icon-diantai", "电台"],
					["iconfont icon-zhiboguankanliangbofangsheyingshexiangjixianxing", "直播"]
				]
			}
		}
	}
</script>

<style lang="scss">
	.navContainer {
		display: flex;
		width: 100%;
		.navItem {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
	
			text {
				font-size: 26rpx;
			}
	
			.iconfont {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				text-align: center;
				line-height: 100rpx;
				background-color: rgb(240, 19, 19);
				font-size: 50rpx;
				color: #fff;
				margin: 20rpx 0;
			}
		}
	}
</style>