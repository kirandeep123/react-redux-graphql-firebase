import React from "react";
import "./styles.scss";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import {auth} from './../../firebase/utils';


const Header = props => {
    const {currentUser}=props;
   
  return (
    <header className="header">
      <div className="wrap">
        <div className="item">
          <Link to="/">One stop shop for all your needs </Link>
        </div>
        <div className="callToActions">

            {currentUser && (
                <ul>
                        <span onClick={()=>auth.signOut()}>logout</span>
                  
                </ul>
            )}
            {!currentUser && (
          <ul>
            <Link to="/registeration">Register</Link>
            <Link style={{ marginLeft: "12px", padding: "12px" }} to="/login">
              LogIn
            </Link>
          </ul>
            )}
        </div>
      </div>
    </header>
  );
};
Header.defaultProps={
    currentUser:null
}
const mapStateToProps=({user})=>({
  currentUser:user.currentUser
})
export default connect(mapStateToProps,null)(Header);
