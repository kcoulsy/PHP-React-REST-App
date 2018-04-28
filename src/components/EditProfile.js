import React from 'react';

import Header from './Header';
import Form from './Form';

import {editUser, getUserById} from '../actions/user';

class EditProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  componentWillMount() {
    const id = this.props.match.params.id;
    getUserById(id).then((response)=>{
      this.setState(()=>({data: response}))
    })

  }
  handleEditUser(user){
    editUser(user).then((response)=>{
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
        <h2>Edit Profile</h2>
        {this.state.data ? <Form userData={this.state.data} onSubmit={(user)=>{
          this.handleEditUser(user);
        }}/> : 'Loading Form'}

      </div></div>
    )
  }
}


export default EditProfile;
