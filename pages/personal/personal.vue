<template>
	<view class="personalContainer">
		<user-section :userInfo="userInfo"></user-section>
		<view class="cover-container" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
			@touchend="handleTouchEnd" :style="{transform:coverTransform,transition:coverTransition}">
			<image class="arc" src="/static/images/personal/arc.png"></image>
			<!-- 个人中心导航 -->
			<view class="nav-section">
				<view class="nav-item" hover-class="common-hover" hover-stay-time="50">
					<text class="iconfont icon-xiaoxi"></text>
					<text>我的消息</text>
				</view>
				<view class="nav-item" hover-class="common-hover" hover-stay-time="50">
					<text class="iconfont icon-myRecommender"></text>
					<text>我的好友</text>
				</view>
				<view class="nav-item" hover-class="common-hover" hover-stay-time="50">
					<text class="iconfont icon-gerenzhuye"></text>
					<text>个人主页</text>
				</view>
				<view class="nav-item" hover-class="common-hover" hover-stay-time="50">
					<text class="iconfont icon-gexingzhuangban"></text>
					<text>个性装扮</text>
				</view>
			</view>

			<!-- 个人中心列表 -->
			<view class="personalContent">
				<view class="recentPlayContainer">
					<text class="title">最近播放</text>
					<!-- 最近播放记录 -->
					<scroll-view scroll-x class="recentScroll" enable-flex v-if="recentPlayList.length">
						<view class="recentItem" v-for="(item,index) in recentPlayList" :key="index">
							<image :src="item.song.al.picUrl"></image>
						</view>
					</scroll-view>
					<view v-else>暂无播放记录</view>
				</view>

				<view class="cardList">
					<view class="card-item">
						<text class="title">我的音乐</text>
						<text class="more"> > </text>
					</view>
					<view class="card-item">
						<text class="title">我的收藏</text>
						<text class="more"> > </text>
					</view>
					<view class="card-item">
						<text class="title">我的电台</text>
						<text class="more"> > </text>
					</view>
				</view>
			</view>
		</view>

	</view>


</template>

<script>
	import userSection from "./personalChild/userSection.vue"
	import request from "../../utils/request.js"
	export default {
		components: {
			userSection,
		},
		data() {
			return {
				startY: 0,
				moveY: 0,
				coverTransform:'translateY(0)',
				coverTransition:'',
				userInfo:{},
				recentPlayList:[],//用户播放记录
			}
		},
		onLoad() {
			let userInfo = uni.getStorageSync('userInfo')
			if(userInfo){
				this.userInfo =JSON.parse(userInfo) 
			}
			this.getUserRecentPlayList(this.userInfo.userId)
			// console.log(this.userInfo.userId);
		},
		methods: {
			handleTouchStart(event) {
				this.coverTransition = ''
				this.startY = event.touches[0].clientY
			},
			handleTouchMove(event) {
				this.moveY = event.touches[0].clientY
				let distance = this.moveY - this.startY
				if(0<distance && distance<80){
					this.coverTransform = `translateY(${distance}rpx)`
				}
			},
			handleTouchEnd() {
				this.coverTransform = `translateY(0)`
				this.coverTransition = 'transform 1s linear'
			},
			async getUserRecentPlayList(userId){
				let RecentPlayListData = await request('/user/record',{uid:userId,type:0})
				// console.log(RecentPlayListData);
				this.recentPlayList = RecentPlayListData.allData.slice(0,10)
			},
		}
	}
</script>

<style lang="scss">
	.personalContainer {
		width: 100%;
		height: 100%;
		
	}



	.cover-container {
		margin-top: -150rpx;
		padding: 0 30rpx;
		position: relative;
		background: #f5f5f5;
		padding-bottom: 20rpx;
	}

	.cover-container .arc {
		position: absolute;
		left: 0;
		top: -34rpx;
		width: 100%;
		height: 36rpx;
	}


	/* 导航部分 */
	.cover-container .nav-section {
		display: flex;
		background: #fff;
		padding: 20rpx 0;
		border-radius: 15rpx;
	}


	.nav-section .nav-item {
		width: 25%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.nav-section .nav-item .iconfont {
		font-size: 50rpx;
		color: #d43c33;
		line-height: 70rpx;
	}

	.nav-section .nav-item text:last-child {
		font-size: 22rpx;

	}


	/* 个人中心列表 */
	.personalContent {
		background: #fff;
		margin-top: 20rpx;
	}

	/* 最近播放 */
	.personalContent .scrollView {
		display: flex;
		height: 160rpx;
	}

	.personalContent .recentPlay {
		display: flex;
	}

	.recentPlayContainer .title {
		padding-left: 20rpx;
		font-size: 26rpx;
		color: #333;
		line-height: 80rpx;
	}

	.personalContent .recentPlay image {
		width: 160rpx;
		height: 160rpx;
		margin-left: 20rpx;
		border-radius: 20rpx;
	}


	.cardList {
		margin-top: 20rpx;

	}

	.cardList .card-item {
		border-top: 1rpx solid #eee;
		height: 80rpx;
		line-height: 80rpx;
		padding: 10rpx;
		font-size: 26rpx;
		color: #333;
	}

	.cardList .card-item .more {
		float: right;
	}
	
	/* 最近播放记录 */
	.recentScroll {
		display: flex;
		height: 200rpx;
		.recentItem {
			margin-right: 20rpx;
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
