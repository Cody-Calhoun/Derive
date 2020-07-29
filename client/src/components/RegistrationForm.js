import React, {useState} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

export default function RegistrationForm(){
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value
        });
    }

    function handleSubmit(e){
        e.preventDefault();

        axios.post('http://localhost:8000/api/users', formState, {
            withCredentials: true
        })
            .then(() => navigate('/api/user/:id/dashboard'))
            .catch(console.log);
    }

    return (

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input 
                type="text"
                value={formState.firstName}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input 
                type="text"
                value={formState.lastName}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                type="text"
                value={formState.email}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                type="password"
                value={formState.password}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="passwordConfirmation">Confirm Password:</label>
                <input 
                type="password"
                value={formState.passwordConfirmation}
                onChange={handleChange}
                />
            </div>
            <button className="col-sm-0 btn btn-info">Submit</button>

        </form>
    )
}