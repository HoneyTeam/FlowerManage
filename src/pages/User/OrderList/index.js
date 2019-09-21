import React,{Component} from 'react'
import { PageHeader, Menu,Tag, Button, Statistic, Descriptions, Row,Card,Table,Select} from 'antd';
import OrderUpdata from '../OrderUpdata'
import './index.less'
const { Option } = Select;
class OrderList extends Component{
    constructor(props,state){
        super(props,state)
        console.log('打印props',props,state)
        this.state={
            dataorder:[],
            data:[],
            page:1,
            pagesize:4,
            total:0,
            loading:false,
            updataShow:false,
            record:{}
        }
        
    }
    
    
    columns=[
        {
            title:'商品名',
            dataIndex:'Fname',
            key:'Fname',
            width:150,
            fixed:'left'
        },
        {
            title:'订单编号',
            dataIndex:'order',
            key:'order',
            width:150,
            fixed:'left'
        },
        {
            title:'金额',
            dataIndex:'price',
            key:'price',
            width:150,
        },
        {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            width:200,
            render(data){
                let url='http://10.9.22.239:8080'
                return (<img width='80' height='80' src={url+=data}/>)
            }
        },
        {
            title:'数量',
            dataIndex:'num',
            key:'num',
            width:150,
        },
        {
            title:'收货人姓名',
            dataIndex:'name',
            key:'name',
            width:150,
        },
        {
            title:'收货地址',
            dataIndex:'address',
            key:'address',
            width:150,
        },
        {
            title:'收货人电话',
            dataIndex:'pho',
            key:'pho',
            width:150,
        },
        {
            title:'备注',
            dataIndex:'desc',
            key:'desc',
            width:150,
        },
        {
            title:'快递',
            dataIndex:'express',
            key:'express',
            width:150,
        },
        {
            title:'状态',
            dataIndex:'ostatus',
            key:'ostatus',
            width:150,
        },
        {
            title:'操作',
            width:200,
            dataIndex:'antions',
            key:'antions',
            fixed:'right',
            render:(txt,record)=>{
                // console.log('shuju',record)
                // let {ostatus,order}=record
                // console.log('aaaaaaaaaaaa',ostatus,order)
                return (
                    <div>
                        {/* <Select defaultValue={ostatus} onChange={this.change.bind(this,order)}>
                            <Option value="发货">发货</Option>
                            <Option value="未发货">未发货</Option>
                            <Option value="退款">退款</Option>
                        </Select> */}
                    <Button onClick={this.change.bind(this,record)}>修改</Button>
                    </div>
                    
                )
            }
        }
    ];
    //change=(a,value)=>{
        //console.log(a,value)
        // let order=id
        // // let {state}=data
        // console.log(ostatus,order)

        // //this.$axios(`/hehe/admin/Fuser/updateorder?order=${order}`)
    //}
    change=(record)=>{//点击修改显示模态框
        console.log(record)
        this.setState({updataShow:!this.state.updataShow,record:record})

    }
    refresh=()=>{//关闭模态框
        this.setState({updataShow:false})
        this.initData()
    }
    initData(){ //数据请求
        let _id=sessionStorage.getItem('_id')
        console.log(_id)
        this.setState({loading:true})
        this.$axios.get('/hehe/admin/Fuser/findorder?_id='+_id)
        .then((data)=>{
            console.log(data.data)
            this.setState({dataorder:data.data.list[0],loading:false})
            console.log('数据输出',this.state.dataorder.children)
            this.setState({data:this.state.dataorder.children})
            console.log(this.state.data)
           
        })
    }
    Subclass=(data)=>{
        this.state.data=data.children
        let info=JSON.stringify(this.state.data.length)
        console.log('数据遍历',info)
        if(!data.children.length) {return '暂无数据'}
        return data.children.map((item)=>{
            return (
                <Table data={item} columns={this.columns} 
                    expandIconAsCell={false} expandIconColumnIndex={-1} scroll={{y:300,x:1500}}
                    pagination={false}/>
            )
        })
    }
    componentDidMount(){
        this.initData()
    }
    render(){
        let {username,userpho}=this.state.dataorder
        let {updataShow,record}=this.state
        console.log(updataShow)
        return (
            <Card className='card'>

                 <PageHeader
                    onBack={() => window.history.back()}
                    title='用户信息'
                    >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="姓名">{username}</Descriptions.Item>
                        <Descriptions.Item label="联系电话">
                        <a>{userpho}</a>
                        </Descriptions.Item>
                        <Descriptions.Item label="备注">无
                        </Descriptions.Item>
                    </Descriptions>
                    
                    </PageHeader>
                    <br />
                    <h2>订单信息</h2>
                    <Menu  theme='dark'>
                        {/* {this.Subclass(this.state.dataorder)} */}
                        {!updataShow||<OrderUpdata record={record} refreshfun={this.refresh}></OrderUpdata>}
                        <Table dataSource={this.state.data} columns={this.columns} className='tables'
                        expandIconAsCell={false} expandIconColumnIndex={-1} scroll={{ x: 1400, y:200 }} fixed={false}
                        pagination={false}/>
                    </Menu>
                   
            </Card>
        )
    }
}
export default OrderList