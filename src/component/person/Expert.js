import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getList } from '../../redux/chat.redux'

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
  }

  render() {
    return (
      <h1>hello</h1>
    )
  }
}

export default Expert