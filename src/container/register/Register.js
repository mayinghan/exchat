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

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
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
          <InputItem placeholder="Username"></InputItem>
          <InputItem type="password" placeholder="Password"></InputItem>
          <InputItem type="password" placeholder="Confirm Password"></InputItem>
          <WhiteSpace />
          <RadioItem key={1} checked={this.state.type==='expert'} onChange={()=>this.handleChange('type','expert')}>I am an expert!</RadioItem>
          <RadioItem key={2} checked={this.state.type==='user'} onChange={()=>this.handleChange('type', 'user')}>I want to consult!</RadioItem>
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" >Register</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.login}>Log in</Button>
        </WingBlank>
      </div>    
    )
  }
}

export default Register;