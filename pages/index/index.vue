<template>
	<view class="container">
		<!-- 轮播图区域 -->
		<index-swiper :bannerList="bannerList"></index-swiper>
		<!-- 导航图标区域 -->
		<nav-icon></nav-icon>
		<!-- 推荐区域 -->
		<recommend :recommendList="recommendList"></recommend>
		<!-- 排行榜区域 -->
		<view class="rank">
			<!-- 头部区域 -->
			<nav-bar title="排行榜" recText="热歌风向标" class="navBarRank"></nav-bar>
			<swiper class="rankSwiper" next-margin="50rpx" circular>
				<swiper-item v-for="item in rankList" :key="name">
					<view class="swiperItem">
						<view class="title">{{item.name}}</view>
						<view class="musicItem" v-for="(value,index2) in item.tracks" :key="id">
							<image :src="value.al.picUrl"></image>
							<text class="count">{{index2+1}}</text>
							<text class="musicName">{{value.name}}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import indexSwiper from "./indexChild/indexSwiper.vue"
	import navIcon from "./indexChild/navIcon.vue"
	import recommend from "./indexChild/recommend.vue"
	import request from "../../utils/request.js"
	import navBar from "@/components/navBar/navBar.vue"
	export default {
		components: {
			indexSwiper,
			navIcon,
			recommend,
			navBar,
		},
		data() {
			return {
				bannerList: [],
				recommendList: [],
				rankList: [], //排行榜数据
			}
		},
		onLoad() {
			this.sectionAllData()
			this.getRecommendData()
		},
		methods: {
			async sectionAllData() {
				// 获取轮播图数据
				let bannerData = await request('/banner', {
					type: 2
				}, 'get')
				this.bannerList = bannerData.banners
				// console.log(this.bannerList);
				// 获取推荐歌单页面数据
				let recommendData = await request('/personalized', {
					limit: 10
				})
				this.recommendList = recommendData.result
				// console.log(this.recommendList);

			},
			async getRecommendData() {
				//获取排行榜数据
				let rankArr = []
				let dataArr = []
				for (let i = 0; i < 5; i++) {
					// 获取排行榜表单详情信息
					let detail = await request('/toplist/detail')
					//通过所有排行榜的id 获取排行榜某一榜单的详情歌曲的trackIds
					let rankData = await request('/playlist/detail', {
						id: detail.list[i].id
					})
					// 通过循环拿到一个榜单的三首歌详细信息
					// for (let i = 0; i < 3; i++) {
					// 	let data = await request('/song/detail', {
					// 		ids: rankData.playlist.trackIds[i].id
					// 	})
					// 	dataArr.push(data.songs[0])
					// }
					// let rankItem = {
					// 	name: rankData.playlist.name,
					// 	tracks: dataArr
					// }
					// 排行榜的tracks有概率显示不完全，所以舍弃
					let rankItem = {
						name: rankData.playlist.name,
						tracks: rankData.playlist.tracks.slice(0, 3)
					}
					rankArr.push(rankItem)
					//每次请求先将一部分展示给用户，用户体验好
					this.rankList = rankArr
					// dataArr = []
				}
			}
		},
		computed: {}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
	}

	.rank {
		padding: 20rpx;

		.rankSwiper {
			height: 450rpx;
			background-color: #fbfbfb;
			padding: 0 20rpx;
			margin: 20rpx 0 0 -20rpx;

			.swiperItem {
				width: 96%;

				.title {
					font-size: 30rpx;
					line-height: 80rpx;
				}

				.musicItem {
					// 当设置了flex属性，子元素会自动变成block元素
					display: flex;
					margin-top: 20rpx;

					image {
						height: 100rpx;
						width: 100rpx;
						border-radius: 7rpx;
					}

					.count {
						height: 100rpx;
						width: 100rpx;
						text-align: center;
						line-height: 100rpx;
					}

					.musicName {
						height: 100rpx;
						line-height: 100rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}

			}
		}
	}
</style>
