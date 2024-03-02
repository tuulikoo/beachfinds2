
import React from 'react';
import { LoginForm } from './LoginForm';

export const Login = () => {
    const handleLogin = (email: string, password: string) => {
        console.log('Login attempt with email:', email, 'and password:', password);
        // Add your login logic here, such as making an API request
    };

    return (
        <div>
            <h2>Login Page</h2>
            <LoginForm onLogin={handleLogin}/>
        </div>
    );
};

export default Login;
