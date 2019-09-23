import State from './state'
export default (preState=State,action)=>{
    let newData=JSON.parse(JSON.stringify(preState))
    console.log('数据数据数据数据',newData)
    let {type} = action
    switch (type) {
        case 'CHANGE_MODELSTATE':
            newData.modelState=!newData.modelState
            break;
        case 'CHANGE_REQUEST':
            newData.request=true
            console.log('aaaaaaaaaaaaaaaaa',newData.request)
            break;
        case 'CHANGE_REQUEST1':
            newData.request=false
            console.log('aaaaaaaaaaaaaaaaa',newData.request)
            break;
        default:
            break;
    }
    return newData
}