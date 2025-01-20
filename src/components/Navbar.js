import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
        <h1 className="navbar-title">School Payments Dashboard</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/transactions/school">School Transactions</Link>
          </li>
          <li>
            <Link to="/transactions/status">Check Status</Link>
          </li>
        </ul>
      </nav>
    );
  };

  export default Navbar;