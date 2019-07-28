import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getList } from '../../redux/chat.redux'
import { WingBlank, Card, WhiteSpace } from 'antd-mobile';
import InfoCard from './InfoCard';

@connect(
  state => state.chat,
  {getList}
)
class Expert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this._isMounted = false;
  }

  // componentDidMount() {
  //   this._isMounted = true;
  //   axios.get('/user/list?type=expert')
  //     .then(res => {
  //       if(res.data.code === 0 && this._isMounted) {
  //         this.setState({ data: res.data.data });
  //       }
  //     })
  // }
  componentDidMount() {
    this._isMounted = true;
    this.props.getList('expert');
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return <InfoCard userList={this.props.userList}></InfoCard> 
  }
}

export default Expert