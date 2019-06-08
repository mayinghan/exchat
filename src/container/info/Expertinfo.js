import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button, List } from 'antd-mobile' 
import  AvatarSelector from '../../component/avatorSelector/AvatarSelector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state=>state.user,
  {update}
)
class Expertinfo extends Component{
  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      position: '',
      description: '',
      role: 'expert'
    }
  }

  onChange(k, v) {
    this.setState({
      [k]: v
    })
  }

  render() {
    const path = this.props.location.pathname
    return (
      <div>
        {(this.props.redirectTo !== path) ? <Redirect to={this.props.redirectTo}></Redirect>:''}
        <NavBar
          mode="dark"
        >Finish your Info!</NavBar>
        {this.props.msg?<p className='errmsg'>{this.props.msg}</p> : null}
        <AvatarSelector 
          selectAvatar={(img)=>{
            this.setState({
              avatar:img
            })
          }}
        ></AvatarSelector>
        <List renderHeader={()=>'Position'}>
          <InputItem onChange={(v)=>this.onChange('position', v)}>
            Position
          </InputItem>
        </List>
        <List renderHeader={()=>'Description'}>
          <TextareaItem 
          name='Description'
          rows={3}
          autoHeight
          onChange={(v)=>this.onChange('description', v)}>
          </TextareaItem>
        </List>
        
        <Button
          onClick={() => {
            this.props.update(this.state)
          }} type='primary'>
          Submit!
        </Button>
      </div>
    )
  }
}

export default Expertinfo