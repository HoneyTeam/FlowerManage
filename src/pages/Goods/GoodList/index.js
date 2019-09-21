import React,{Component} from 'react';
import { Card,Table,Popconfirm,Button,message,Spin} from 'antd';
import GoodUpdate from '../GoodUpdate'
import GoodXq from '../GoodXq'
import './index.less'
class GoodList extends Component{
    constructor(){
        super()
        this.state={
            list:[],
            current: 'mail',
            updateShow:false,
            goodXq:false,
            record:{},
            loading:false,//加载动画

            // input:'搜索关键字'
        }
    }
    columns=[
        {
          title: '分类',
          dataIndex: 'item',
          key: 'item',
          width:100
        },
        {
          title: '图片',
          dataIndex: 'img',
          key: 'img',
          width:200,
          render(data){
            // console.log(data)
            let rootPath='http://10.9.22.239:8080'
            return(<img width='100' height='100' src={rootPath+data} alt=''/>)
          }
        },
        {
          title:'操作',
          dataIndex:'action',
          key:'action',
          width:300,
          // fixed:'right',
          render:(txt,record)=>{
            console.log('删除后的record',record)
            return(
              <div>
                <Button  className='btn'  onClick={this.enter.bind(this,record)}>详情</Button>
                <Button  className='btn'  onClick={this.update.bind(this,record)}>修改</Button>
                <Popconfirm 
                  title='你确定要删除吗？'
                  onConfirm={this.confirmDel.bind(this,record._id)}
                >
                  <Button className='btn'>删除</Button>
                </Popconfirm>
                
              </div>
            )
          }
        }
      ];
      enter=(record)=>{  
        this.setState({goodXq:!this.state.goodXq,record:record})
        console.log('enter后的record',this.state.record)
      }
      update=(record)=>{
        this.setState({updateShow:!this.state.updateShow,record:record})
      }
      confirmDel=(id)=>{
        // console.log('删除',id)
        this.$axios.get('http://10.9.22.239:8080/admin/goods/del?_id='+id)
        .then((data)=>{
            // console.log(data)
          if(data.data.err===0){
            message.success('删除ok')
            this.initData()
          }else{
            message.error('删除失败请重试')
          }
        })
      }
      close=()=>{
          this.setState({updateShow:false})
          this.initData()
      }
      close2=()=>{
        this.setState({goodXq:false})
        this.initData()
    }
    init=()=>{
      // this.initData()
      this.$axios.get("http://10.9.22.239:8080/admin/goods/find")
      .then((data)=>{
          // console.log(data)
        if(data.data.err === 0){
            // console.log('aaa')
          this.setState({list:data.data.list})
          console.log("刷新以后的list",this.state.list)
        }
      })
      // console.log('详情删除后的this。state.list',this.state.list)
    }
    // search=()=>{
    //   this.findkw()
    // }
    findkw=()=>{
      let kw=this.state.input
      console.log('关键字',kw)
      this.$axios.get("http://10.9.22.239:8080/admin/goods/findkw?kw="+kw)
        .then((data)=>{
            console.log('关键字查询',data)
          if(data.data.err === 0){
              // console.log('aaa')
            this.setState({list:data.data.list})
            // console.log("刷新以后的list",this.state.list)
          }
        })      
    }
    initData(){
        // this.setState({loading:true})
        this.setState({loading:true})
        this.$axios.get("/hehe/admin/goods/find?")
        .then((data)=>{
            // console.log(data)
          if(data.data.err === 0){
              // console.log('aaa')
            this.setState({list:data.data.list,loading:false})
            console.log("刷新以后的list",this.state.list)
          }
        })       
    }
    componentDidMount(){
        this.initData()
    }
    render(){
        let {updateShow,record,goodXq,input,loading} = this.state
        return(
        <Card>
          <Spin tip='数据加载中ing' spinning={loading}>
        <input type="text" value={input} onChange={(e)=>{
          this.setState({input:e.target.value})}}/>
        <button onClick={this.findkw}>搜索</button>
        {!goodXq||<GoodXq record2={record} close2={this.close2} initdata={this.init}></GoodXq>}
        {!updateShow||<GoodUpdate record={record} close={this.close}></GoodUpdate>}
         <Table dataSource={this.state.list} 
                className='test'
                columns={this.columns} 
                scroll={{x:1100 ,y:400}}
                pagination={false}
         />
          </Spin>
       </Card>
            
        )   
        }
       
        
    }    
export default GoodList