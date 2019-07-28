import React, { Component } from 'react'
import { NavBar,  TextareaItem, Button,  List, } from 'antd-mobile' 
import  AvatarSelector from '../../component/avatorSelector/AvatarSelector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

/* const carType = ['Hatchback', 'Sedan', 'SUV', 'Convertible', 'Coupe']
const expectedPrice = ['5000-10000', '10000-15000', '15000-20000', '20000-25000', '25000-30000', '30000+']
 */

@connect(
  state=>state.user,
  {update}
)

class Userinfo extends Component{
  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      position: '',
      description: '',
      role: 'user'
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
        <List renderHeader={()=>'Vehicle Expectation'}>
          <TextareaItem 
          title='Details'
          rows={3}
          autoHeight
          placeholder='What kind of vehicle are you looking for? Please give us some keywords :)'
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

export default Userinfo