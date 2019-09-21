import React from 'react';
import ReactDOM from 'react-dom';
import Router  from './router'


//index.js文件
import Store from './store/store'
import {Provider} from 'react-redux' //Provider将state注册到根组件，
//让根组件下的所有的组件直接获取到store对象
import axios from 'utils/axios.js'
import * as serviceWorker from './serviceWorker';
React.Component.prototype.$axios=axios
ReactDOM.render( 
    <Provider store={Store}>
        <Router />
    </Provider>
    ,document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
