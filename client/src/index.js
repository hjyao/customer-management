import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import CustomerList from './CustomerList';
import Customer from './Customer';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router>
        <div>
            <Route exact path="/" component={CustomerList}/>
            <Route exact path="/customers" component={CustomerList}/>
            <Route path="/customers/:id" component={Customer}/>
        </div>
    </Router>
), document.getElementById('root'));


registerServiceWorker();
