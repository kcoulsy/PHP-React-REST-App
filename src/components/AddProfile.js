import React from 'react';
import {Redirect} from 'react-router';

import Header from './Header';
import Form from './Form';

import {addUser, getUserCountByEmail, getUserCountByUsername} from '../actions/user';

class AddProfile extends React.Component {
  constructor(props){
    super(props);
    this.handleAddUser = this.handleAddUser.bind(this);
  }
  
  handleAddUser(user) {
    //Check if username is taken
    getUserCountByUsername(user.username).then((response)=>{
      if(response.Users.count > 0){
        window.alert('Username Already Taken!');
      } else {
        //If username free, check if email is in use
        getUserCountByEmail(user.email).then((response)=>{
          if(response.Users.count > 0){
            window.alert('Email already in use!');
          } else {
            //if both available, proceed with adding the user
            addUser(user).then((response)=>{
              if(response === 200){
                this.props.history.push("/");
              }
            });
          }
        });
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
        </div>
      </div>
    )
  }
}


export default AddProfile;
