import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
  <div className="header">
    <div className="container d-flex justify-content-between align-items-baseline">
      <Link to="/"><h1>Dashboard</h1></Link>
      <Link to='/init'>Init</Link>
      <Link className="btn btn-info" to="/add">Add User</Link>
    </div>
  </div>
)

export default Header;
