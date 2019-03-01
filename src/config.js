import axios from 'axios'
import { Toast } from 'antd-mobile'

//intercept requetsts
axios.interceptors.request.use(function(config){
	Toast.loading('加载中',0)
	return config
})

//intercept response
axios.interceptors.response.use(function(config){
	setTimeout(()=>{
			Toast.hide()
	},500)
	
	return config
})