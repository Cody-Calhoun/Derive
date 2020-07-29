import React from 'react';
import { navigate } from '@reach/router'
import axios from 'axios'

export default function LogoutButton(){
    function handleClick(){
        axios.delete('http://localhost:8000/api/users/logout', { withCredentials: true})
            .then(() => navigate('/login'));
    }

    return (
        <button className="col-sm-4 btn btn-danger" onClick={ handleClick}> Logout </button>
    );


}