import React,{Component} from 'react'

import {Form,Icon,Input,Button,Card,message} from 'antd'
import ReconnectingWebSocket from "reconnecting-websocket";
// import { subscribeToTimer } from '../../api/subscribeToTimer';
import Store from 'store/store'
import ActionCreator from 'store/actionCreator'
import './index.less'
class Login extends Component {
    constructor(){
        super()
        this.state={
            us:"",
            jurisdiction:"",
            token:"",
            id:""
        }
    }
    login=()=>{
        console.log('a')
        
        this.props.form.validateFields((err,data)=>{
            console.log('aaaaaa',err,data)
            console.log('查看props权限',this.props)
            if(err){
                message.error('输入信息有误请重试')
            }else{
                this.$axios.get(`/hehe/admin/user/login?us=${data.us}&ps=${data.ps}`)  //通过姓名和密码查询数据库里是否有这个用户
                .then((data)=>{
                     console.log(data.data)
                    if(data.data.err==0){
                        console.log(data.data)
                        this.setState({us:data.data.list[0].us,jurisdiction:data.data.list[0].jurisdiction,id:data.data.list[0]._id})
                        localStorage.setItem('us',this.state.us)  
                        localStorage.setItem('jurisdiction',this.state.jurisdiction) 
                        localStorage.setItem('id',this.state.id) 
                        console.log("用户名",this.state.us,this.state.id)
                        let _id=data.data.list[0]._id
                        //console.log(_id)
                        this.$axios.get(`/hehe/admin/user/loginadd?_id=${_id}`) //如果有这个用户,就向这个用户添加token
                        .then((data)=>{
                            //console.log(data)
                            if(data.data.err==0){  
                                this.setState({token:data.data.token})
                                localStorage.setItem('token',this.state.token) 
                                message.success('登录ok1s后跳转到首页',1,()=>{
                                    this.props.history.push('/admin/home')
                                })
                            }else{
                                message.error('内部错误请重试')
                            }
                        })
                    }else{
                        message.error('密码账号不正确请重新输入')
                    }
                })
            }
        })
    }
    componentDidUpdate(){
        // localStorage.setItem('request','false') 
        Store.dispatch(ActionCreator.changeRequest1())
        // console.log("opop",this.props.request)
    }
    render(){
        const{getFieldDecorator} =this.props.form;
        return (
            <Card className='login'>
                <Form.Item>
                    {getFieldDecorator('us',{
                        rules:[{required:true,message:'不能为空'}]
                    })(
                        <Input
                         prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                         placeholder="passworld"
                       />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('ps',{
                        rules:[{required:true,message:'不能为空'}]
                    })(
                        <Input
                         prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                         placeholder="passworld"
                       />
                    )}
                </Form.Item>
                <Form.Item>
                    <a className="login-form-forgot" href="">
                        忘记密码?
                    </a>
                    <Button type="primary" 
                        onClick={this.login}
                        htmlType="submit" className="login-form-button" >
                            Log in
                    </Button>
                   <a href="">register now!</a>
                </Form.Item> 
            </Card>
        )
    }
}
export default Form.create()(Login)