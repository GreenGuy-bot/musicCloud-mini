<template>
	<view class="videoContainer">
		<view class="header">
			<image src="/static/images/video/video.jpg"></image>
			<view class="search">
				搜索
			</view>
			<image src="/static/images/logo.png"></image>
		</view>
		<!-- 滚动条区域 -->
		<scroll-view scroll-x enable-flex class="navScroll">
			<tabcontrol ref="tabControl" :title="videoGroupList" @tabClick="onTabClick"></tabcontrol>
		</scroll-view>

		<!-- 视频列表区域 -->
		<scroll-view scroll-y class="VideoScroll" enable-flex refresher-enabled	
		 :refresher-triggered="isTrigger" @refresherrefresh="handleRefresh" @scrolltolower="handleToLower">
			<view class="videoItem" v-for="(item,index) in videoList" :key="index">
				<video :src="item.url" controls @play="handlePlay" :id="item.data.vid" :poster="item.data.coverUrl"
					v-if="videoId === item.data.vid" objectFit="fill" autoplay="true" @timeupdate="handleTime"
					@ended="handleEnded" ></video>
				<image v-else :src="item.data.coverUrl" :id="item.data.vid" @click="handlePlay" class="coverImg">
				</image>
				<view class="content">{{item.data.title}}</view>
				<view class="footer">
					<image class="avatar" :src="item.data.creator.avatarUrl"></image>
					<text class="nickName">{{item.data.creator.nickname}}</text>
					<view class="comments_praised">
						<text class="item">
							<text class="iconfont icon-buoumaotubiao15"></text>
							<text class="count">{{item.data.praisedCount}}</text>
						</text>
						<text class="item">
							<text class="iconfont icon-pinglun1"></text>
							<text class="count">{{item.data.commentCount}}</text>
						</text>
						<button open-type="share" class="item btn">
							<text class="iconfont icon-gengduo"></text>
						</button>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import tabcontrol from "../../components/tabcontrol/TabControl.vue"
	import request from "@/utils/request.js"
	export default {
		components: {
			tabcontrol,
		},
		onLoad() {
			this.getVideoGroupData()
		},
		// onShareAppMessage({from}){
		// 	if(from === 'button'){
		// 		return {
		// 			title:'来自Button的转发',
		// 			page:'/pages/video/video',
		// 			ImageUrl:''
		// 		}
		// 	}
		// },
		data() {
			return {
				videoGroupList: [],
				navId: '',
				videoList: [], //视频列表数据
				videoId: '',
				videoUpdateTime: [],
				isTrigger:false,//下拉刷新是否被触发
				offsetNum:1
			}
		},
		methods: {
			onTabClick(index) {
				this.$refs.tabControl.currentIndex = index
				this.navId = this.videoGroupList[index].id
				uni.showLoading({
					title: '正在加载'
				})
				this.videoList = []
				this.getVideoList(this.navId)
			},
			//获取视频列表数据
			async getVideoGroupData() {
				let videoGroupData = await request('/video/group/list')
				this.videoGroupList = videoGroupData.data.slice(0, 14)
				this.navId = this.videoGroupList[0].id
				// console.log(this.videoGroupList);
				this.getVideoList(this.navId)
			},
			//获取视频数据
			async getVideoList(navId) {
				if (!navId) { //如果navId为空则返回
					return
				}
				let videoListData = await request('/video/group', {
					id: navId,
					offset:this.offsetNum
				})
				// console.log(videoListData);
				let viedoList = videoListData.datas
				let VideoUrl = videoListData.datas.map(item => {
					return item.data.vid
				})
				//通过获取的视频vid来获取视频的详情url
				let VideoArr = []
				for (let item of VideoUrl) {
					let vid = await request('/video/url', {
						id: item
					})
					VideoArr.push(vid.urls[0].url)
				}
				
				//合并视频链接数组和视频详情信息数组
				for (let i = 0; i < VideoArr.length; i++) {
					Object.assign(viedoList[i], {
						url: VideoArr[i]
					})
				}
				this.isTrigger = false
				uni.hideLoading()
				this.videoList.push(...viedoList)
				
			},
			handlePlay(event) {
				let vid = event.currentTarget.id
				//确认之前点击的视频与现在点击的不是同一个
				// this.vid !== vid && this.videoContext && this.videoContext.stop() //关闭上一个播放的视频
				// this.vid = vid
				this.videoId = vid
				this.videoContext = uni.createVideoContext(vid)
				//判断之前的视频是否播放过，修改视频时间跳转位置
				let videoItem = this.videoUpdateTime.find(item => item.vid === vid)
				if (videoItem) {
					this.videoContext.seek(videoItem.currentTime)
				}

			},
			handleTime(event) {
				let VideoTimeObj = {
					vid: event.currentTarget.id,
					currentTime: event.detail.currentTime
				}
				// 判断数组中是否有当前视频的播放记录，如果有在原有的播放记录中修改为当前的播放时间，如果没有则添加视频对象
				let videoItem = this.videoUpdateTime.find(item => item.vid === VideoTimeObj.vid)
				if (videoItem) { //找到了说明要改时间
					videoItem.currentTime = VideoTimeObj.currentTime
				} else {
					this.videoUpdateTime.push(VideoTimeObj)
				}
				// this.videoUpdateTime = videoUpdateTime
			},
			handleEnded(event) {
				//视频播放结束，移除数组中当前播放对象
				this.videoUpdateTime.splice(this.videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id), 1)
			},
			handleRefresh(){  //下拉加载刷新
				this.isTrigger = true
				this.getVideoList(this.navId)
			},
			handleToLower(){ //上拉触底
				//后端分页：请求参数改变，请求页数的不同来分页 | 前端分页 前端一次性拿到一定量的数据，分量显示
				this.offsetNum++
				this.getVideoList(this.navId)
			}
		}
	}
</script>

<style lang="scss">
	.videoContainer {

		.header {
			display: flex;
			padding: 10rpx;

			.search {
				border: 1rpx solid #eee;
				text-align: center;
				flex: 1;
				font-size: 28rpx;
				color: #d43c33;
				line-height: 60rpx;
			}

			image {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.navScroll {
			display: flex;
			height: 60rpx;
		}

		.videoItem {
			margin-top: 10rpx;
			padding: 0 3%;

			video {
				width: 100%;
				height: 360rpx;
				border-radius: 10rpx;
			}

			.coverImg {
				width: 100%;
				height: 360rpx;
				border-radius: 10rpx;
			}
		}
	}

	.VideoScroll {
		height: calc(100vh - 152rpx);
	}

	.videoItem .content {
		font-size: 26rpx;
		height: 80rpx;
		line-height: 80rpx;
		max-width: 500rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* footer */
	.footer {
		border-top: 1rpx solid #eee;
		padding: 20rpx 0;
	}

	.footer .avatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		vertical-align: middle;
	}

	.footer .nickName {
		font-size: 26rpx;
		vertical-align: middle;
		margin-left: 20rpx;
	}

	.footer .comments_praised {
		float: right;
	}

	.comments_praised .btn {
		display: inline;
		padding: 0;
		background-color: transparent;
		border-color: transparent;
	}

	.comments_praised .btn:after {
		border: none;
	}

	.comments_praised .item {
		margin-left: 50rpx;
		position: relative;
	}

	.comments_praised .item .count {
		position: absolute;
		top: -20rpx;
		font-size: 20rpx;
	}
</style>
