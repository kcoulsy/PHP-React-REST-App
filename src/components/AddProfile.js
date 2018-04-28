import React from 'react';
import axios from 'axios';
import validator from 'validator';
import {Redirect} from 'react-router';

import Header from './Header';
import Form from './Form';

class AddProfile extends React.Component {
  constructor(props){
    super(props);
    this.addUser = this.addUser.bind(this);
  }
  addUser(user) {
    axios({
      method: 'post',
      url: 'http://localhost/api/public/api/user/update',
      data: user
    }).then((response)=>{
      if(response.status === 200) {
        this.setState(()=>({data: response.data}));
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
          onSubmit={(user) => this.addUser(user) }/>
      </div></div>
    )
  }
}


export default AddProfile;
