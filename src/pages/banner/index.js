import React,{Component} from "react"
import {Card,Table,Button,Pagination,Spin,Popconfirm, message}from "antd"

class Login extends Component{
    constructor(){
        super()
        this.state={
            dataSource:[],
            page:1,
            pageSize:3,
            total:0,
            loading:true
        }
        // console.log(this.state)
    } 
    columns=[
          {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            render(data){
                let rootpath='http://10.9.22.239:8080'
                return(
                    <img width="80" src={rootpath+data} alt=""/>
                )
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render:(txt,record)=>{
                // console.log("删除数据",a,b)
                return(
                    <div>
                        {/* <Button type="primary" size="small">修改</Button> */}
                        <Popconfirm 
                          title="你确定要删除吗？"
                          onConfirm={this.confirmDel.bind(this,record._id)}
                        >
                          <Button type="danger" size="small">删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
          },
    ];
    confirmDel=(id)=>{
        console.log(id)
        let {page,pageSize}=this.state
        this.$axios.get("http://10.9.22.239:8080/admin/banner/del?_id="+id)
        .then((data)=>{
            // console.log('删除',data)
            if(data.data.err===0){
                message.success("删除成功")
                this.initData(page,pageSize)
            }else{
                message.error("删除失败请重试")
            }
            console.log(this.state)
        })
    }
    pageChange=(page,pageSize)=>{
        console.log("页码改变",page,pageSize)
        this.setState({page:page})
        this.initData(page,this.state.pageSize)
    }
    initData=(page,pageSize)=>{
        this.setState({loading:true})//让每个页数都加在数据框框
        this.$axios.get(`http://10.9.22.239:8080/admin/banner/findByTypePage?page=${page}&pageSize=${pageSize}`)
        .then((data)=>{  //模拟Axios请求
            // console.log(data)
            if(data.data.err===0){
                // console.log('查询total',data.data.total)
                this.setState({dataSource:data.data.list,total:data.data.total,loading:false})
                console.log(this.state.dataSource)
            }
        })
    }
    componentDidMount(){
        let {page,pageSize}=this.state
        this.initData(page,pageSize)
    }
    render(){      
        let {total,pageSize,loading}=this.state
        console.log(total,pageSize)
        return(  
            <Card className="banner-container"> 
            <Spin tip="数据加载ing"
                spinning={loading}  //加载数据的框框
            >
                <Table dataSource={this.state.dataSource} 
                columns={this.columns} 
                pagination={false}
                />    
            </Spin>        
               <Pagination simple defaultCurrent={1} total={total} pageSize={pageSize} onChange={this.pageChange} />
            </Card> 
        )
    }
}
export default Login