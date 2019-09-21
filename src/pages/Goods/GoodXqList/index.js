import React,{Component} from 'react';
import { Card, message} from 'antd';
import {withRouter} from 'react-router-dom'
import './index.less'
import qs from 'qs'
class GoodXqList extends Component{
    constructor(){
        super()
        this.state={
            desc:'',
            price:'',
            make:'',
            img:'',
        }
    }
    submit=()=>{//提交的时候发起ajax请求
    let imgold=window.sessionStorage.getItem('img')
    let _id=window.sessionStorage.getItem('_id')
      console.log('图片和id',imgold,_id)
      let {desc,img,make,price} = this.state
      let string = qs.stringify({_id,desc,imgold,img,make,price})
      console.log('提交',string)
      this.$axios.get('http://10.9.22.239:8080/admin/goods/updatelist?'+string)
      .then((data)=>{
        console.log(data)
        // this.props.close()
        // this.props.history.back()
        message.success('修改成功')
      })    
    }
    upload=()=>{
      let img=this.refs.img.files[0]
      let formdata=new FormData()
      formdata.append('img',img)
      this.$axios.post('http://10.9.22.239:8080/admin/file/upload',formdata)
      .then((data)=>{
        // console.log(data.data.err)
        // console.log(data.data.imgpath)
        if(data.data.err===0){
          this.setState({img:data.data.imgpath})
          console.log('图片路径',this.state.img)
        }
      })
    }
 
    render(){
      let rootPath='http://10.9.22.239:8080'
    //   // console.log('更新组件',this)
      let {desc,img,price,make}=this.state
      // console.log('等你发挥法定蓝卡队佛',img)
        return(
          <div className='goodxqlist'>
            <Card className='card'>
              <span>花语：</span><input type="text" value={desc} onChange={(e)=>{
                this.setState({desc:e.target.value})
              }}/> <br/>
              <span>价格：</span><input type="text" value={price} onChange={(e)=>{
                this.setState({price:e.target.value})
              }}/><br/>
              <span>材料：</span><input type="text" value={make} onChange={(e)=>{
                this.setState({make:e.target.value})
              }}/> <br/>
              <span>缩略图：</span><img width='100' src={rootPath+img} alt=""/>
              <input type="file" ref='img'/><br/>
              <button onClick={this.upload}>上传</button>
              <button onClick={this.submit}>修改</button>            
            </Card>
          </div>
        
            
        )   
        }
       
        
    }    
export default withRouter(GoodXqList)