<template>
	<!-- 顶部轮播图区域 -->
	<view>
		<swiper class="banners" indicator-dots indicator-color="ivory" indicator-active-color="#d43c33" autoplay="true">
			<swiper-item v-for="item in bannerList" :key="item.bannerId">
				<image :src="item.pic" ></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: ['bannerList'],
			// bannerList: {
			// 	type: Array,
			// 	default () {
			// 		return []
			// 	}
			// }
		
		created() {
			
		},
		methods:{
		
		},
	
	}
</script>

<style lang="scss">
	.banners {
		width: 100%;
		height: 300rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
