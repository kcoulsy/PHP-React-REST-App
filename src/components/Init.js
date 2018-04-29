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
        })
      }
    });
  }
    handleCreateTable() {
      const url = apiUrl + 'init';
      axios({
        method: 'get',
        url,
        data: {}
      }).then((response)=>{
        console.log('table created')
      });

  }
  render() {
    return (
      <div>
      <Header />
      <div className="container">
        <h2>Initialization</h2>
        <button className="btn btn-info" onClick={this.handleCreateTable}>Create mysql table</button><br />
        <button className="btn btn-info" onClick={this.handleAddUsers}>Add 10 Users to the database</button>
      </div></div>
    )
  }
}


export default AddProfile;
