import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import Expert from '../../component/person/Expert.js'
import User from '../../component/person/User.js'
import UserCenter from '../../component/person/UserCenter.js'
//import Person from '../../component/person/Person.js'
import NavLink from './NavLink';
/**
 * To-do: build the Expert, User, Msg, Person component 
 */

function Msg() {
	return <h2>Msg</h2>
}

function Person() {
	return <h2>Me</h2>
}
@connect(
  state => state
)
class Dashboard extends React.Component {
  render() {
		const user = this.props.user
		const {pathname} = this.props.location
		//overall list
    const navList = [
			{
				path:'/expert',
				text:'expert',
				icon:'boss',
				title:'Expert List',
				component:Expert,
				hide:user.type==='expert'
			},
			{
				path:'/user',
				text:'user',
				icon:'job',
				title:'Customer List',
				component:User,
				hide:user.type==='user'
			},
			{
				path:'/msg',
				text:'message',
				icon:'msg',
				title:'message',
				component:Msg
			},
			{
				path:'/me',
				text:'me',
				icon:'user',
				title:'me',
				component:UserCenter
			}
		];

		const page = navList.find(v => (v.path === pathname));
    return (
      <div>
        <NavBar className='fixd-header' mode='dard'>{page ? page.title : null}</NavBar>
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