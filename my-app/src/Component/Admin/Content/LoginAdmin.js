import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Button, Container, Form } from 'react-bootstrap';
import axiosClient from '../../axiosClient';
import './LoginAdmin.scss'

const LoginAdmin = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState({});

    const handleChange = (e) => setLogin(prev => ({ ...prev, [e.target.name]: e.target.value }));
    useEffect(() => {
        const jwtToken = localStorage.getItem("jwt");
        const role = localStorage.getItem("role");
        console.log(role);
        if (jwtToken) {
            if (role == "Teacher" || role == "Admin")
                navigate('/admin');
            else
                navigate('')
        }
    }, []);
    const handleSubmit = () => {
        axiosClient.post(`Users/loginAdmin`, login)
            .then(res => {
                localStorage.setItem("jwt", res.data.token);
                localStorage.setItem("userName", res.data.userName);
                localStorage.setItem("id", res.data.id);
                localStorage.setItem("role", res.data.role);
                window.location.reload();
                setTimeout(() => {
                    navigate('/admin')
                }, 1500)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (<>
        <Container className="custom-login-container">
            <div className="custom-login-form">
                <div className="custom-logo-container">
                    <img src={`https://localhost:7164/Images/Logo/vuongtrong.png`} alt="Logo" />
                </div>
                <h2 className="custom-form-title">Đăng nhập Admin</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control type="text" name="username" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type="password" name="password" onChange={handleChange} />
                    </Form.Group>
                    <Button variant="success" onClick={handleSubmit}>Đăng nhập</Button>
                </Form>
            </div>
        </Container>
    </>);
}

export default LoginAdmin;