import axios from 'axios';
import io from 'socket.io-client';
const socket = process.env.NODE_ENV === 'production' ? io(): io('ws://localhost:5000');

//get msg list
const LIST = 'LIST';
//read msg
const GET = 'GET';
//mark as read
const READ = 'READ';

const initState = {
  msg: [],
  users: {},
  unreadNum: 0
};

//reducer
export function chat(state=initState, action) {
  switch(action.type) {
    case LIST:
      return {...state, users: action.payload.users, msg: action.payload.msg, unreadNum: action.payload.msg.filter(v=>!v.isRead && v.to===action.payload.userId).length};
    case GET:
      const count = action.payload.msg.to === action.payload.userId ? 1 : 0;
      return {...state, msg: [...state.msg, action.payload.msg], unreadNum: state.unreadNum + count};
    case READ: 
      const {targetId, num} = action.payload
      return {...state, msg:state.msg.map(v=>({...v,isRead:targetId==v.from?true:v.isRead})), unreadNum:state.unreadNum-num}
    default:
      return state;
  }
}

function msgList(msg, users, userId) {
  return {type: 'LIST', payload: {msg:msg, users:users, userId}};
}

function msgGet(msg, userId) {
  return {type: 'GET', payload: {msg:msg, userId}};
}

function msgread({userId, targetId, num}) {
  return {type: READ, payload: {userId, targetId, num}};
}

export function getMsgList() {
  
  return (dispatch, getState) => {
    axios.get('/user/getMsgList')
      .then(res => {
        //console.log(res.data)
        if(res.status === 200 && res.data.code === 0) {
          const userId = getState().user._id;
          dispatch(msgList(res.data.msg, res.data.users, userId));
        }
      });
  }
}

export function getMsg() {
  return (dispatch, getState) => {
    socket.removeAllListeners();
    socket.on('getMsg', data => {
      console.log('been called getMsg')
      console.log('gettting msg in redux!')
      const userId = getState().user._id;
      dispatch(msgGet(data, userId))
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    console.log('sending msg through redux')
    socket.emit('sendMsg', {from, to, msg});
  }
}

export function readMsg(targetId) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', {targetId})
      .then(res => {
        const userId = getState().user._id;
        if(res.status === 200 && res.data.code === 0) {
          dispatch(msgread({userId, targetId, num: res.data.num}));
        }
      })
  }
}