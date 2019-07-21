//only for getting user data and redirect to other pages
//检测路由
import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from  '../../redux/user.redux'
import { connect } from 'react-redux'

@withRouter
@connect(
  state=>state.user,
  {loadData}
)
class AuthRoute extends Component {
  //get user info during componentDidMount
  componentDidMount() {
     //if the user already at login or register page, then nothing need to do
     console.log('component mount here')
     const publicList = ['/login', '/register']
     //console.log(this.props.location.pathname)
     const pathname = this.props.location.pathname
     if(publicList.indexOf(pathname) > -1) {
       return null
     }
    //fetching user info
    axios.get('/user/info')
      .then(res => {
        if(res.status === 200) {
          if(res.data.code === 0) {
            //user is logged in
            console.log('user info here')
            console.log(res.data.data);
            this.props.loadData(res.data.data)
          } else {
            this.props.history.push('/login')
          }
          console.log(res.data)
        }
      })
    /*To-do:  need to check:
    1: whether logged in
    2: type of the user (user can see experts, experts can see user)
    3: if user have full info
    */
  }

  render() {
    return null
  }
}

//var AuthRouteWithRouter = withRouter(AuthRoute)
export default AuthRoute