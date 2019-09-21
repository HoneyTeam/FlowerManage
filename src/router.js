import React,{Component} from 'react'
import {HashRouter,Route,Redirect,Switch} from 'react-router-dom'
import  App from  './App'
import Login  from  'pages/login'
import Admin from 'pages/admin'
import TokenMode from 'components/tokenModel'
import Request from 'components/request'
import UserAdd from 'pages/User/UserAdd'
import UserList from 'pages/User/UserList'
import OrderList from 'pages/User/OrderList'
import Allorder from 'pages/Order/Allorders'
class RootRouter extends Component{
    render(){
        return (
            <App>
                <HashRouter>
                    <TokenMode></TokenMode>
                    <Request></Request>
                <Switch>
                    <Redirect exact from='/' to='/login'></Redirect> 
                    <Route path='/login' component={Login}></Route>
                    <Route path = '/admin' render={()=>{
                    return(
                    <Admin>
                        
                        <Route exact path='/admin/user/add' component={UserAdd}></Route>    
                        <Route exact path='/admin/user/list' component={UserList}></Route> 
                        <Route exact path='/admin/user/orderlist' component={OrderList}></Route>        
                        <Route exact path='/admin/order/list' component={Allorder}></Route>

                    </Admin>
                    )
                }
                }></Route>                   
                </Switch>                   
                </HashRouter>
            </App>
        )
        
    }
}
export default  RootRouter


