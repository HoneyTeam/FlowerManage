import React,{Component} from 'react'
import {Card,Table,Button ,Spin,Pagination,Popconfirm,message,Select} from 'antd'
import './index.less'
const { Option } = Select;
class Allorder extends Component{
    constructor(){
        super()
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            info:[],
            loading:false//数据加载动画
          };
        
    }
   columns = [
        {
            title: '订单编号',
            dataIndex: 'order',
            key: 'order',
            width:150,
            fixed:'left',
            filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
            // sorter: (a, b) => a.name.length - b.name.length,  //排序
            // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        },
        {
            title: '商品名称',
            dataIndex: 'Fname',
            key: 'Fname',
            width:150,
            fixed:'left',
            // sorter: (a, b) => a.age - b.age,
            // sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        },
        {
            title: '金额',
            dataIndex: 'price',
            key: 'price',
            width:150,
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
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
            title: '数量',
            dataIndex: 'num',
            key: 'num',
            width:150,
        },
        {
            title: '收货人姓名',
            dataIndex: 'name',
            key: 'name',
            width:150,
        },
        {
            title: '收货地址',
            dataIndex: 'address',
            key: 'address',
            width:150,
        },
        {
            title: '收货人电话',
            dataIndex: 'pho',
            key: 'pho',
            width:150,
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
        },
        {
            title:'快递',
            dataIndex: 'express',
            key: 'express',
            width:150,
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
        },
        {
            title: '状态',
            dataIndex: 'ostatus',
            key: 'ostatus',
            width:200,
            filters: [{ text: '已发货', value: '已发货' }, { text: '未发货', value: '未发货' },
                        { text: '退款', value: '退款' },{ text: '收货', value: '收货' }],
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
        },
        {
            title:'操作',
            dataIndex:'actions',
            key:'actions',
            width:200,
            fixed:'right',
            render:(txt,data)=>{
                let {ostatus,order}=data
                //console.log('数据输出data',data)
                return (
                    <div>
                        <Select defaultValue="修改状态" onChange={this.change.bind(this,order,ostatus)}>
                            <Option value="发货">发货</Option>
                            <Option value="未发货">未发货</Option>
                            <Option value="退款">退款</Option>
                        </Select>
                        <Button onClick={this.delorder.bind(this,order)}>删除</Button>
                    </div>
                )
            }
        }
        ];
    delorder=(order)=>{//删除数据
        this.$axios.get(`/hehe/admin/Fuser/findnumber?order=${order}`)
        .then((data)=>{
            console.log(data.data.list._id)
            let _id=data.data.list._id
            this.$axios.get(`/hehe/admin/Fuser/delorder?_id=${_id}&order=${order}`)
            .then((data)=>{
                console.log(data)
                this.initData()
            })
        })
    }
    change=(order,old,ostatus)=>{  //修改状态  order:订单编号 old:没改变之前的状态值 ostatus:改变之后的状态值
        console.log(order,old,ostatus)
        if(ostatus!=old){
            this.$axios.get(`/hehe/admin/Fuser/findnumber?order=${order}`)
            .then((data)=>{
                console.log('修改状态的数据',data)
                console.log('第一请求的数据',data.data.list._id)
                let _id=data.data.list._id
                this.$axios.get(`/hehe/admin/Fuser/updateostatus?order=${order}&_id=${_id}&ostatus=${ostatus}`)
                .then((data)=>{
                    console.log('修改返回的数据',data)
                    this.initData()
                })
            })
        }else{
            console.log('没有改变')
        }
    }
    initData(){
        let a=[]
        this.setState({loading:true})
        this.$axios.get('/hehe/admin/Fuser/findByTypePage?')
        .then((data)=>{
            if(data.data.err!=-997 && data.data.err!=-998){
                console.log('请求的数据',data)
                for(let i=0;i<data.data.list.length;i++){
                    //console.log(data.data.list.length)
                    if(data.data.list[i].children.length>=0){
                        for(let n=0;n<data.data.list[i].children.length;n++){
                            // console.log('数组hgsdkgjgj',data.data.list[i].children)
                            a.push(data.data.list[i].children[n])
                            this.setState({info:a,loading:false})
                    // console.log(this.state.info)
                        }
                    }
            }
            return this.state.info
            }
        })
        // 
    }

    componentDidMount(){
        this.initData()
        console.log('数据',this.state.info[0])
    }
        handleChange = (pagination, filters, sorter) => {
            console.log('Various parameters', pagination, filters, sorter);
            this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
            });
        };

        clearFilters = () => {
            this.setState({ filteredInfo: null });
        };

        clearAll = () => {
            this.setState({
            filteredInfo: null,
            sortedInfo: null,
            });
        };

        setAgeSort = () => {
            this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
            });
        };

        render() {
            // this.setState(info)
            let { sortedInfo, filteredInfo,info,loading} = this.state;
            sortedInfo = sortedInfo || {};
            filteredInfo = filteredInfo || {};
            return (

            <Card className="orderlist">
                <Spin tip='数据加载中' spinning={loading}>
                    <Table className="table" columns={this.columns} dataSource={info} scroll={{y:450,x:1750}}/>
                </Spin>
            </Card>
            );
        }    
    }
export default Allorder