import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Form from './Form';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }
  componentWillMount() {
    axios({
      method: 'get',
      url: 'http://localhost/api/public/api/users',
      data: {}
    }).then((response)=>{
      if(response.status === 200) {
        this.setState(()=>({data: response.data}));
        console.log(this.state.data);
      }
    })
  }
  render() {
    return (
      <div className="container">
        <Link to="/add">Add User</Link>
        Dashboard
        <div>
          {this.state.data.map((user)=>{
            return (
              <Link to={"/profile/" + user.id}>
                <div>{user.username} - {user.first_name} {user.last_name}</div>
              </Link>
            )
          })}
        </div>

      </div>
    )
  }
}


export default Dashboard;
