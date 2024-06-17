import React, { useState, useContext } from 'react';
import '../App.css';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const [logoutError, setLogoutError] = useState("");
    const navigate = useNavigate();

    const confirmLogout = () => {
        try {
            logout();
        }
        catch (err) {
            setLogoutError(err);
        }
    }
    return (
        <div className='logout'>
            <div>
                <p>Are you sure you want to log out?</p>
                <button className='btnConfirm' onClick={() => confirmLogout()}>Yes</button>
                <button className='btnCancel' onClick={() => navigate('../updates')}>Cancel</button>
                {logoutError && (
                    <p className="error" style={{ color: "red" }}>
                        {logoutError}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Logout;