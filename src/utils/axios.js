import axios from 'axios'
// import Store from '../store/store'
// import ActionCreator from '../store/actionCreator';
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     console.log('请求拦截器',config)
//     let {method} = config
//     let token=localStorage.getItem('token')
//     if(method==='get'){
//       config.url+=`&token=${token}`
//     }
//     console.log(config.url)
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });
 
// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Do something with response data
//     console.log(response)
//     if(response.status===200){
//       console.log(response.data.err)
//       if(response.data.err===-998){
//         Store.dispatch(ActionCreator.changeModelState())
//       }
      
//       return response.data
//     }else{
//       return Promise.reject('请求出错')
//     }
  
//   }, function (error) {
//     // Do something with response error
//     return Promise.reject(error);
//   });
  export default axios