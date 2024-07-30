import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";
import useAuth from "../UseAuth";

const Profile = () => {
    useAuth('Tài khoản');
    const [account, setAccount] = useState({});
    const [isChangingPassword, setChangingPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const userName = localStorage.getItem("userName");
    const navigate = useNavigate();
    useEffect(() => {
        const jwtToken = localStorage.getItem("jwt");
        const role = localStorage.getItem("role");
        if (jwtToken) {
            if (role === "Teacher" || role === "Admin")
                navigate('/admin/profile');
            else
                navigate('')
        }
    }, []);
    useEffect(() => {
        axiosClient.get(`Users/${userName}`)
            .then(res => {
                setAccount(res.data);
            })

    }, []);
    const setPasword = () => { //đặt lại mật khẩu rỗng
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

    }
    //console.log(account);
    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
        setErrors({}); // Xóa thông báo lỗi khi người dùng thay đổi mật khẩu cũ
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setErrors({}); // Xóa thông báo lỗi khi người dùng thay đổi mật khẩu mới
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setErrors({}); // Xóa thông báo lỗi khi người dùng thay đổi xác nhận mật khẩu mới
    };

    // Kiểm tra mật khẩu đủ điều kiện
    const validatePassword = (password) => {
        if (password == null) {
            return false;
        }
        return (
            password.length >= 8 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password)
        );
    };
    //kiểm tra các trường nhập vào
    const validForm = () => {
        const errors = {};

        // Bắt buộc nhập
        if (!oldPassword) {
            errors.oldPassword = `Vui lòng nhập mật khẩu hiện tạitại`;
        }
        if (!newPassword) {
            errors.newPassword = `Vui lòng nhập mật khẩu mới`;
        }
        if (!confirmPassword) {
            errors.confirmPassword = `Vui lòng nhập mật khẩu xác nhận`;
        }

        // Kiểm tra mật khẩu
        if (!validatePassword(newPassword)) {
            errors.passwordTest =
                "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và có độ dài tối thiểu 8 ký tự.";
        }
        if (newPassword !== confirmPassword) {
            errors.passwordErr = "Mật khẩu mới và xác nhận mật khẩu không khớp.";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0; // Trả về true nếu không có lỗi
    };

    const handlePasswordChange = () => {
        const isValid = validForm();
        console.log(oldPassword);
        console.log(newPassword);
        if (isValid) {
            axiosClient.put(`Users/ChangePassword/${userName}?oldPassword=${oldPassword}&newPassword=${newPassword}}`)
                .then(res => {
                    toast.success("Thành công!", { autoClose: 2000 });
                    setPasword();
                })
                .catch(error => {
                    //console.log(error.response.data);
                    toast.error("Thất bại! " + error.response.data);
                    setPasword();
                });
            console.log("Changing password...");
            // Gọi hàm thay đổi mật khẩu ở đây
        }
    };

    return (
        <Container>
            <h2>Thông tin tài khoản</h2>
            <Form>
                {/* Các trường thông tin tài khoản không cho phép chỉnh sửa */}
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={account.userName} readOnly />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={account.email} readOnly />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" value={account.phoneNumber || "Chua co"} readOnly />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" value={account.fullName} readOnly />
                    </Form.Group>
                </Row>

                {/* Nút thay đổi mật khẩu */}
                <Button variant="primary" onClick={() => setChangingPassword(true)}>
                    Thay đổi mật khẩu
                </Button>

                {/* Form thay đổi mật khẩu */}
                {isChangingPassword && (
                    <div>
                        <h2>Thay đổi mật khẩu</h2>
                        <Form.Group className="mb-3" controlId="oldPassword">
                            <Form.Label>Mật khẩu hiện tại</Form.Label>
                            <Form.Control
                                type="password"
                                value={oldPassword}
                                onChange={handleOldPasswordChange}
                                required
                            />
                            {errors.oldPassword && (
                                <p className="text-danger">{errors.oldPassword}</p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="newPassword">
                            <Form.Label>Mật khẩu mới</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                required
                            />
                            {errors.newPassword && (
                                <p className="text-danger">{errors.newPassword}</p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                            {errors.confirmPassword && (
                                <p className="text-danger">{errors.confirmPassword}</p>
                            )}
                            {errors.passwordTest && (
                                <p className="text-danger">{errors.passwordTest}</p>
                            )}
                            {errors.passwordErr && (
                                <p className="text-danger">{errors.passwordErr}</p>
                            )}
                        </Form.Group>

                        <Button variant="success" onClick={handlePasswordChange}>
                            Xác nhận
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setChangingPassword(false)}
                        >
                            Hủy
                        </Button>
                    </div>
                )}
            </Form>
            <ToastContainer position="top-right" autoClose={2000} />
        </Container>

    );
};

export default Profile;
