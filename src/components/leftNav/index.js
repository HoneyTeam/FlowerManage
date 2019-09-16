import React,{Component} from 'react'
import {Menu} from 'antd'
import   {withRouter}from 'react-router-dom'
import  navData from  './navData'

const { SubMenu } = Menu;
class LeftNav extends Component{
  constructor(){
    super()
    this.state={
      data:[]
    }
  }
  componentDidMount(){
    setTimeout(()=>{
        this.setState({data:navData.data})
    },200)
  }
  jump=(path)=>{
    this.props.history.push(path)
  }
  renderItem(arr){
    if(!arr.length){ return '暂无数据'}
    return arr.map((item)=>{
       if(item.children){
         return(
           <SubMenu title={item.name}>
             {/* 渲染item的时候需要根据1级还是二级进行递归 */}
             {this.renderItem(item.children)}
           </SubMenu>
         )
       }else{
         return (
          <Menu.Item key={item.key}
                     onClick={this.jump.bind(this,item.path)}
          >{item.name}</Menu.Item>
         )
       }
    })
  }
  render(){
    return(
      <Menu  theme='dark'  mode="vertical">
            {this.renderItem(this.state.data)}
    
        
      </Menu>
    )
  }
}
export default  withRouter(LeftNav)