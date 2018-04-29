import React from 'react';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";

import Header from './Header';

import {getAllUsers, getUsersByOffset} from '../actions/user';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activePage: 1
   }
   this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
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
        <div className="">
          {this.state.data.map((user)=>{
            return (
              <Link to={"/profile/" + user.id} key={user.id}>
                <div>{user.username} - {user.first_name} {user.last_name}</div>
              </Link>
            )
          })}
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={25}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          innerClass="pagination"
          itemClass="page-item"
        />
      </div>

      </div>
    )
  }
}

export default Dashboard;
