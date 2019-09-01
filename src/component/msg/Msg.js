import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd-mobile';


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

    const chatList = Object.values(msgGroup);
    const Item = List.Item;
    const Brief = Item.Brief;
    const userId = this.props.user._id;
    //group by chart id
    return (
      <div>
        {chatList.map(v => {
          console.log(v);
          const lastItem = this.getLast(v);
          const targetId = v[0].from === userId ? v[0].to : v[0].from;
          const targetInfo = this.props.chat.users[targetId];

          return (
            <List key={lastItem._id} >
              <Item thumb={require(`../img/${targetInfo.avatar}.png`)}>
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
