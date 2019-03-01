import React from 'react'
import Logo from '../../component/logo/Logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Login extends React.Component{
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
  }

  register() {
    //redirect to /register
    this.props.history.push('/register')
  }
  render() {
    return(
      <div>
        <Logo></Logo>
        <h2>Login</h2>
        <WingBlank>
          <List>
            <InputItem>Username</InputItem>
            <WhiteSpace />
            <InputItem>Password</InputItem>
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>Register</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="primary">Log in</Button>
        </WingBlank>
      </div>    
    )
  }
}

export default Login;