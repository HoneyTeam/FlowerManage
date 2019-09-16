import React,{Component} from 'react'
import {HashRouter,Route,Redirect,Switch} from 'react-router-dom'
import  App from  './App'
import Login  from  './pages/login'
import User from  './pages/user'
import Admin from './pages/admin'
class RootRouter extends Component{
    render(){
        return (
            <App>
                <HashRouter>
                <Switch>
                    <Redirect exact from='/' to='/admin'></Redirect> 
                    <Route path = '/admin' render={()=>{
                    return(
                    <Admin>
                        <Route path='/login' component={Login}></Route>
                        <Route exact path='/user' component={User}></Route>                  
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