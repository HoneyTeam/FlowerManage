import React,{Component} from 'react'
import {message}from 'antd'
import {connect} from 'react-redux'
import ActionCreator from 'store/actionCreator'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'  //将方法直接映射到props里面去
import Store from 'store/store'
class Request extends Component{
      constructor (){
        super()
        this.state={
        oldtoken:'',
        andstate:''
        }
    }
    // componentDidMount(){
    //     console.log('哈哈',this.props.request)
    //     Store.dispatch(ActionCreator.changeRequest())
    // }
    componentDidUpdate(){
        Store.dispatch(ActionCreator.changeRequest())
        console.log('嘻嘻嘻',this.props.request)
        //console.log('哈哈',this.props.request)
        //console.log('输出Stroe1', Store.dispatch(ActionCreator.changeModelState()))
        //console.log('输出Stroe', Store.dispatch(ActionCreator.changeRequest()))
        //Store.dispatch(ActionCreator.changeRequest())
        // this.setState({andstate:this.props.request})
        // console.log('hehe',this.state.andstate)
        // console.log('嘻嘻嘻',this.props.request)
        //localStorage.setItem('request','true') 
    //     let request=localStorage.getItem('request')
            if(this.props.request){
                console.log('111111111111111111111111')
                this.time()
                console.log(this.props.request)
            }else{

            }
    }
    //componentWillUnmount(){
    //     console.log('我要死了')
     //}

    time=()=>{
        let times=setInterval(()=>{
            let {oldtoken}=this.state
            let token=localStorage.getItem('token')
            let _id=localStorage.getItem('id')
            //console.log(token,_id)
                this.$axios.get(`/hehe/admin/findus/finduser?_id=${_id}`)
                .then((data)=>{
                console.log('请求回来的数据',data)
                if(data.data.err===0){
                    this.setState({oldtoken:data.data.list[0].token})
                    console.log('数据库的token',this.state.oldtoken,"本地的token",token)
                    if(token!=this.state.oldtoken){
                        //clearInterval()
                        //this.props.changeModelState()
                        clearInterval(times)
                        this.setState()
                        message.success('此账户在别处登录了')
                        this.props.history.push('/login')  
                       window.location.reload()
                        //clearInterval(times)
                    }
                }
                })
            },3000)
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

