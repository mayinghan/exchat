import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'

class AvatarSelector extends Component {
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
                              <img src={this.state.icon} style={{width:20}}/>
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