import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getList } from '../../redux/chat.redux'
import { WingBlank, Card, WhiteSpace } from 'antd-mobile';

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

  componentDidMount() {
    this._isMounted = true;
    axios.get('/user/list?type=expert')
      .then(res => {
        if(res.data.code === 0 && this._isMounted) {
          this.setState({ data: res.data.data });
        }
      })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank>
        {this.state.data.map(v => (
          //if the user have an avatar, then display
          v.avatar ? (<div><Card key = {v._id}>
            <Header
              title = {v.user}
              thumb = {require(`../img/${v.avatar}.png`)}
              extra = {<span>{v.type}</span>}
            ></Header>
            <Body>
              {v.description.split('\n').map(v => (
                <div key = {v}>{v}</div>
              ))}
            </Body>
          </Card>
          <WhiteSpace></WhiteSpace></div>) : null
        ))}
      </WingBlank>
    )
  }
}

export default Expert