import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Indepth from './components/Indepth'
import Popular from './components/Popular'
import Login from './components/Login'
import Home from './components/Home'
import Search from './components/Search'
import Logout from './components/Logout'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/movies/:id" component={Indepth} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/account" component={Logout} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
