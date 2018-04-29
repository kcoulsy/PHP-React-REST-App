import React from 'react';

import Header from './Header';
import Form from './Form';

import {editUser, getUserById, getUserCountByEmail, getUserCountByUsername} from '../actions/user';

class EditProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  componentWillMount() {
    //Getting user info by id, setting it to the state
    const id = this.props.match.params.id;
    getUserById(id).then((response)=>{
      this.setState(()=>({data: response}))
    })

  }
  handleEditUser(user){
    //Check if username is taken, but making sure it doesn't conflict if they don't change it
    getUserCountByUsername(user.username).then((response)=>{
      if(response.Users.count > 0 && response.Users.username !== this.state.data.username){
        window.alert('Username Already Taken!');
      } else {
        //If username free, check if email is in use, but making sure it doesn't conflict if they don't change it
        getUserCountByEmail(user.email).then((response)=>{
          if(response.Users.count > 0  && response.Users.email !== this.state.data.email){
            window.alert('Email already in use!');
          } else {
            editUser(user).then((response)=>{
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
        <h2>Edit Profile</h2>
        {this.state.data ? <Form userData={this.state.data} onSubmit={(user)=>{
          this.handleEditUser(user);
        }}/> : 'Loading Form'}

      </div></div>
    )
  }
}


export default EditProfile;
