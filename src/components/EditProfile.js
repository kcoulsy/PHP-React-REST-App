import React from 'react';
import axios from 'axios';

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

  addUser(user) {
    console.log('edit user',user);
  }
  
  render() {
    return (
      <div className="container">
        EditProfile
        {this.state.data ? <Form userData={this.state.data} onSubmit={(user)=>{
          this.addUser(user);
        }}/> : 'Loading Form'}

      </div>
    )
  }
}


export default EditProfile;
