<template>
	<view class="user-section" >
		<image class="bg" src="/static/images/personal/bgImg2.jpg"></image>
		<view class="user-info-box" @click="toLogin">
			<view class="portrait-box">
				<image class="portrait" :src='userInfo.avatarUrl?userInfo.avatarUrl:"/static/images/personal/missing-face.png"'></image>
			</view>
			<view class="info-box">
				<text class="username">{{userInfo.nickname?userInfo.nickname:"游客"}}</text>
			</view>
		</view>

		<view class="vip-card-box">
			<image class="card-bg" src="/static/images/personal/vip-card-bg.png" mode=""></image>
			<view class="b-btn">
				立即开通
			</view>
			<view class="tit">
				<!-- 会员图标-->
				<text class="iconfont icon-huiyuan-"></text>
				与天会员
			</view>
			<text class="e-m">GreenGuy Union</text>
			<text class="e-b">开通会员听歌, 撸代码</text>
		</view>
	</view>
</template>

<script>
	// startY: 0,
	// moveY: 0,
	// distance: 0,
	export default {
		props:['userInfo'],
		data() {
			return {
			}
		},
		methods: {
			toLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
		
		}

	}
</script>

<style>
	.user-section {
		height: 520rpx;
		position: relative;
		padding: 100rpx 30rpx 0;
	}

	.user-section .bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0.7;
		filter: blur(1px);
	}


	.user-info-box {
		height: 180rpx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

	}

	.user-info-box .portrait {
		width: 130rpx;
		height: 130rpx;
		border: 5rpx solid #fff;
		border-radius: 50%;
	}

	.user-info-box .username {
		font-size: 24;
		color: #303133;
		margin-left: 20rpx;
	}


	/* vip-box */
	.vip-card-box {
		position: relative;
		display: flex;
		flex-direction: column;
		// background: linear-gradient(left, red, black);
		background: rgba(0, 0, 0, .7);
		height: 240rpx;
		color: #f7d680;
		border-radius: 16rpx 16rpx 0 0;
		padding: 20rpx 24rpx;
	}


	.vip-card-box .card-bg {
		position: absolute;
		top: 20rpx;
		right: 0;
		width: 380rpx;
		height: 260rpx;
	}

	.vip-card-box .b-btn {
		position: absolute;
		right: 20rpx;
		top: 16rpx;
		width: 132rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		font-size: 22rpx;
		color: #36343c;
		border-radius: 20px;
		background: #f9e6af;
		z-index: 1;
	}

	.vip-card-box .b-btn {
		position: absolute;
		right: 20rpx;
		top: 16rpx;
		width: 132rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		font-size: 22rpx;
		color: #36343c;
		border-radius: 20px;
		/*background: linear-gradient(left, #f9e6af, #ffd465);*/
		/*渐变不生效*/
		background: #f9e6af;
		z-index: 1;
	}

	.vip-card-box .tit {
		font-size: 22rpx;
		color: #f7d680;
		margin-bottom: 28rpx;
	}

	.vip-card-box .tit .iconfont {
		color: #f6e5a3;
		margin-right: 16rpx;
	}




	.vip-card-box .e-m {
		font-size: 34rpx;
		margin-top: 10rpx;
	}

	.vip-card-box .e-b {
		font-size: 24rpx;
		color: #d8cba9;
		margin-top: 10rpx;
	}
</style>
