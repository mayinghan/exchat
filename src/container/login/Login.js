import React from 'react'
import Logo from '../../component/logo/Logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state=>state.user,
  {login}
)
class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      pwd:''
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  register() {
    //redirect to /register
    this.props.history.push('/register')
  }

  handleLogin() {
    this.props.login(this.state)
  }

  handleChange(key, val) {
    this.setState({
      //[]: computed property names, means using the value of variable 'key'
      [key]: val
    })
  }

  render() {
    return(
      <div>
        {this.props.redirectTo? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo></Logo>
        <h2>Login</h2>
        {this.props.msg?<p className='errmsg'>{this.props.msg}</p> : null}
        <WingBlank>
          <List>
            <InputItem onChange={(v) => this.handleChange('user', v)} placeholder="Username"></InputItem>
            <WhiteSpace />
            <InputItem type="password" onChange={(v) => this.handleChange('pwd', v)} placeholder="Password"></InputItem>
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin}>Log in</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="warning" onClick={this.register}>Register</Button>
        </WingBlank>
      </div>    
    )
  }
}

export default Login;