import React, {Component} from 'react';
import './styles/CustomerList.css';
import Table from './Table';
import * as moment from 'moment';

class CustomerList extends Component {

    constructor() {
        super();
        this.state = {
            customers: [],
            search: ''
        };
        this.STATUS_MAP = {
            0: 'prospective',
            1: 'current',
            2: 'non-active'
        }
    }

    updateSearch(event) {
        this.setState({search: event.target.value});
    }

    componentDidMount() {
        fetch('/customers')
            .then(res => res.json())
            .then(customers => {
                customers.forEach((customer) => {
                    customer.status = this.STATUS_MAP[customer.status];
                    customer.created = moment(customer.created).format('YYYY-MM-DD HH:mm');
                });
                this.setState({customers})
            });
    }

    render() {
        return (
            <div className="customer-list">
                <h1>Customers</h1>
                <div className="customer-list-hero">
                    <Table headers={['name', 'status', 'mobile', 'address', 'created']} data={this.state.customers}/>
                </div>
            </div>
        );
    }
}

export default CustomerList;
