import React from 'react';
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, getMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util';

@connect(
  state => state,
  {getMsgList, sendMsg, getMsg, readMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: '', msg: []};
    //this.socket = null;
  }

  componentWillMount() {
    console.log('chat component gonna render')
  }

  componentDidMount() {
    console.log(this.props)
    
    if(!this.props.chat.msg.length) {
      this.props.getMsgList();
      this.props.getMsg();
    } else {
      console.log('already updated list!');
    }
    
	}

  componentWillUnmount() {
    //mark the target user's msg as read
    const targetId = this.props.match.params.user;
    this.props.readMsg(targetId);
  }

  handleSubmit(){
    //console.log(this.props)
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text
    if(msg) {
      this.props.sendMsg({from, to, msg});
    }
    this.setState({text: ''});
  }

  render() {
    const userid = this.props.match.params.user;
    const Item = List.Item;
    const users = this.props.chat.users;
    if(!users[userid]) {
      return null;
    }
    const chatId = getChatId(userid, this.props.user._id);
    const chatMsg = this.props.chat.msg.filter(v=>v.chatId === chatId);
    return (
      <div id='chat-page'>
        <NavBar 
          className='fixd-header'
          mode='dark'
          icon={<Icon type='left' />}
          onLeftClick={() => {
            //go back
            this.props.history.goBack();
          }}>
          {users[userid].name}
        </NavBar>
        <div style={{ marginTop: 45, marginBottom: 50}}>
          {chatMsg.map(v => {
            const avatar = require(`../img/${users[v.from].avatar}.png`);
            return v.from === userid ? (
              <List key={v._id}>
                <Item thumb={avatar}>{v.content}</Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item 
                  className='chat-me'
                  extra={<img src={avatar} />}>{v.content}</Item>
              </List>
            )
          })}
        </div>
        
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