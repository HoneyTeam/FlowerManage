import React,{Component} from 'react'
import { Card ,Button, message} from 'antd'
import qs from 'qs'
import './index.less'
class GoodAdd extends Component{
    constructor(){
        super()
        this.state={item:'',img:''}
     }
     submit=()=>{//提交的时候发起ajax请求
        let {item,img} = this.state
        if(img!==''){
            let string = qs.stringify({item,img})
            this.$axios.get('http://10.9.22.239:8080/admin/goods/add?'+string)
            .then((data)=>{
            console.log(data)
            if(data.data.err===0){
                message.success('添加成功！')
            }
            })
        }else{
            message.error('请先上传图片')
        }
        
        
      }
     upload=()=>{
         let img = this.refs.img.files[0]
         let formdate=new FormData()
         formdate.append('img',img)
         this.$axios.post('http://10.9.22.239:8080/admin/file/upload',formdate)
         .then((data)=>{
            console.log(data)
            if(data.data.err===0){
                this.setState({img:data.data.imgpath})
            }
         })
     }
    render(){
        let {item,img} = this.state
        let rootpath='http://10.9.22.239:8080'
        return(
            <Card title='商品分类添加' className='addModel'>
            <span>分类:</span><input type="text" value={item} onChange={(e)=>{
               this.setState({item:e.target.value})
            }}/><br/>
            <input type="file" ref='img'/><br/>
            <span>缩略图:</span><br/>
            <button onClick={this.upload}>上传</button>
            <img src={rootpath+img} withd='80' height='80' alt=""/>
            <hr/>          
            <Button type='primay' onClick={this.submit}>提交</Button>
        </Card>
        )
    }
}
export default GoodAdd