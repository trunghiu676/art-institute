import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';
import './Login.scss';

const Login = () => {
    const [login, setLogin] = useState({});

    const handleChange = (e) => setLogin(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Đăng nhập';
        const jwtToken = localStorage.getItem("jwt");
        const role = localStorage.getItem("role");
        if (jwtToken) {
            if (role === "Teacher" || role === "Admin")
                navigate('/admin');
            else
                navigate('/')
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient.post(`Users/loginUser`, login)
            .then(res => {
                localStorage.setItem("jwt", res.data.token);
                localStorage.setItem("userName", res.data.userName);
                localStorage.setItem("id", res.data.id);
                localStorage.setItem("role", res.data.role);
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="login-container">
            <div className='header col-4 mx-auto'>
                <span>Don't have an account yet?</span>
                <Button onClick={() => navigate('/register')}>Sign up</Button>
            </div>
            <div className='title col-4 mx-auto'>
                B T H &amp; ART
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <Form className='form' onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Enter your username'
                            name='userName'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder='Enter your password'
                            name='password'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <span className='forgot-password'>Forgot password?</span>
                    <div className='login-box'>
                        <a>
                            <Button className='btn-submit' type='submit'>Login to BTH ART</Button>
                        </a>
                    </div>
                    <div className='text-center'>
                        <span className='back' onClick={() => { navigate('/') }}>
                            &#60;&#60; Go to HomePage
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login;
