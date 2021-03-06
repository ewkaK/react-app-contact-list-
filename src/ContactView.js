import React, { Component, Fragment } from 'react';

class ContactView extends Component {

  state = {
    name: '',
    phone: '',
    email: '',
    groups: '',
    contacts: []
  }

  handleSubmit = event => {
    event.preventDefault();

    //add to array contacts
    this.setState({
      contacts: this.state.contacts.concat({
        id: (this.state.contacts.length === 0) ? 0
          : Math.max(...this.state.contacts.map(contact => contact.id)) + 1,
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        groups: this.state.groups,
      })
    })

    //reset fields
    this.setState({
      name: '',
      phone: '',
      email: '',
      groups: ''
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  removeContact = contactId => {
    this.setState(
      ({ contacts }) => ({
        contacts: contacts.filter(
          contact => contact.id !== contactId
        )
      })
    )
  }

  render() {
    return (
      <Fragment>
        <div className="add-new">
          <h2 className="App-title">Add new contact</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              name = "name"
              value = {this.state.name}
              onChange = {this.handleChange}
              placeholder = "Name"
              required />
            <br />
            <input
              name="phone"
              value = {this.state.phone}
              onChange = {this.handleChange}
              placeholder="Phone"
              required />
            <br />
            <input
              name="email"
              value = {this.state.email}
              onChange = {this.handleChange}
              placeholder="E-mail" />
            <br />
            <input
              name="groups"
              value = {this.state.groups}
              onChange = {this.handleChange}
              placeholder="Groups eg. work, school, family" />
            <br />
            <button>Add</button>
          </form>
        </div>

        <div className="all-contacts">
         <ul>
           {
             this.state.contacts.map(
               contact => (
                 <li key = {contact.id}>
                   <div>
                     <b>{contact.name}</b> <br />
                     {contact.phone}, {contact.email} <br />

                     {(contact.groups.length === 0) ? null
                       : contact.groups.split(' ').map(
                         group => (
                           (group[group.length-1] === ',') ? ('[' + group.slice(0, -1) + '], ')
                             : ('[' + group + '] ')
                         )
                       )
                     }
                   </div>
                   <button onClick={() => this.removeContact(contact.id)}>
                     Delete
                   </button>
                 </li>
               )
             )
           }
         </ul>
        </div>
      </Fragment>
    )
  }
}

export default ContactView;