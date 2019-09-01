import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';


@connect(
  state => state
)
class Msg extends React.Component {
  getLast(array) {
    return array[array.length - 1];
  }

  render() {
    console.log(this.props)
    const msgGroup = {};
    this.props.chat.msg.forEach(msg => {
      msgGroup[msg.chatId] = msgGroup[msg.chatId] || [];
      msgGroup[msg.chatId].push(msg);
    });

    const chatList = Object.values(msgGroup).sort((a, b) => {
      const aLast = new Date(this.getLast(a).createdAt);
      const bLast = new Date(this.getLast(b).createdAt);
      
      return bLast - aLast;
    });

    const Item = List.Item;
    const Brief = Item.Brief;
    const userId = this.props.user._id;
    const userInfo = this.props.chat.users;
    //group by chart id
    return (
      <div>
        {chatList.map(v => {
          console.log(v);
          const lastItem = this.getLast(v);
          const targetId = v[0].from === userId ? v[0].to : v[0].from;
          const targetInfo = this.props.chat.users[targetId];
          if(!targetInfo) {
            return null;
          }

          const unreadNum = v.filter(v => !v.read && v.to === userId).length;
          return (
            <List key={lastItem._id} >
              <Item 
                extra={<Badge text={unreadNum}></Badge>}
                thumb={require(`../img/${targetInfo.avatar}.png`)}
                arrow='horizontal'
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}>
                {targetInfo.name}
                <Brief>{lastItem.content}</Brief>
              </Item>
            </List>   
          )
        })}
      </div>
    )
  }
}

export default Msg;
