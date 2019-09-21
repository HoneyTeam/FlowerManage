import State from './state'
export default (preState=State,action)=>{
    let newData=JSON.parse(JSON.stringify(preState))
    let {type} = action
    switch (type) {
        case 'CHANGE_MODELSTATE':
            newData.modelState=!newData.modelState
            break;
    
        default:
            break;
    }
    return newData
}