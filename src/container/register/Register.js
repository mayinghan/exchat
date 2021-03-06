import React, { Component } from 'react'
import Logo from '../../component/logo/Logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  {register}
)
class Register extends Component{
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'user',
      code: ''
    }

    this.login = this.login.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange(key, val) {
    this.setState({
      //[]: computed property names, means using the value of variable 'key'
      [key]: val
    })
  }

  login() {
    //
    this.props.history.push('/login')
  }

  handleRegister() {
    this.props.register(this.state)
  }

  render() {
    const RadioItem = Radio.RadioItem;
    let inputCode;

    if(this.state.type === 'expert') {
      inputCode = <InputItem type='password' onChange={(v) => this.handleChange('code', v)} placeholder='Verification code; ask the admin for code'></InputItem>
    } else {

    }
    return(
      <div>
        {this.props.redirectTo? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo></Logo>
        
        {this.props.msg?<p className='errmsg'>{this.props.msg}</p> : null}
        <WingBlank>
          <h2>Register</h2>
          <List>
            <InputItem 
              onChange={(v) => this.handleChange('user', v)}
              placeholder="Username"></InputItem>
            <InputItem type="password" 
              onChange={(v) => this.handleChange('pwd', v)}
              placeholder="Password"></InputItem>
            <InputItem type="password" 
              onChange={(v) => this.handleChange('repeatpwd', v)}
              placeholder="Confirm Password"></InputItem>
            <WhiteSpace />
            <RadioItem key={1} checked={this.state.type==='expert'} onChange={()=>this.handleChange('type','expert')}>I am an expert!</RadioItem>
            <RadioItem key={2} checked={this.state.type==='user'} onChange={()=>this.handleChange('type', 'user')}>I want to consult!</RadioItem>
            {inputCode}
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>Register</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="warning" onClick={this.login}>Log in</Button> 
        </WingBlank>
        
      </div>    
    )
  }
}

export default Register;