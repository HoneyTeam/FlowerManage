// // 然后我们在项目中使用
// import ReconnectingWebSocket from "reconnecting-websocket";
// import { takeEvery, fork } from "redux-saga/effects";
// import store from "./store";
// import * as action from "../module/actions";

// // 定义它的actionTypes
// export const CONNECT_WEBSOCKET = "CONNECT_WEBSOCKET";
// export const DISCONNECT_WEBSOCKET = "DISCONNECT_WEBSOCKET";
// //定义它的action 行为
// export const connectWebsocket  = (name) => ({ type: CONNECT_WEBSOCKET , name});
// // 断开连接,你可以在退出登录时调用,或者时你离开你的模块时调用,都可以,看你自己的情况决定
// export const disconnect = result=> ({ type: DISCONNECT_WEBSOCKET , result});

// //定义 websocket connection
// let options = {
//    maxRetries: 5
// };
// // 把rws 定义在外面是方便断开连接
// let rws = null;
// // async 执行异步方法 
// async function initWebsocket(obj) {
 
//    let url = "http://10.9.22.239:8080";
//    // 建立websocket 连接
//    rws = new ReconnectingWebSocket(url, [], options);

//    rws.addEventListener("open", async () => {
//        if (!rws) return;   
//        // 这里可以拿到你传过来的 name
//        let ticket = {
//             "aaa": obj.name
//         };

//        if (rws.readyState === 1) {
//           // 这个是你给websocket 传输它要的东西
//            rws.send(JSON.stringify(ticket));
//         }
//     });

//    rws.addEventListener("message", e => {
//        if (e.data) {
//        // 这里是你拿到数据后进行的处理
//        //你可以调用action 来触发消息给页面上展示 例如 这些消息方法需要你自己来封装
//        store.dispath(action.success(e.data))
//       }
//     });

//    // 错误时进行的处理
//    rws.addEventListener("error", e => {
//        console.error(e.message);
//     });
//    // 关闭时进行的操作
//    rws.addEventListener("close", () => {
//        rws = null;
//        console.info("asset service disconnected.");
//     });
// }

// //来写sagas的处理方法 
// function Connect(name) {
//    initWebsocket(name);
// }

// function Disconnect(result) {
//    // 为什么要使用while呢,因为我们的页面上有可能不只 创建了一个websocket连接
//    while(rws) {
//         rws.close(1000, result);
//     }
// }

// function* connectSaga() {
//    yield takeEvery(CONNECT_WEBSOCKET , Connect);
// }
// function* disconnectSaga() {
//    yield takeEvery(DISCONNECT_WEBSOCKET , Disconnect);
// }

// export default function* root() {
//    yield [
//        fork(connectSaga),
//        fork(disconnectSaga)
//     ];
// }

import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000/my-namespace');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

export { subscribeToTimer };