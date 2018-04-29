import React from 'react';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";

import Header from './Header';

import {getUserCount, getUsersByOffset} from '../actions/user';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activePage: 1,
      userCount: 0
   }
   this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    getUserCount().then((response)=>{
      const count = response.Users.count;
      this.setState(()=>({userCount: count}));
    });
    this.handleGetUsers(0);
  }
  handleGetUsers(offset){
    getUsersByOffset(offset).then((response)=>{
      this.setState(()=>({data: response}));
    })
  }
  handlePageChange(pageNumber) {
    this.setState(()=>({activePage: pageNumber}));
    this.handleGetUsers((pageNumber - 1 ) * 10);

  }
  render() {
    return (
      <div>
      <Header />
      <div className="container">
        <h2>User List</h2>
        <div class="table-responsive">
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col">Type</th>
              <th scope="col">Enabled</th>
            </tr>
          </thead>
          <tbody>
          {this.state.data.map((user)=>{
            return (
              <tr>
                <th scope="row"><Link to={"/profile/" + user.id} key={user.id}>{user.id}</Link></th>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.type}</td>
                <td>{user.enabled}</td>
              </tr>
            )
          })}
          {this.state.userCount === 0 ? <tr><td colspan="7" className="text-center">No Users found</td></tr> : ""}
          </tbody>
      </table>
      </div>
      <nav aria-label="pagination">
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.state.userCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          innerClass="pagination"
          itemClass="page-item"
          linkClass="page-link"
        />
      </nav>
      </div>

      </div>
    )
  }
}

export default Dashboard;
