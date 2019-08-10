//combine all the reducers here

import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { list } from './redux/userList.redux'
import { chat } from './redux/chat.redux'

export default combineReducers({user, list, chat})
