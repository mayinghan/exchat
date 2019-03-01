//only for getting user data and redirect to other pages
//检测路由
import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends Component {
  //get user info during componentDidMount
  componentDidMount() {
     //if the user already at login or register page, then nothing need to do
     const publicList = ['/login', '/register']
     console.log(this.props.location.pathname)
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
          } else {
            console.log(this.props.history)
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