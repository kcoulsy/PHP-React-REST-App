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
      <div class="container">
        <h2>{this.state.data.username}</h2>
      <div className="profile">
        <table className="table">
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{this.state.data.first_name}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{this.state.data.last_name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{this.state.data.email}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>{this.state.data.type}</td>
            </tr>
            <tr>
              <td>Enabled</td>
              <td>{this.state.data.enabled}</td>
            </tr>
          </tbody>
        </table>
      <Link className="btn btn-info" to={"/edit/"+this.state.data.id}>Edit User</Link>
      <button className="btn btn-danger"onClick={this.handleDeleteUser}>Delete</button>
      </div>
      </div>
    </div>
    )
  }
}


export default Profile;
