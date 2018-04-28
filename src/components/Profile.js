import React from 'react';
import {Link} from 'react-router-dom';

import Header from './Header';
import {getUserById, deleteUserById} from '../actions/user';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {} }
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    getUserById(id).then((response)=>{
      this.setState(()=>({data: response}))
    })
  }

  handleDeleteUser(){
    if(window.confirm('Are you sure you want to delete this user?')){
      const id = this.props.match.params.id;
      deleteUserById(id).then((response)=>{
        if(response === 200){
          this.props.history.push('/');
        }
      })
    } 
  }

  render() {
    return (
      <div>
      <Header />
      <div className="container">
        <h2>{this.state.data.username}</h2>
        {this.state.data.first_name}<br />
        {this.state.data.last_name}<br />
        {this.state.data.email}<br />
        {this.state.data.type}<br />
        {this.state.data.enabled}<br />
      <Link to={"/edit/"+this.state.data.id}>Edit User</Link>
      <button onClick={this.handleDeleteUser}>Delete</button>
      </div>
    </div>
    )
  }
}


export default Profile;
