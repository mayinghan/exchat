import React from 'react';
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
@withRouter
class NavLink extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render() {
    const list = this.props.data
                    .filter(v => !v.hide);

    const { pathname } = this.props.location
    return (
      <TabBar>
        {list.map(item => (
          <TabBar.Item
          key={item.path}
          title={item.text}
          icon={{uri: require(`./img/${item.icon}.png`)}}
          selectedIcon={{uri: require(`./img/${item.icon}-active.png`)}}
          selected={pathname===item.path}
          onPress={()=>{
            this.props.history.push(item.path)
          }}
          ></TabBar.Item>
        ))}
      </TabBar>
    )
  }
}

export default NavLink;