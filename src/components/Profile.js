import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }
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
        console.log(this.state.data);
      }
    })
  }
  render() {
    return (
      <div className="container">
        {this.state.data.id}<br />
        {this.state.data.username}<br />
        {this.state.data.first_name}<br />
        {this.state.data.last_name}<br />
        {this.state.data.email}<br />
        {this.state.data.type}<br />
        {this.state.data.enabled}<br />
      <Link to={"/edit/"+this.state.data.id}>Edit User</Link>

      </div>
    )
  }
}


export default Profile;
