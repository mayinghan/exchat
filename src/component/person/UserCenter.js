import React from 'react';
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state => state.user,
  { logoutSubmit }
)
class UserCenter extends React.Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }
  
  logout() {
    const alert = Modal.alert;
    console.log('clicked')
    alert('logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', onPress: () =>{} },
      { text: 'Yes', onPress: () => {
        browserCookie.erase('userid');
        this.props.logoutSubmit();
      }}
    ]);
  }
  
  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = List.Brief;
    // console.log(props);
    return props.user ? (
      <div>
        <Result
          img={<img src = {require(`../img/${this.props.avatar}.png`)} style={{width:50}}></img>}
          title={this.props.user}
        >
        </Result>

        <List renderHeader = {() =>'Description'}>
          <Item>
            {props.description}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>Log out!</Item>
        </List>
      </div>
    ) : <Redirect to={props.redirectTo}></Redirect>;
  }
}

export default UserCenter;