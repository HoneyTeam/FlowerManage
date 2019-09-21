import React,{Component} from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import  App from  './App'
import Login  from  'pages/login'
import Banner from "./pages/banner"
import BannerAdd from "./pages/banneradd"
import Admin from 'pages/admin'
import UserAdd from 'pages/User/UserAdd'
import UserList from 'pages/User/UserList'
class RootRouter extends Component{
    render(){
        return (
            <App>
                <HashRouter>
                <Switch>
                    <Redirect exact from='/' to='/admin'></Redirect> 
                    <Route path='/login' component={Login}></Route>
                    <Route path = '/admin' render={()=>{
                    return(
                        <Admin>
                            
                            <Route exact path='/admin/user/add' component={UserAdd}></Route>    
                            <Route exact path='/admin/user/list' component={UserList}></Route>  
                            <Route exact path='/admin/banner/list' component={Banner}></Route> 
                            <Route exact path='/admin/banner/add' component={BannerAdd}></Route>
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



// children={()=>{
//     return(
//         <User>
//             <Route exact path='/user/updateUser' component={UpdateUser}></Route>  
//         </User>
                                   
//     )
// }

// }