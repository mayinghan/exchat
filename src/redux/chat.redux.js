import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:5000');

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
      return {...state, users: action.payload.users, msg: action.payload.msg, unreadNum: action.payload.msg.filter(v=>!v.read && v.to===action.payload.userId).length};
    case GET:
      const count = action.payload.msg.to === action.payload.userId ? 1 : 0;
      return {...state, msg: [...state.msg, action.payload.msg], unreadNum: state.unreadNum + count};
    case READ:
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
    socket.on('getMsg', data => {
      const userId = getState().user._id;
      dispatch(msgGet(data, userId))
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendMsg', {from, to, msg});
  }
}