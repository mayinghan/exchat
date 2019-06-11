/**
 * A component of User's Infomation Card on the dashboard
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'

class UserCard extends React.Component{
	static propTypes = {
		userList: PropTypes.array.isRequired
	}
	render(){
		const Header = Card.Header
		const Body = Card.Body
		return (
			<WingBlank>
			<WhiteSpace></WhiteSpace>
				{this.props.userList.map(v=>(
					v.avatar?(<Card key={v._id}>
						<Header
							title={v.user}
							thumb={require(`../img/${v.avatar}.png`)}
							extra={<span>{v.title}</span>}
						></Header>
						<Body>
							{v.type=='expert'? <div>Position:{v.position}</div> :null}
							{v.description.split('\n').map(d=>(
								<div key={d}>{d}</div>
							))}
						</Body>
					</Card>):null

				))}
			</WingBlank>
		)


	}
}
export default UserCard

