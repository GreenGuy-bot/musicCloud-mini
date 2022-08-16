<template>
	<view class="header">
		<text class="title">{{title}}</text>
		<view class="">
			<text>{{recText}}</text>
			<text class="more">查看更多</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				value:'title默认值'
			},
			recText:{
				type:String,
				value:'recText默认值'
			},
		}
	}
</script>

<style lang="scss">
	.header {
		padding-bottom: 10rpx;
		.more {
			float: right;
			border: 1rpx solid #333;
			padding: 10rpx 20rpx;
			border-radius: 30rpx;
			font-size: 24rpx;
		}
		
		.title {
			font-size: 32rpx;
			line-height: 80rpx;
			color: #666;
		}
	}
</style>