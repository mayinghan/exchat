import React from 'react';
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
@withRouter
@connect(
  state=>state.chat
)
class NavLink extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render() {
    //filter hidden data
    const list = this.props.data
      .filter(v => !v.hide);

    const { pathname } = this.props.location
    return (
      <div>
        <TabBar>
          {list.map(item => (
            <TabBar.Item
              badge={item.path === '/msg' ? this.props.unreadNum : 0}
              key={item.path}
              title={item.text}
              icon={{ uri: require(`./img/${item.icon}.png`) }}
              selectedIcon={{ uri: require(`./img/${item.icon}-active.png`) }}
              selected={pathname === item.path}
              onPress={() => {
                this.props.history.push(item.path)
              }}
            ></TabBar.Item>
          ))}
        </TabBar>
      </div>

    )
  }
}

export default NavLink;