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
        // const { name, value } = e.target;

        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log('hello');

        axios.post('http://localhost:8000/api/users', formState, {
            withCredentials: true
        })
        
            .then(res => {
                if(res.data.message === 'success'){
                    navigate('/user/dashboard')
                }
            })
            .catch(console.log);
    }

    return (

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input 
                type="text"
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input 
                type="text"
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                type="text"
                name="email"
                value={formState.email}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="passwordConfirmation">Confirm Password:</label>
                <input 
                type="password"
                name="passwordConfirmation"
                value={formState.passwordConfirmation}
                onChange={handleChange}
                />
            </div>
            <button className="col-sm-0 btn btn-info">Submit</button>

        </form>
    )
}