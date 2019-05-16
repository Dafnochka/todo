import React, {Component} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from '../../store/store';


import Layout from '../layout/Layout';

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
