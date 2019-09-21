
import axios from 'axios'
import Store from 'store/store'
import ActionCreator from 'store/actionCreator'
axios.interceptors.request.use(function(config){
    //console.log('请求拦截器')
    let {method}=config
    let token=localStorage.getItem('token')
    //console.log(token)
    if(method==='get'){
        config.url+=`&token=${token}`
    }
    return config;
},function(error){
    return Promise.reject(error);
})
axios.interceptors.response.use(function(response){  //响应拦截器 获取返回的数据
    if(response.status===200){
        //alert('请求成功')
        if(response.data.err===-998||response.data.err===-997){ 
            //数据如果是-998||-997的话就让模态框显示
            //alert('token缺失')
            Store.dispatch(ActionCreator.changeModelState())
            //Store.dispatch(ActionCreator.changeRequest())
        }
        return response
    }else{
        return Promise.reject('请求出错')
    }
},function(error){
    return Promise.reject(error)
});

export default axios


