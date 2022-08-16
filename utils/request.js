// 发送ajax请求
// import { cookie } from 'request'
import config from './config.js'
export default (url, data={}, method = "GET") => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.host + url,
			data: data,
			method,
			header: {
				cookie: uni.getStorageSync('cookies')
			    // cookie: uni.getStorageSync('cookies')?uni.getStorageSync('cookies').find(item => item.includes('MUSIC_U')):''
			},
			success(res) {
				if (url.includes('/login/cellphone')) { //登录请求
					//将用户的cookies存入本地
					let cookie = res.cookies.find(item => item.includes('MUSIC_U'))
					uni.setStorage({
						key: 'cookies',
						data: cookie
					})
					// console.log(res);
				}
				resolve(res.data)

			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
