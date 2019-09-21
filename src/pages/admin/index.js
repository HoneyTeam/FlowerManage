import React,{Component} from 'react'

import  './index.less'

import LeftNav from 'components/leftNav'
class Admin extends Component{
   // constructor (){
   //    super()
   //    this.state={
   //       oldtoken:''
   //    }
   // }
   // componentDidMount(){
      // const ws=new WebSocket('ws://localhost:8080/')
         // ws.onopen=()=>{
         //     console.log('服务器连接')
         //     let msg="你好"
         //     ws.send(msg)
         // }
         // ws.onmessage=(msg)=>{//监听事件
         //     console.log('服务器发送消息')
         //    //  alert(msg.data)//弹窗提示
         //     //console.log(msg.data)
            
         // }
         // ws.onclose=()=>{
         //     console.log('服务器断开连接')
         // }
      //    sendMsg=()=>{//前端发送消息给后台
      //       let msg="你好"
      //       ws.send(msg)
      //   }

      // setInterval(()=>{
      //    let {oldtoken}=this.state
      //     let token=localStorage.getItem('token')
      //       let _id=localStorage.getItem('id')
      //    //console.log(token,_id)
      //    this.$axios.get(`/hehe/admin/user/finduser?_id=${_id}`)
      //    .then((data)=>{
      //       console.log(data)
      //       this.setState({oldtoken:data.data.list[0].token})
      //       console.log('老的id',this.state.oldtoken)
      //       if(token!=oldtoken){
      //          this.clerd()
      //       }
      //    })
      // },5000)
      
   // }
   
  render(props){
    return(
       <div className='admin'>
          <div className='admin-left'>
            <LeftNav></LeftNav>
          </div>
          <div className='admin-right'>
             <div className='admin-right-top'>top</div>
             <div className='admin-right-center'>
                {this.props.children}
             </div>
             <div className='admin-right-footer'>bottom</div>
          </div>
       </div>
    )
  }
}
 export default  Admin
