import React from 'react';
import {connect} from 'react-redux'
import {Result, List, WhiteSpace} from 'antd-mobile'

@connect(
  state => state.user
)
class UserCenter extends React.Component {
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
          <Item>Log out!</Item>
        </List>
      </div>
    ) : null;
  }
}

export default UserCenter;