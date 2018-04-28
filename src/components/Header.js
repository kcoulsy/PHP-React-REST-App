import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
  <div>
    <Link to="/">Dashboard</Link>
    <Link to="/add">Add User</Link>
  </div>
)

export default Header;
