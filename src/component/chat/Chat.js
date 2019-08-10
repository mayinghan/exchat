import React from 'react';
import io from 'socket.io-client'
import { List, InputItem } from 'antd-mobile'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: '', msg: []};
    this.socket = null;
  }
  componentDidMount() {
    this.socket = io('ws://localhost:5000');
    this.socket.on('getMsg', data => {
      this.setState({
        msg: [...this.state.msg, data.text]
      })
    })
  }

  handleSubmit(){
    console.log(this.state.text);
    this.socket.emit('sendmsg', {text: this.state.text});
    this.setState({text: ''});
  }

  render() {
    return (
      <div>
        {this.state.msg.map(v => {
          return <p key={v}>{v}</p>
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