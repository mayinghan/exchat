import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {
  //force selectAvatar is a function
  //add a constraint to selectAvatar
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  
  constructor(props) {
    super(props)
    this.state={}
  }
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',')
                        .map(v=>({
                          icon: require(`../img/${v}.png`),
                          text: v
                        }));
    const gridHeader = this.state.text
                          ? (<div>
                              <span>Avatar:   </span>
                              <img src={this.state.icon} alt="" style={{width:20}}/>
                          </div>)
                          : 'Please choose your avatar'
                        
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid data={avatarList} columnNum={5} 
                onClick={e=>{
                  this.setState(e)
                  this.props.selectAvatar(e.text)
                }}
          ></Grid>
        </List>
        
      </div>
    )
  }
}

export default AvatarSelector
