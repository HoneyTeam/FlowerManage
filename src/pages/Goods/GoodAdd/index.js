// import React,{Component} from "react"
// import {Card,Table}from "antd"
// class Login extends Component{
//     constructor(){
//         super()
//         this.state={
//             dataSource:[]
//         }
//     }
//      columns=[
//         {
//             title: '姓名',
//             dataIndex: 'name',
//             key: 'name',
//         },
//         {
//             title: '年龄',
//             dataIndex: 'age',
//             key: 'age',
//         },
//         {
//             title: '住址',
//             dataIndex: 'address',
//             key: 'address',
//         },
//      ]
//    initData=()=>{
//        this.get("/zxj/admin/banner/findByTypePage?page=1&pageSize=4")
//        .then((data)=>{
//         //    if(data.err===-998){
//         //        this.props.history.push("/login")
//         //    }
//        })
//    }
//    componentDidMount(){
//        this.initData()
//    }
//    render(){
//        return(
//            <Card className="banner-container">
//               <Table dataSource={this.state.dataSource} columns={this.columns}/>;
//            </Card>
//        )
//    }
// }
// export default Login