<template>
	<view class="recommendSongContainer">
		<!-- 头部 -->
		<view class="header">
			<image src="../../static/images/recommendSong/recommendSong.jpg"></image>
			<view class="date">
				<text class="momth">{{mouth + '/'}}</text>
				<text class="day">{{day}}</text>
			</view>
		</view>

		<!-- 歌单列表区域 -->
		<view class="listContainer">
			<view class="listHeader">
				<text>播放全部</text>
				<text class="changeMore">多选</text>
			</view>
			<!-- 内容区域 -->
			<scroll-view scroll-y class="listScroll" enable-flex>
				<view class="listItem" v-for="item in 17">
					<image src="../../static/images/recommendSong/02.jpg"></image>
					<view class="musicIfon">
						<text class="musicName">搁浅</text>
						<text class="author">周杰伦</text>
					</view>
					<text class="iconfont icon-gengduo"></text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			// 判断用户是否登录
			let userInfo = uni.getStorageInfoSync('userInfo')
			if(!userInfo) {
				uni.showToast({
					title:'用户没有登录',
					icon:"error",
					success: () => {
						//跳转至登录页面
						uni.reLaunch({
							url:'/pages/login/login'
						})
					}
				})
			}
			let date = new Date()
			this.mouth = date.getMonth() + 1
			this.day = date.getDate()
		},
		data() {
			return {
				mouth: '',
				day: ''
			}
		},
	}
</script>

<style lang="scss">
	.recommendSongContainer {
		.header {
			width: 100%;
			height: 300rpx;
			position: relative;

			image {
				height: 100%;
				width: 100%;
			}

			.date {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				padding: 35rpx 0 0 35rpx;
				width: 300rpx;
				height: 100rpx;
				color: #fff;
				text-align: center;
				line-height: 100rpx;
				font-size: 38rpx;
			}
		}

		.listContainer {
			position: relative;
			top: -20rpx;
			padding: 0 20rpx;
			border-radius: 30rpx;
			background-color: #f5f5f5;

			.listHeader {
				height: 80rpx;
				line-height: 80rpx;

				.changeMore {
					float: right;
				}
			}
			
			.listScroll {
				height: calc(100% - 380rpx);
				.listItem {
					position: relative;
					width: 100%;
					display: flex;
					margin-top: 25rpx;
					image {
						height: 80rpx;
						width: 80rpx;
						border-radius: 8rpx;
					}
					.musicIfon {
						display: flex;
						flex-direction: column;
						margin-left: 20rpx;
						
						text {
							height: 40rpx;
							line-height: 40rpx;
							font-size: 24rpx;
							max-height: 400rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
					.iconfont {
						position: absolute;
						right: 0;
						width: 80rpx;
						height: 80rpx;
						line-height: 80rpx;
						text-align: right;
					}
				}
			}
		}
	}
	
</style>
