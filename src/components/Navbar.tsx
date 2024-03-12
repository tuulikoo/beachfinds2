import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../types/AuthContext'; // Adjust the import path based on your project structure


export const Navbar: React.FC = () => {
   // const authContext = useAuth(); 
    const { user, logout} = useAuth();
    const navigate = useNavigate();


    // Logging to check the current user state
   console.log("Current user in navbar:", user);
    console.log("Current user id in navbar:", user?.id);
    console.log("useAuth().token in navbar = ", useAuth().token);
    console.log("useAuth().user in navbar = ", useAuth().user);

    const handleLogout = () => {
        const confirmLogout = window.confirm('Confirm logout');
        if (confirmLogout) {
            logout();
            console.log("User logged out"); // Logging logout action
            navigate('/'); // Navigate to the homepage or login page as preferred
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Beach Finds</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/map">Map</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/new">Create New Note</Link>
                        </li>
                        { user ? (
                             <>
                             <li className="nav-item">
                                 <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                             </li>
                             <li className="nav-item">
                                 <Link className="nav-link" to="/editUser">User</Link>
                             </li>
                         </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
