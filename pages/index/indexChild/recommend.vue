<template>
	<!-- 推荐区域 -->
	<view class="recommendContainer">
		<nav-bar title="推荐歌曲" recText="为你精心推荐"></nav-bar>
		<!-- 内容区域 -->
		<scroll-view class="recommendScroll" enable-flex scroll-x>
			<view class="scrollItem" v-for="item in recommendList" :key="item.id">
				<image :src="item.picUrl"></image>
				<text>{{item.name}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import navBar from "@/components/navBar/navBar.vue"
	export default {
		props: ['recommendList'],
		components:{
			navBar,
		}
	}
</script>

<style lang="scss">
	.recommendContainer {
		padding: 20rpx;
	}

	.recommendScroll {
		display: flex;
		height: 270rpx;
		margin-top: 25rpx;
		.scrollItem {
			width: 200rpx;
			margin-right: 20rpx;

			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}

			text {
				font-size: 26rpx;
				// // 单行文本溢出隐藏
				// display: block;
				// white-space: nowrap;
				// overflow: hidden;
				// text-overflow: ellipsis;
				//多行文本溢出隐藏
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
		}
	}
</style>
