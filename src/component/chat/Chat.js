import React from 'react';
import io from 'socket.io-client'
import { List, InputItem, NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, getMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  {getMsgList, sendMsg, getMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: '', msg: []};
    //this.socket = null;
  }
  componentDidMount() {
    this.props.getMsgList();
    this.props.getMsg();
  }

  handleSubmit(){
    //console.log(this.props)
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({from, to, msg});
    this.setState({text: ''});
  }

  render() {
    const user = this.props.match.params.user;
    const Item = List.Item;
    return (
      <div id='chat-page'>
        <NavBar mode='dark'>
          {this.props.match.params.user}
        </NavBar>

        {this.props.chat.msg.map(v => {
          return v.from === user ? (
            <List key={v._id}>
              <Item>{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item 
                className='chat-me'
                extra={'avatar'}>{v.content}</Item>
            </List>
          )
        })}
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='message'
              value={this.state.text}
              onChange={v=>(
                this.setState({text:v})
              )}
              extra={<span onClick={()=>this.handleSubmit()}>Send</span>}
            >
            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat;