<template>
	<!-- 1.收集表单数据，前端验证（1.验证信息是否和规定2.不通过则提示用户3.通过：携带账号密码给服务端）
	后端验证（1.验证用户是否存在 2.不存在返回前端告知用户 3.用户存在则验证密码是否正确，返回给用户是否正确） -->
	<view class="container">
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input type="text" placeholder="请输入手机号码" v-model="telNumber" />
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input type="password" placeholder="请输入密码" v-model="password" />
				</view>
			</view>
			<button class="confirm-btn" @click="login()">登录</button>
			<button class="confirm-btn" @click="loginScan()">二维码登录</button>
			<image :src="imgUrl"></image>
			<view class="forget-section">
				忘记密码?
			</view>
		</view>
		<view class="register-section">
			还没有账号?
			<text>马上注册</text>
		</view>
	</view>

</template>

<script>
	import request from "../../utils/request.js"
	export default {
		data() {
			return {
				telNumber: '',
				password: '',
				imgUrl: '',
				userData: '',
				timer: null,
			}
		},
		onLoad() {},
		onUnload() {
			clearInterval(this.timer)
		},
		methods: {
			async login() {
				let phone = this.telNumber
				let password = this.password
				let phoneReg = /^1[3-9]\d{9}$/
				if (!this.telNumber) {
					uni.showToast({
						title: '手机号不能为空！',
						duration: 2000,
						icon: "error",
					});
					return
				}
				if (!phoneReg.test(this.telNumber)) {
					uni.showToast({
						title: '手机号格式错误！',
						duration: 2000,
						icon: "error",
					});
					return
				}
				if (!this.password) {
					uni.showToast({
						title: '密码不能为空！',
						duration: 2000,
						icon: "error",
					});
				}
				let result = await request('/login/cellphone', {
					phone,
					password,
				}, 'get')
				if (result.code === 200) {
					uni.showToast({
						title: '登录成功！',
						icon: "success",
					});
					//存信息
					uni.setStorageSync('userInfo', JSON.stringify(result.profile));
					//跳转至个人用户中心界面
					uni.reLaunch({
						url: "/pages/personal/personal"
					})
				} else if (result.code === -460) {
					uni.showToast({
						title: '网络拥堵！',
						icon: "error",
					});
				} else if (result.code === 502) {
					uni.showToast({
						title: '密码错误！',
						icon: "error",
					});
				} else {
					uni.showToast({
						title: '登录失败!',
						icon: "error",
					});
				}
			},
			async loginScan() {
				let result = await request('/login/qr/key')
				let Scan = await request('/login/qr/create', {
					key: result.data.unikey,
					qrimg: result.data.unikey
				})
				this.imgUrl = Scan.data.qrimg
				this.timer = setInterval(async () => {
					let msg = await request('/login/qr/check', {
						key: result.data.unikey
					})
					console.log(msg.code);
					if (msg.code === 803) {
						this.userData = msg
						console.log(this.userData.cookie);
						clearInterval(this.timer)
					}
				}, 2000)
			}
		}
	}
</script>

<style>
	.wrapper {
		position: relative;
		z-index: 90;
		padding-bottom: 40rpx;
	}

	.left-top-sign {
		font-size: 120rpx;
		color: #f8f8f8;
		position: relative;
		left: -16rpx;
	}

	.welcome {
		position: relative;
		left: 50rpx;
		top: -90rpx;
		font-size: 46rpx;
		color: #555;
	}


	.input-content {
		padding: 0 60rpx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30rpx;
		background: #f8f6fc;
		height: 120rpx;
		border-radius: 4px;
		margin-bottom: 50rpx;

	}

	.input-item:last-child {
		margin-bottom: 0;
	}

	.input-item .tit {
		height: 50rpx;
		line-height: 56rpx;
		font-size: 30rpx;
		color: #606266;
	}

	.input-item input {
		height: 60rpx;
		font-size: 30rpx;
		color: #303133;
		width: 100%;
	}

	.confirm-btn {
		width: 630rpx !important;
		height: 76rpx;
		line-height: 76rpx;
		border-radius: 50rpx;
		margin-top: 70rpx;
		background: #d43c33;
		color: #fff;
		font-size: 32rpx;
		padding: 0;
	}

	.confirm-btn2:after {
		border-radius: 100px;
	}

	.forget-section {
		font-size: 28rpx;
		color: #4399fc;
		text-align: center;
		margin-top: 40rpx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50rpx;
		width: 100%;
		font-size: 28rpx;
		color: #606266;
		text-align: center;

	}

	.register-section text {
		color: #4399fc;
		margin-left: 10rpx;
	}
</style>
