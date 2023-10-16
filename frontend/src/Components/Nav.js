import React from "react";
import logo from './image/logo.jpg';
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");
 
 // const name=JSON.parse(localStorage.getItem('user')).name;
  
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <img src={logo} alt="logo" className="logo"/>
      {auth ? (
        <ul className="Nav">
          <li>
            <Link to="/">Product</Link>
          </li>
          <li>
            <Link to="/add-product">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout
           {/* {name}: */}
            </Link>
          
          </li>
          
        </ul>
      ) : (
        <ul  className="Nav Navrignt" >
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;
