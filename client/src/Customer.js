import React, {Component} from 'react';
import './styles/Customer.css'

class Customer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            formDataChanged: false,
            submittedSuccessfully: false
        };

        this.updateStatus = this.updateStatus.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.addNote = this.addNote.bind(this);
        this.trackFormChange = this.trackFormChange.bind(this);
    }

    updateStatus(event) {
        this.setState({status: event.target.value});
    }

    submitChanges(event) {
        event.preventDefault();
        const dataToUpdate = {
            status: this.state.status,
            notes: this.state.notes
        };
        fetch(`/customers/${this.props.match.params.id}`, {
            method: 'PATCH',
            body: JSON.stringify(dataToUpdate),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => this.setState({formDataChanged: false, submittedSuccessfully: true}))
        .catch(error => console.error('Patch customer error:', error));
    }

    updateNote(index, event){
        let updatedNotes = [...this.state.notes];
        updatedNotes[index] = event.target.value;
        this.setState({notes: updatedNotes});
    }

    addNote(){
        let newNotes = [...this.state.notes];
        newNotes.push('');
        this.setState({notes: newNotes});
        this.trackFormChange();
    }

    deleteNote(index){
        let updatedNotes = [...this.state.notes];
        updatedNotes.splice(index, 1);
        this.setState({notes: updatedNotes});
        this.trackFormChange();
    }

    trackFormChange(){
        this.setState({formDataChanged: true, submittedSuccessfully: false})
    }

    componentDidMount() {
        fetch(`/customers/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(customer => {
                customer.notes = customer.notes.split(',');
                this.setState({...customer});
            });
    }

    render() {
        let notes = [...this.state.notes];
        return (
            <div className="customer">
                <h1>Customer Details</h1>
                <form className="customer-form" onChange={this.trackFormChange.bind(this)} onSubmit={this.submitChanges}>
                    <section className="customer-form-side">
                        <label>
                            <span>Status:</span>
                            <select className="customer-form-main-note-input" value={this.state.status} onChange={this.updateStatus}>
                                <option value={0}>prospective</option>
                                <option value={1}>current</option>
                                <option value={2}>non-active</option>
                            </select>
                        </label>
                        <label>
                            <span>Name:</span>
                            <span>{this.state.name}</span>
                        </label>
                        <label>
                            <span>Mobile:</span>
                            <span>{this.state.mobile}</span>
                        </label>
                        <label>
                            <span>Address:</span>
                            <span>{this.state.address}</span>
                        </label>
                    </section>
                    <section className="customer-form-main">
                        <label>
                            <span>Notes:</span>
                            {notes.map((note, index) =>
                                <div key={index} className="customer-form-main-note">
                                    <input className="customer-form-main-note-input" type="text" value={note} onChange={this.updateNote.bind(this, index)}/>
                                    <button className="customer-form-main-note-remove" type="button" onClick={this.deleteNote.bind(this, index)}>remove</button>
                                </div>
                            )}
                            <button className="add-button" type="button" onClick={this.addNote}>+ new note</button>
                        </label>
                    </section>
                    <section className="customer-form-submission" >
                        <input disabled={!this.state.formDataChanged} type="submit" value="Submit"/>
                        {this.state.submittedSuccessfully ?
                            <p className="customer-form-submission-success">Submitted Successfully!</p>
                            : null
                        }
                    </section>
                </form>
            </div>
        );
    }
}

export default Customer;
