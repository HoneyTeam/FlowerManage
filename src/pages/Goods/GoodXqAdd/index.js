import React,{Component} from 'react'
import { Card ,Button, message} from 'antd'
import qs from 'qs'
import './index.less'
class GoodXqAdd extends Component{
    constructor(){
        super()
        this.state={
            desc:'',
            img:'',
            make:'',
            price:'',
            // _id:this.props.info
        }
     }
     submit=()=>{//提交的时候发起ajax请求
        let {desc,img,price,make} = this.state
        let _id=this.props.info
        if(img!==''){
            let string = qs.stringify({_id,desc,img,price,make})
            this.$axios.get('http://10.9.22.239:8080/admin/goods/updateone?'+string)
            .then((data)=>{
            console.log(data)
            if(data.data.err===0){
                message.success('添加成功！')
                this.setState({desc,img,price,make})
                // this.props.updatexq()
                this.props.back()
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
     close=()=>{
         this.props.back()
     }
    render(){
        console.log("商品信息信息信息",this.props)
        let {desc,img,price,make} = this.state
        let rootpath='http://10.9.22.239:8080'
        return(
            <div className='xqadd'>
                <Card title='商品添加' className='card3'>
                    <span>花语:</span><input type="text" value={desc} onChange={(e)=>{
                    this.setState({desc:e.target.value})
                    }}/><br/>
                    <span>价格:</span><input type="text" value={price} onChange={(e)=>{
                    this.setState({price:e.target.value})
                    }}/><br/>
                    <span>材料:</span><input type="text" value={make} onChange={(e)=>{
                    this.setState({make:e.target.value})
                    }}/><br/>
                    <input type="file" ref='img'/><br/>
                    <span>缩略图:</span><br/>
                    <button onClick={this.upload}>上传</button>
                    <img src={rootpath+img} withd='80' height='80' alt=""/>
                    <hr/>          
                    <Button type='primay' onClick={this.submit}>添加</Button>
                    <Button type='primay' onClick={this.close}>取消</Button>
                </Card>
            </div>
           
        )
    }
}
export default GoodXqAdd