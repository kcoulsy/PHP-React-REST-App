import React from 'react';
import {Redirect} from 'react-router';

import Header from './Header';
import Form from './Form';

import {addUser} from '../actions/user';

class AddProfile extends React.Component {
  constructor(props){
    super(props);
    this.handleAddUser = this.handleAddUser.bind(this);
  }
  handleAddUser(user) {
    addUser(user).then((response)=>{
      if(response === 200){
        this.props.history.push("/");
      }
    });

  }
  render() {
    return (
      <div>
      <Header />
      <div className="container">
        <h2>Add Profile</h2>
        <Form userData={{}}
          onSubmit={(user) => this.handleAddUser(user) }/>
      </div></div>
    )
  }
}


export default AddProfile;
