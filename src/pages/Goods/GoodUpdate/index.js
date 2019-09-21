import React,{Component} from 'react';
import { Card} from 'antd';
import './index.less'
import qs from 'qs'
class GoodUpdate extends Component{
    constructor(props){
        super(props)
        this.state=props.record
    }
    submit=()=>{//提交的时候发起ajax请求
      let {_id,item,img} = this.state
      let string = qs.stringify({_id,item,img})
      // console.log('提交',img)
      this.$axios.get('http://10.9.22.239:8080/admin/goods/updateitem?'+string)
      .then((data)=>{
        // console.log(data)
        this.props.close()
      })    
    }
    upload=()=>{
      // console.log('图片图片',this.refs.img.files[0])
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
    close=()=>{
      this.props.close()
    }
    render(){
      let rootPath='http://10.9.22.239:8080'
      // console.log('更新组件',this)
      let {item,img}=this.state
      // console.log('等你发挥法定蓝卡队佛',img)
        return(
          <div className='updateModel'>
            <Card className='card'>
              <input type="text" value={item} onChange={(e)=>{
                this.setState({item:e.target.value})
              }}/>  
              <img src={rootPath+img} alt=""/>
              <input type="file" ref='img'/>
              <button onClick={this.upload}>上传</button>
              <button onClick={this.submit}>修改</button>
              <button onClick={this.close}>取消</button>            
            </Card>
          </div>
        
            
        )   
        }
       
        
    }    
export default GoodUpdate