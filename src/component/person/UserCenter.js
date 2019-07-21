import React from 'react';
import {connect} from 'react-redux'

@connect(
  state => state.user
)
class UserCenter extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div>
        <p>User Center</p>
      </div>
    )
  }
}

export default UserCenter;