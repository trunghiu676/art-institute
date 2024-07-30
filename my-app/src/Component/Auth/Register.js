import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosClient from '../axiosClient';
import './Register.scss';
import { useEffect } from "react";
const Register = (props) => {
    const navigate = useNavigate();
    const [account, setAccount] = useState({});
    const [password, setPassword] = useState();

    const [error, setError] = useState({});
    const [showErr, setShowErr] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        document.title = 'Đăng ký';
    }, [])

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAccount((prev) => ({
            ...prev,
            status: true,
            [name]: value,
        }));
    };

    //kiểm tra mật khẩu đủ điều kiện 
    const validatePassword = (password) => {
        if (password == null) {
            return false;
        }
        return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);
    };

    //console.log(validatePassword("aAdfdafdde33@"));
    const validForm = () => {
        const errors = {};
        let valid = true;
        // Bắt buộc nhập
        const requiredFields = ['userName', 'email', 'fullName'];
        requiredFields.forEach((field) => {
            if (!account[field]) {
                errors[field] = `Vui lòng nhập ${field === 'userName' ? 'username' : field}.`;
                valid = false;
            }
        });
        //Kiểm tra mật khẩu
        if (!validatePassword(password)) {
            errors.password = "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và có độ dài tối thiểu 8 ký tự.";
            valid = false;
        }
        setError(errors)
        return valid;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(account);
        if (isSubmitting) {
            return; // Không cho phép submit lại nếu đang trong quá trình submit
        }
        const isValid = validForm();
        if (isValid) {
            setIsSubmitting(true); // Đánh dấu đang trong quá trình submit
            axiosClient.post(`Users/register-user?password=${password}`, account)
                .then((res) => {
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                })
                .catch((error) => {
                    if (error.response) {
                        console.error(error.response.data); // Log lỗi từ server
                        setShowErr(true);
                        alert(error.response.data.error);
                    } else {
                        console.error(error.message);
                    }
                    setIsSubmitting(false); // Bật lại nút submit nếu có lỗi
                });
        } else {
            setShowErr(true);
        }
    }

    return (
        <Container className="register-container">
            <Row>
                <Col className="header col-4 mx-auto">
                    <span> Bạn đã có tài khoản?</span>
                    <Button onClick={() => navigate("/login")}>Login</Button>
                </Col>
            </Row>
            <Row>
                <Col className="title col-4 mx-auto">B T H & ART</Col>
            </Row>
            <Row>
                <Col className="welcome col-4 mx-auto">Let's start ART!</Col>
            </Row>
            <Row>
                <Col className="content-form col-4 mx-auto">
                    <Form className="form" onSubmit={handleSubmit}>
                        <Form.Label>Họ và tên (*)</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            onChange={handleInput}
                            isInvalid={error.fullName}
                        />
                        <Form.Control.Feedback type="invalid">{error.fullName}</Form.Control.Feedback>
                        <Form.Group>
                            <Form.Group>
                                <Form.Label>Tên đăng nhập (*)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="userName"
                                    onChange={handleInput}
                                    isInvalid={error.userName}
                                />
                                <Form.Control.Feedback type="invalid">{error.userName}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email (*)</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={handleInput}
                                isInvalid={error.email}
                            />
                            <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mật khẩu (*)</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={error.password}
                            />
                            <Form.Control.Feedback type="invalid">{error.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" className="btn-submit">
                            Tạo tài khoản
                        </Button>
                        <div className="text-center">
                            <span className="back" onClick={() => navigate("/")}>
                                &#60;&#60; Quay lại trang chủ
                            </span>
                        </div>
                    </Form>
                </Col>
            </Row>
            <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
                <Toast onClose={() => setShowErr(false)} show={showErr} delay={3000} autohide>
                    <Toast.Header className="bg-danger">
                        <strong className="me-auto">Thêm thất bại</strong>
                        <small>now</small>
                    </Toast.Header>
                    <Toast.Body>Thêm thất bại, kiểm tra lại dữ liệu!</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
                <Toast onClose={() => setShowSuccess(false)} show={showSuccess} delay={3000} autohide>
                    <Toast.Header className="bg-success">
                        <strong className="me-auto">Thành công</strong>
                        <small>now</small>
                    </Toast.Header>
                    <Toast.Body>Thêm thành công!</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default Register;
