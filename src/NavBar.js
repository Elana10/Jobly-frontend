import React, {useContext} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import "./NavBar.css"
import UserContext from './auth/UserContext';

function NavBar ({logout}){
    const {currentUser} = useContext(UserContext)
    const location = useLocation();

    const handleNavClick = (to) => {
        if(location.pathname === to){
            window.location.reload();
        }
    }

    function loggedInNav(){
        return (
            <div className='right-div'>
                <NavLink to="/companies" className="nav-link" onClick = {()=> handleNavClick('/companies')}end>
                    Companies
                </NavLink>
                <NavLink to="/jobs" className="nav-link" onClick = {()=> handleNavClick('/jobs')} end>
                    Jobs
                </NavLink>
                <NavLink to="/profile" className="nav-link" onClick = {()=> handleNavClick('/profile')} end>
                    Profile
                </NavLink>
                <NavLink to="/" className="nav-link" onClick={logout}>
                    Log out {currentUser.first_name || currentUser.username}
                </NavLink>
            </div>            
        )
    }

    function loggedOutNav(){
        return (
            <div className='right-div'>
                <NavLink to="/login" className="nav-link" end>
                    Login
                </NavLink>
                <NavLink to="/signup" className="nav-link"  end>
                    Sign Up
                </NavLink>
            </div>            
        )
    }



    return (
        <nav>
            <div className='left-div'>
                <NavLink to="/" >
                    Jobly
                </NavLink>                
            </div>
            {currentUser ? loggedInNav() : loggedOutNav()}

        </nav>
    )
}

export default NavBar