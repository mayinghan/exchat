import axios from 'axios'

const USER_LIST = 'USER_LIST'


const initState = {
  userList: []
}

//reducer
export function chat(state = initState, action) {
  switch(action.type){
    case USER_LIST: return {...state, userList: action.payload}

    default: return state
  }
}



//action creater
function userList(data) {
  return {
    type: USER_LIST,
    payload: data
  }
} 

//functions
export function getList(type) {
  return dispatch => {
    axios.get(`/user/list?type=${type}`)
      .then(res => {
        if(res.data.code === 0) {
          dispatch(userList(res.data.data))
        }
      })
  }
}