import React, { Component } from 'react'
import logoImg from './logo.jpeg'
import './logo.css'

class Logo extends Component {
  render() {
    return (
      <div className='logo-container'>
        <img className='logo' src={logoImg}></img>
      </div>
    )
  }
}

export default Logo 