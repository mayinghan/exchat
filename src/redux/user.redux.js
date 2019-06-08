
import axios from 'axios'
import {getRedirectPath} from '../util'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const initState={
	redirectTo:'',
	msg:'',
	user:'',
	type:''
}
// reducer
export function user(state=initState, action){
	switch(action.type){
		case AUTH_SUCCESS:{
			return {...state, msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
		}
		case LOAD_DATA:
			return {...state, ...action.payload}
		case ERROR_MSG:
			return {...state, isAuth:false, msg:action.msg}
		default:
			return state
	}
} 

//action creator
function authSuccess(obj) {
	//mask the password to the redux data flow
	const {pwd, ...data} = obj
	return { type: AUTH_SUCCESS, payload: data }
}

function errorMsg(msg){
	return { msg, type:ERROR_MSG }
}

export function loadData(userinfo){
	return { type:LOAD_DATA, payload:userinfo}
}

export function login({user,pwd}){
	if (!user||!pwd) {
		return errorMsg('You are missing some fields!')
	}
	return dispatch=>{
		axios.post('/user/login',{user,pwd})
			.then(res=>{
				if (res.status===200&&res.data.code===0) {
					console.log(res.data.data)
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})		
	}
}

export function register({user,pwd,repeatpwd,type}){
	if (!user||!pwd||!type||!repeatpwd) {
		console.log(user, pwd, repeatpwd, type)
		return errorMsg('You are missing some fields!')
	}
	if (pwd!==repeatpwd) {
		return errorMsg('Two passwords are not the same!')
	}
	return dispatch=>{
		axios.post('/user/register',{user,pwd,type})
			.then(res=>{
				if (res.status===200&&res.data.code===0) {
					dispatch(authSuccess({user,pwd,type}))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})		
	}

}

//to update a user's info
export function update(data) {
	if(!data.avatar) {
		return errorMsg('Please select your avatar!')
	}

	if(!data.description) return errorMsg('You are missing field \'Details\'');

	if(data.role === 'expert') {
		if(!data.position) {
			return errorMsg('Please enter your position!');
		}
	}
	return dispatch=> {
		//update userinfo
		let {role, ...info} = data;
		//console.log(data);
		axios.post('/user/update', info)
			.then(res=>{
				if (res.status===200&&res.data.code===0) {
					console.log(res.data.data)
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			});		
	}
}





