import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter  from './router';
import * as serviceWorker from './serviceWorker';
//引入 antd的全局样式
import "antd/dist/antd.css";


import axios from "utils/axios.js"

React.Component.prototype.$axios=axios

ReactDOM.render( <RootRouter>你好</RootRouter>
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
