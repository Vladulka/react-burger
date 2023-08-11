import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/app/app";
import {createStore, compose, applyMiddleware} from "redux";
import {rootReducer} from "./services/reducers/root";
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <App/>
            </Provider>
        </Router>
    </React.StrictMode>
);
