import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './styles/Table.css'
import sort from './assets/sort.svg';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            headers: [],
            sortState: {},
            search: {}
        };
        this.filterByCriteria = this.filterByCriteria.bind(this);
    }

    toCapital(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    sortFormula(x, y, column) {
        if (this.state.sortState[column]) {
            return x[column] < y[column];
        }
        return x[column] > y[column];
    };

    sortBy(col) {
        let sorted = [...this.state.data].sort((x, y) => this.sortFormula(x, y, col));
        let newSortState = Object.assign({}, this.state.sortState);
        newSortState[col] = !newSortState[col];
        this.setState({
            data: sorted,
            sortState: newSortState
        })
    }

    updateSearch(header, event) {
        let newSearch = Object.assign({}, this.state.search);
        newSearch[header] = event.target.value;

        this.setState({search: newSearch});
    }

    filterByCriteria(each){
        const keys = Object.keys(this.state.search);
        for (let i = 0; i < keys.length; i++) {
            const currentKey = keys[i];
            const searchString = this.state.search[currentKey].toLowerCase();
            const currentValue = each[currentKey].toString().toLowerCase();
            if (currentValue.indexOf(searchString) < 0) {
                return false;
            }
        }
        return true;
    }

    componentWillReceiveProps(newProps) {
        let sortState = {}, search = {};
        newProps.headers.forEach((header) => {
            sortState[header] = false;
            search[header] = '';
        });

        this.setState({
            data: newProps.data,
            headers: newProps.headers,
            sortState: sortState,
            search: search
        })
    }

    render() {
        const filteredData = this.state.data.filter(this.filterByCriteria);

        const headers = this.state.headers.map((header, index) =>
            <div key={index} className="header-title" onClick={this.sortBy.bind(this, header)}>{this.toCapital(header)}
                <img src={sort} className="header-sort" alt="sort-icon" />
            </div>
        );

        const filters = this.state.headers.map((header, index) =>
            <input key={index} className="filter" type="text" placeholder={'filter ' + header}
                   onChange={this.updateSearch.bind(this, header)}/>
        );

        const rows = filteredData.map((rowData, index) =>
            <Link key={rowData.id} className="body-row" to={`/customers/${rowData.id}`}>
                {this.props.headers.map((colKey, index) => <div key={index}>{rowData[colKey]}</div>)}
            </Link>
        );

        return (
            <div className="table">
                <div className="header">
                    {headers}
                </div>
                <div className="body">
                    <div className="body-row">
                        {filters}
                    </div>
                    {rows}
                </div>
            </div>
        );
    }
}

export default Table;
