import React from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';

import Header from './Header';

import {apiUrl, addUser} from '../actions/user';

class AddProfile extends React.Component {
  constructor(props){
    super(props);
    this.handleAddUsers = this.handleAddUsers.bind(this);
  }

  handleAddUsers(user) {
    axios({
      method: 'get',
      url: 'https://my.api.mockaroo.com/data.json?key=38c13d00',
      data: {}
    }).then((response)=>{
      if(response.status === 200) {
        response.data.forEach((user)=>{
          addUser(user);
        });
        window.alert('10 Dummy users added to the database.');
      }
    });
  }

  handleClearUsers() {
    if(window.confirm('Are you sure you want to delete all users from the database?')){
      const url = apiUrl + 'users/delete';
      axios({
        method: 'delete',
        url,
        data: {}
      }).then((response)=>{
        if(response.status === 200) {
          window.alert('Database cleared.');
        }
      });
    }

  }
  render() {
    return (
      <div>
      <Header />
      <div className="container">
        <h2>Initialization</h2>
        <table className="table">

        <tr>
          <button className="btn btn-success" onClick={this.handleAddUsers}>Add 10 Users to the database</button>
        </tr>
        <tr>
          <button className="btn btn-info" onClick={this.handleClearUsers}>Erase all users</button>
        </tr>
        </table>
      </div></div>
    )
  }
}


export default AddProfile;
