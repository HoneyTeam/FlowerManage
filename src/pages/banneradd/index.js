import React,{Component} from "react"
import {Card,Button,message} from "antd"
import "./index.less"
class BannerAdd extends Component{
    constructor(){
        super()
        this.state={img:""}
    }
    upload=()=>{
        let file=this.refs.file.files[0]
        console.log(file)
        let formData=new FormData()
        formData.append("img",file)
        this.$axios.post("http://10.9.22.239:8080/admin/file/upload",formData)
        .then((res)=>{
            console.log(res)
            this.setState({img:res.data.imgpath})
        })
    }
    submit=()=>{
        let {img}=this.state
        console.log({img})
        // let query=qs.stringify({img})
        this.$axios.get("http://10.9.22.239:8080/admin/banner/add?img="+img)
        .then((data)=>{
            if(data.data.err===0){
               message.success("添加ok")
            }
        })
    }
    render(){
        let {img}=this.state
        let rootPath='http://10.9.22.239:8080'
        return(
            <Card title="商品添加">
                <input type="file" ref='file'/><br/>
                <span class="zxj">缩略图:<div></div></span>
                <img width={100} src={rootPath+img} alt=""/><br/>
                <Button type="primay" onClick={this.upload}>上传</Button>
                <Button type="primay" onClick={this.submit}>提交</Button>
            </Card>
        )
    }
}
export default BannerAdd