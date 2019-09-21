//-998||-997显示的模态框
import React,{Component,Fragment} from 'react'
import {Card} from 'antd'
import {connect} from 'react-redux'
import ActionCreator from 'store/actionCreator'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'  //将方法直接映射到props里面去
import './index.less'
class TokenModel extends Component{
    back=()=>{ //点击返回登录,先将模态框隐藏,再跳到登录界面
        this.props.changeModelState()
		this.props.history.push('/login')  
		//直接这样写，没有用,需要在根index.js文件Provider做处理
    }
    render(){
      console.log(this)
      return(
        <Fragment>
          {!this.props.modelState|| <div className='tokenmodel'>
          <Card >
            <p>token丢失请重新登录</p>
            <button onClick={this.back}>返回登录</button>
          </Card>  
        </div>}
        </Fragment>
      )
    }
} 
let NewComponent=withRouter(TokenModel)   //可以用两个高阶组件处理,withRoute赋予路由对象,
export default connect(state=>state,(dispatch)=>{  //connect是将state数据和方法映射到props里面去
return bindActionCreators(ActionCreator,dispatch)})(NewComponent)



