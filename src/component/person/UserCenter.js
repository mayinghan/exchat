import React from 'react';
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal, WingBlank} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {Redirect} from 'react-router-dom'

@connect(
  state => state.user
)
class UserCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  logout() {
    const alert = Modal.alert;
    console.log('clicked')
    alert('logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', onPress: () =>{} },
      { text: 'Yes', onPress: () => {
        browserCookie.erase('userid');
        window.location.href = window.location.href
      } }
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
          img={<img src = {require(`../img/${this.props.avatar}.png`)} style={{width:50}} alt=''></img>}
          title={this.props.user}
        >
        </Result>

        <List renderHeader = {() =>'Description'}>
          <Item>
            {props.description}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button type="warning" onClick={this.logout}>Log out!</Button>
        </WingBlank>
      </div>
    ) : (<Redirect to={props.redirectTo} />);
  }
}

export default UserCenter;