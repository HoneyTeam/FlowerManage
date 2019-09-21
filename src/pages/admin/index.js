import React,{Component} from 'react'
import  './index.less'
import LeftNav from 'components/leftNav'
class Admin extends Component{
  render(){
    return(
       <div className='admin'>
          <div className='admin-left'>
             <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568998727774&di=bb4fa014f4e3dadcd5ad081cb759428c&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0129f95822defda84a0d304f5798f3.png%401280w_1l_2o_100sh.png" alt=""/>
            <LeftNav></LeftNav>
          </div>
          <div className='admin-right'>
             <div className='admin-right-top'>
                <span>遇见花开后台管理系统</span>
             </div>
             <div className='admin-right-center'>
                {this.props.children}
             </div>
             {/* <div className='admin-right-footer'>bottom</div> */}
          </div>
       </div>
    )
  }
}
export default  Admin