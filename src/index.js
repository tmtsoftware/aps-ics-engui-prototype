import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { reduxWebsocketMiddleware } from './websockets';



const socketMiddleware = reduxWebsocketMiddleware("ws://localhost:9000/ws");

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, socketMiddleware)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
