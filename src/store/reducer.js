import State from './state'
export default (preState=State,action)=>{
    let newData=JSON.parse(JSON.stringify(preState))
    let {type,params}=action
    switch (type){
        case 'CHANGE_MODELSTATE'://控制模态框的显示
            newData.modelState=!newData.modelState
            break;
        case 'CHANGE_REQUEST'://控制定时器的显示
            newData.request=!newData.request
            break;
        default:
            break;
    }
    return newData
}