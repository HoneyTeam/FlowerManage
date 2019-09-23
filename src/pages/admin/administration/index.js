import React,{Component} from 'react'
import {Card,Table,Button,Pagination,Spin,Popconfirm, message}from 'antd'
import './index.less'
class Administration extends Component {
    constructor(){
        super()
        this.state={
            dataSource:[],
            total:0,
            record:{},
            loading:false,//加载动画
            updateShow:false
        }
    }
    columns=[
        {
            title:'用户名',
            dataIndex:'us',
            key:'us',
        },
        {
            title:'权限',
            dataIndex:'jurisdiction',
            key:'jurisdiction',
        },
        {
            title:'操作',
            dataIndex:'action',
            key:'action',
            width:200
        }
    ]
    jump=(id)=>{
        console.log(id)
        sessionStorage.setItem('_id',id)
        this.props.history.push('/admin/user/orderlist')
    }
    refresh=()=>{//关闭模态框
        this.setState({updateShow:false})
        this.initData(this.state.page,this.state.pageSize)
    }
    initData=()=>{//请求数据
        let jurisdiction=localStorage.getItem('jurisdiction')
        this.setState({loading:true})
        if(jurisdiction=='super'){
            this.$axios.get(`/hehe/admin/findus/findwhole?`)
            .then((data)=>{
                console.log(data.data)
                this.setState({dataSource:data.data.list,loading:false})
                console.log(this.state.dataSource)
            })
        }else{
            message.success('你没有此权限查看')
        }
        
    }
    componentDidMount(){
        this.initData()
        
    }
    render(){
        let {total,pageSize,page,loading,record,updateShow}=this.state
        return (
           <Card>
               <Spin tip='数据加载中ing' spinning={loading}>
                    <Table dataSource={this.state.dataSource} columns={this.columns} 
                    expandIconAsCell={false} expandIconColumnIndex={-1} scroll={{y:400,x:1100}}
                    pagination={false}/>    
               </Spin>
           </Card>
        )
    }
}
export default Administration