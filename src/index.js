import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import './index.css';
import './config'
import reducers from './reducers'
import Login from './container/login/Login'
import Register from './container/register/Register'
import Expertinfo from './container/info/Expertinfo'
import Userinfo from './container/info/Userinfo'
import AuthRoute from './component/authroute/AuthRoute'
import Dashboard from './component/dashboard/Dashboard'
import Chat from './component/chat/Chat'
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  //window.devToolsExtension? window.devToolsExtension() : ()=>{}
))



ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/expertinfo' component={Expertinfo}></Route>
          <Route path='/userinfo' component={Userinfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  ), document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.register();
