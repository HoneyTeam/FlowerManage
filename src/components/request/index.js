import React,{Component} from 'react'
import {message}from 'antd'
import {connect} from 'react-redux'
import ActionCreator from 'store/actionCreator'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'  //将方法直接映射到props里面去
class Request extends Component{
      constructor (){
        super()
        this.state={
        oldtoken:''
        }
    }
    componentDidMount(){
        console.log('哈哈',this.props.request)
            if(this.props.request){
                //this.time()
            }
            
    }
    componentWillUnmount(){
        console.log('我要死了')
    }

    time=()=>{
        let times=setInterval(()=>{
            let {oldtoken}=this.state
            let token=localStorage.getItem('token')
            let _id=localStorage.getItem('id')
            console.log(token,_id)
                this.$axios.get(`/hehe/admin/findus/finduser?_id=${_id}`)
                .then((data)=>{
                console.log('请求回来的数据',data)
                if(data.data.err===0){
                    this.setState({oldtoken:data.data.list[0].token})
                    console.log('数据库的token',this.state.oldtoken,"本地的token",token)
                    if(token!=this.state.oldtoken){
                        //clearInterval()
                        //this.props.changeModelState()
                        this.setState()
                        message.success('此账户在别处登录了')
                        this.props.history.push('/login')  
                        clearInterval(times)
                    }
                }
                })
            },1000)
        }
        // clear=()=>{
        //     console.log('aaaaaaaaaaaaa')
        //     clearInterval(this.times)
        //    // clearInterval(this.startGetTopoDataInterval);

        // }

        //     startGetTopoDataInterval=() => {
        //         if(this.props.request){
        //             this.startGetTopoDataInterval = setInterval(this.getTopoDataIntervalTask,1000);
        //         }
        //     }
        
        // getTopoDataIntervalTask = () =>{
        //     let isDataOK = this.getTopoDataAndSetState();
        //     if (isDataOK) {
        //         this.clearGetTopoDataInterval();
        //         clearInterval()
        //                 this.props.changeModelState()
        //                 message.success('此账户在别处登录了')
        //                 this.props.history.push('/login')  
        //     }
        // }
     
        // clearGetTopoDataInterval = () => {
        //     clearInterval(this.startGetTopoDataInterval);
        //     this.props.changeModelState()
        //     message.success('此账户在别处登录了')
        //     this.props.history.push('/login')  
        // }
        // getTopoDataAndSetState = () => {
        //     let {oldtoken}=this.state
        //     let token=localStorage.getItem('token')
        //     let _id=localStorage.getItem('id')
        //     console.log(token,_id)
        //         this.$axios.get(`/hehe/admin/findus/finduser?_id=${_id}`)
        //         .then((data)=>{
        //         console.log('请求回来的数据',data)
        //         if(data.data.err===0){
        //             this.setState({oldtoken:data.data.list[0].token})
        //             console.log('数据库的token',this.state.oldtoken,"本地的token",token)
        //             if(token!=this.state.oldtoken){
        //                 // clearInterval()
        //                 // this.props.changeModelState()
        //                 // message.success('此账户在别处登录了')
        //                 // this.props.history.push('/login')  
        //                 return true
        //             }
        //         }
        //         return false
        //     })
        // }
        render(){
            
            return (
                <div>

                </div>
            )
        }
    
}
let RequestComponent=withRouter(Request)   //可以用两个高阶组件处理,withRoute赋予路由对象,
export default connect(state=>state,(dispatch)=>{  //connect是将state数据和方法映射到props里面去
return bindActionCreators(ActionCreator,dispatch)})(RequestComponent)

