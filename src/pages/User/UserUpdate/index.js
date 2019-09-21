import React,{Component} from 'react'
import {Card,Table,Button} from 'antd'
import {Form,Input,Tooltip} from 'antd';
import qs from 'qs'
import './index.less'

class UserUpdate extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state=props.record
        
    }
    upload=()=>{
        let img=this.refs.file.files[0]
        let formdata=new FormData()
        formdata.append('img',img)
        this.$axios.post('/hehe/admin/file/upload',formdata)
        .then((data)=>{
            console.log('传回来的数据',data)
            if(data.data.err===0){
                this.setState({userimg:data.data.imgpath})
                console.log('修改后的图片信息',this.state.userimg)
                
            }
        })
    }
    submit=()=>{//点击修改按钮
        let {_id,username,userpho,userimg,password}=this.state
        let string=qs.stringify({_id,username,userpho,userimg,password})
        console.log('修改后的数据',string)
        this.$axios.get('/hehe/admin/Fuser/update?'+string)
        .then((data)=>{
            console.log(data)
            this.props.refreshfun()
        })


    }
    render(){
        let rootpath='http://10.9.22.239:8080'
        let {username,userpho,userimg,password}=this.state
        console.log('图片信息',userimg)
        return(
            <div className='updateModel'>
                <Card className='card'>
                <Form.Item label="用户名:" >
                    <Input value={username} id="warning" onChange={(e)=>{
                        this.setState({username:e.target.value})
                    }}/>
                </Form.Item>
                <Form.Item label="电话:">
                    <Input value={userpho} id="warning"  onChange={(e)=>{
                        this.setState({userpho:e.target.value})
                    }}/>
                </Form.Item>
                <Form.Item label="密码:">
                    <Input value={password} id="warning"  onChange={(e)=>{
                        this.setState({password:e.target.value})
                    }}/>
                </Form.Item>
                 <span>头像:&nbsp;&nbsp;</span><input type="file" ref='file' ref='file'/>
                 <img src={rootpath+=userimg} alt=""/>
                 <Button type='primay' onClick={this.upload}>上传</Button>
                 <br/><br/>
                 <br/><br/>
                 <br/><br/>
                 <Button onClick={this.submit}>修改</Button> 
                </Card>  
                
            </div>
        )
    }
}
export default UserUpdate