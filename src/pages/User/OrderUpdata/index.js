import React,{Component} from 'react'
import {Card,Button,Form,Input,Select} from 'antd'
import './index.less'
import qs from 'qs'
const { Option } = Select;
class OrderUpdata extends Component{
    constructor(props){
        super(props)
        this.state=props.record
    } 
    change=()=>{ //点击修改  
       let {order,name,address,pho,desc,express,ostatus}=this.state
       let _id=sessionStorage.getItem('_id')
       console.log(order,name,address,pho,desc,express,ostatus, _id)
        let string=qs.stringify({order,name,address,pho,desc,express,ostatus, _id})
        console.log(string)
        this.$axios.get('/hehe/admin/Fuser/updateorder?'+string)
        .then((data)=>{
            //console.log(data)
            this.props.refreshfun()
        })
    }
    render(){
        let url='http://10.9.22.239:8080'
        let {Fname,price,num,name,address,pho,desc,express,ostatus}=this.state
        return (
            <div className="orderupdata">
                <Card className='card'>
                <Form labelCol={{ span:6 }} wrapperCol={{ span: 15 }} onSubmit={this.handleSubmit} column={2}>
                    <Form.Item required={true} label="代表不可以修改" >
                    </Form.Item>
                    <Form.Item required={true} label="商品名" >
                    <Input value={Fname}/>
                    </Form.Item>
                    <Form.Item required={true} label="金额">
                    <Input value={price}/>
                    </Form.Item>
                    <Form.Item label="收货人姓名">
                    <Input value={name} onChange={(e)=>{
                        this.setState({name:e.target.value})
                    }}/>
                    </Form.Item>
                    <Form.Item label="收货地址">
                    <Input value={address} onChange={(e)=>{
                        this.setState({address:e.target.value})
                    }}/>
                    </Form.Item>
                    <Form.Item label="收货人电话">
                    <Input value={pho} onChange={(e)=>{
                        this.setState({pho:e.target.value})
                    }}/>
                    </Form.Item>
                    <Form.Item label="备注">
                    <Input value={desc} onChange={(e)=>{
                        this.setState({desc:e.target.value})
                    }}/>
                    </Form.Item>
                    <Form.Item label="快递">
                    <Input value={express} onChange={(e)=>{
                        this.setState({express:e.target.value})
                    }}/>
                    </Form.Item>
                    <Form.Item label="状态">
                        <select value={ostatus} ref="ostatus" onChange={(e)=>{
                            this.setState({ostatus:e.target.value})
                        }}>
                            <option value="发货">发货</option>
                            <option value="未发货">未发货</option>
                            <option value="退款">退款</option>
                        </select>
                    </Form.Item>
                 <Button onClick={this.change}>修改</Button>
                </Form>    
                </Card>
                
            </div>
        )
    }
}
export default OrderUpdata