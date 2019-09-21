import React,{Component} from 'react';
import { Card,Table,Popconfirm,Button,message} from 'antd';
import {withRouter} from 'react-router-dom'
import qs from 'qs'
import './index.less'
import GoodXqAdd from '../GoodXqAdd'
class GoodXq extends Component{
    constructor(props){
        super(props)
        // this.state=this.props.record2.list
        this.state={
            list:this.props.record2.list,
            xqAdd:false,
            id:this.props.record2._id
        }
    }
    columns=[
        {
          title: '图片',
          dataIndex: 'img',
          key: 'img',
          width:200,
          render(data){
            console.log(data)
            let rootPath='http://10.9.22.239:8080'
            return(<img width='100' height='100' src={rootPath+data} alt=''/>)
          }
        },
        {
            title: '花语',
            dataIndex: 'desc',
            key: 'desc',
            width:100
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            width:100
        },
        {
            title: '材料',
            dataIndex: 'make',
            key: 'make',
            width:100
          },
        {
          title:'操作',
          dataIndex:'action',
          key:'action',
          width:300,
          // fixed:'right',
          render:(txt,record)=>{
            console.log(record)
            return(
              <div>
                <Button className='btn' onClick={this.updatelist.bind(this,record.img,this.state.id)}>修改</Button>
                <Popconfirm 
                  title='你确定要删除吗？'
                  onConfirm={this.del.bind(this,record.img,this.state.id)}
                >
                  <Button className='btn' >删除</Button>
                </Popconfirm>
                
              </div>
            )
          }
        }
      ];
      updatelist=(img,_id)=>{
        console.log(img,_id)
        window.sessionStorage.setItem('img',img)
        window.sessionStorage.setItem('_id',_id)
        this.props.history.push({pathname:'/admin/goods/goodxqlist'})
      }
      del=(img,_id)=>{
        console.log(img)
        let string=qs.stringify({img,_id})
        console.log(string)
        this.$axios.get('http://10.9.22.239:8080/admin/goods/dellist?'+string)
        .then((data)=>{
            console.log(data)
          if(data.data.err===0){
            message.success('删除ok')
            this.props.initdata()
            this.setState({list:this.props.record2.list})
          }else{
            message.error('删除失败请重试')
          }
        })
      }
      close=()=>{
          this.props.close2()
      }
     
      add=()=>{
        this.setState({xqAdd:!this.state.xqAdd})
    
      }
      dismiss=()=>{
          // this.state.xqAdd=false
          this.setState({xqAdd:false})
      }
      updatexq=()=>{
        this.props.initdata()
        // this.setState({list:this.props.record2.list})
      }
    render(){
        console.log(this.props)
        console.log("详情列表",this.props.record2.list)
        let {list,xqAdd,id} = this.state
        return(
        <Card className='xq'>
        {!xqAdd||<GoodXqAdd info={id} back={this.dismiss} updatexq={this.updatexq}></GoodXqAdd>}
        <Button className='btn' onClick={this.close}>返回</Button>
        <Button className='btn' onClick={this.add}>添加商品</Button>
         <Table dataSource={list} 
                // className='test'
                columns={this.columns} 
                scroll={{x:1100 ,y:600}}
                pagination={false}
         />   
       </Card>
            
        )   
        }     
    }    
export default withRouter(GoodXq)