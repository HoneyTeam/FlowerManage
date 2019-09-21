import React,{Component} from 'react'
import {Card,Table,Button,Pagination,Spin,Popconfirm, message}from 'antd'

import UserUpdate from '../UserUpdate'
import './index.less'
class Login extends Component {
    constructor(){
        super()
        this.state={
            dataSource:[],
            page:1,
            pageSize:3,
            total:0,
            record:{},
            loading:false,//加载动画
            updateShow:false
        }
    }
    columns=[
        {
            title:'用户名',
            dataIndex:'username',
            key:'username',
            width:150,
        },
        {
            title:'电话',
            dataIndex:'userpho',
            key:'userpho',
            width:150,
        },
        {
            title:'头像',
            dataIndex:'userimg',
            key:'userimg',
            width:150,
            render(data){
                let url='http://10.9.22.239:8080'
                return (<img width='80' height='80' src={url+=data}/>)
            }
        },
        {
            title:'操作',
            dataIndex:'action',
            key:'action',
            width:200,
            render:(txt,record)=>{
                return (
                    <div>
                        <Button onClick={this.jump.bind(this,record._id)}>订单</Button>
                        <Popconfirm title='你确定要删除么' onConfirm={this.userderl.bind(this,record._id)}>
                        <Button>删除</Button>
                        </Popconfirm>
                        <Button onClick={this.updateuser.bind(this,record)}>修改</Button>
                    </div>
                )
            }
        }
    ]
    jump=(id)=>{
        console.log(id)
        sessionStorage.setItem('_id',id)
        this.props.history.push('/admin/user/orderlist')
    }
    updateuser=(record)=>{//点击修改 显示模态框
       this.setState({updateShow:!this.state.updateShow,record:record})
    }
    refresh=()=>{//关闭模态框
        this.setState({updateShow:false})
        this.initData(this.state.page,this.state.pageSize)
    }
    userderl=(id)=>{//点击删除
        console.log(id)
        let {page,pageSize}=this.state
        this.$axios.get('/hehe/admin/Fuser/del?_id='+id)
        .then((data)=>{
            console.log(data)
            if(data.data.err===0){
                message.success('删除ok')
                this.initData(page,pageSize)
            }else{
                message.success('删除数据失败')
            }
        })
    }
    pageChange=(page,pageSize)=>{//点击分页
        console.log('页面改变',page,pageSize)
        this.setState({page:page})
        this.initData(page,this.state.pageSize)
    }
    initData=(page,pageSize)=>{//请求数据
        this.setState({loading:true})
        this.$axios.get(`/hehe/admin/Fuser/findByTypePage?page=${page}&pageSize=${pageSize}`)
        .then((data)=>{
            console.log(data.data)
            this.setState({dataSource:data.data.list,total:data.data.total,loading:false})
            console.log(this.state.dataSource)
        })
    }
    componentDidMount(){
        let {page,pageSize}=this.state
        console.log(page,pageSize)
        this.initData(page,pageSize)
    }
    render(){
        let {total,pageSize,page,loading,record,updateShow}=this.state
        return (
           <Card>
               <Spin tip='数据加载中ing' spinning={loading}>
                    {!updateShow||<UserUpdate record={record} refreshfun={this.refresh}></UserUpdate>}
                    <Table dataSource={this.state.dataSource} columns={this.columns} 
                    expandIconAsCell={false} expandIconColumnIndex={-1} scroll={{y:400,x:1100}}
                    pagination={false}/>

                            <Pagination size="small" total={total} defaultCurrent={page} 
                            defaultPageSize={pageSize} onChange={this.pageChange}
                            showSizeChanger showQuickJumper />      
               </Spin>
           </Card>
        )
    }
}
export default Login