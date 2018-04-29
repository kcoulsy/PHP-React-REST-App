import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
  <div className="header">
    <div className="container d-flex justify-content-between align-items-baseline">
      <Link className="mr-auto" to="/"><h1>Dashboard</h1></Link>
      <Link className="p-2" to='/init'>Init</Link>
      <Link className="p-2 btn btn-info" to="/add">Add User</Link>
    </div>
  </div>
)

export default Header;
