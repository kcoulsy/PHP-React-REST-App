import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Header from './Header';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }
    this.deleteUser = this.deleteUser.bind(this);
  }
  componentWillMount() {
    const id = this.props.match.params.id;
    const url = 'http://localhost/api/public/api/user/' + id;
    axios({
      method: 'get',
      url,
      data: {}
    }).then((response)=>{
      if(response.status === 200) {
        this.setState(()=>({data: response.data[0]}));
      }
    })
  }
  deleteUser(){
    const url = 'http://localhost/api/public/api/user/delete/' + this.props.match.params.id;
    axios({
      method: 'delete',
      url,
      data: {}
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
        <h2>{this.state.data.username}</h2>
        {this.state.data.first_name}<br />
        {this.state.data.last_name}<br />
        {this.state.data.email}<br />
        {this.state.data.type}<br />
        {this.state.data.enabled}<br />
      <Link to={"/edit/"+this.state.data.id}>Edit User</Link>
      <button onClick={this.deleteUser}>Delete</button>
      </div>
    </div>
    )
  }
}


export default Profile;
