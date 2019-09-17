import React,{Component} from 'react'
import {HashRouter,Route,Redirect,Switch} from 'react-router-dom'
import  App from  './App'
import Login  from  './pages/login'
import User from  './pages/user'
class RootRouter extends Component{
    render(){
        return (
            <App>
                <HashRouter>

                <Switch>
                    <Redirect exact from='/' to='/login'></Redirect> 
                    <Route path='/login' component={Login}></Route>
                    <div>1111</div>
                    <Route exact path='/user' component={User}></Route>
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