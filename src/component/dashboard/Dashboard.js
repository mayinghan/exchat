import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import Expert from '../../component/person/Expert.js'
import User from '../../component/person/User.js'
import Person from '../../component/person/Person.js'
import NavLink from './NavLink';
/**
 * To-do: build the Expert, User, Msg, Person component 
 */

function Msg() {
	return <h2>Msg</h2>
}

@connect(
  state => state
)
class Dashboard extends React.Component {
  render() {
		const user = this.props.user
    const navList = [
			{
				path:'/expert',
				text:'user',
				icon:'boss',
				title:'user list',
				component:Expert,
				hide:user.type==='user'
			},
			{
				path:'/user',
				text:'boss',
				icon:'job',
				title:'expert list',
				component:User,
				hide:user.type=='expert'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'message',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'me',
				component:Person
			}
		]
		const pathname = this.props.location
    return (
      <div>
        <NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path===pathname).title}</NavBar>
				<div style={{marginTop:45}}>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
				</div>

				<NavLink data={navList}></NavLink>
      </div>
    )
  }
}

export default Dashboard