import React, { Component } from 'react'
import Logo from '../../component/logo/Logo'
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'

class Register extends Component{
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatPwd: '',
      type: 'expert'
    }

    this.login = this.login.bind(this)
  }

  login() {
    //
    this.props.history.push('/login')
  }
  render() {
    const RadioItem = Radio.RadioItem
    return(
      <div>
        <Logo></Logo>
        <h2>Register</h2>
        <List>
          <InputItem>Username</InputItem>
          <InputItem>UFL Email</InputItem>
          <InputItem>Password</InputItem>
          <InputItem>Confirm Password</InputItem>
          <WhiteSpace />
          <RadioItem check={this.state.type==='expert'}>I am an Expert!</RadioItem>
          <RadioItem check={this.state.type==='user'}>I have questions!</RadioItem>
        </List>
        <WingBlank>
          <Button type="primary" onClick={this.login}>Register</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="primary">Log in</Button>
        </WingBlank>
      </div>    
    )
  }
}

export default Register;