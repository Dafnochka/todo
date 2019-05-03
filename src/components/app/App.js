import React, {Component} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from '../../store/store';
import {Router, Route, IndexRoute, browserHistory,} from 'react-router';


import Layout from '../layout/Layout';
import Main from '../main/Main';
import Goods from '../goods/Goods';
import ShoppingCart from '../shopping-cart/ShoppingCart';
import PageNotFound from '../page-not-found/PageNotFound';

class App extends Component {
    render() {


        return (
            <Provider store={store}>
<Layout>

</Layout>
            </Provider>
        );
    }
}

export default App;
