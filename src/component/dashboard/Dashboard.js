import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
/**
 * To-do: build the Expert, User, Msg, Person component 
 */
@connect(
  state => state
)

class Dashboard extends React.Component {
  render() {
    const navList = [
			{
				path:'/expert',
				text:'user',
				icon:'boss',
				title:'user list',
				component:Expert,
				hide:user.type=='user'
			},
			{
				path:'/user',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
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

    return (
      <div>
        <NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path==this.props.location).title}</NavBar>
				<div style={{marginTop:45}}>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
				</div>

				<NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard