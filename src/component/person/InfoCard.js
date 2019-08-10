/**
 * A component of User's Infomation Card on the dashboard
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
	static propTypes = {
		userList: PropTypes.array.isRequired
	}

	handleClick(v) {
		this.props.history.push(`/chat/${v._id}`);
	}

	render() {
		const Header = Card.Header;
		const Body = Card.Body;

		//console.log(this.props.userList)
		return (
			<WingBlank>
				<WhiteSpace></WhiteSpace>
				{this.props.userList.map(v => (
					v.avatar ? (
						<div key={v._id}>
							<Card
								key={v._id}
								onClick={() => this.handleClick(v)}>
								<Header
									title={v.user}
									thumb={require(`../img/${v.avatar}.png`)}
									extra={<span>{v.title}</span>}
								></Header>
								<Body>
									{v.type == 'expert' ? <div>Position:{v.position}</div> : null}
									{v.description.split('\n').map(d => (
										<div key={d}>{d}</div>
									))}
								</Body>
							</Card>
							<WhiteSpace></WhiteSpace>
						</div>) : null
				))}
			</WingBlank>
		)


	}
}
export default UserCard

