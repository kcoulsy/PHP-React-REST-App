import React from 'react';
import axios from 'axios';

import Header from './Header';
import Form from './Form';

class EditProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
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

  editUser(user) {
    const url = 'http://localhost/api/public/api/user/update/' + user.id;
    axios({
      method: 'put',
      url,
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
        <h2>Edit Profile</h2>
        {this.state.data ? <Form userData={this.state.data} onSubmit={(user)=>{
          this.editUser(user);
        }}/> : 'Loading Form'}

      </div></div>
    )
  }
}


export default EditProfile;
