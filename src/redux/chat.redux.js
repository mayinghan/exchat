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
  unreadNum: 0
};

//reducer
export function chat(state=initState, action) {
  switch(action.type) {
    case LIST:
      return {...state, msg: action.payload, unreadNum: action.payload.filter(v=>!v.read).length};
    case GET:
      return {...state, msg: [...state.msg, action.payload], unread: state.unreadNum + 1};
    case READ:
    default:
      return state;
  }
}

function msgList(msg) {
  return {type: 'LIST', payload: msg};
}

function msgGet(msg) {
  return {type: 'GET', payload: msg};
}

export function getMsgList() {
  return dispatch => {
    axios.get('/user/getMsgList')
      .then(res => {
        console.log(res.data)
        if(res.status === 200 && res.data.code === 0) {
          dispatch(msgList(res.data.msg));
        }
      });
  }
}

export function getMsg() {
  return dispatch => {
    socket.on('getMsg', data => {
      console.log(data);
      dispatch(msgGet(data))
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendMsg', {from, to, msg});
  }
}