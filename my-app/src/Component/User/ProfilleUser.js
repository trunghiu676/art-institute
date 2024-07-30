import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Table, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.scss';
import axiosClient from '../axiosClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
const ProfileUser = () => {
    const [submissions, setSubmissions] = useState([{ competition: {} }]);
    const [awards, setAwards] = useState([{ competition: {} }]);

    const [account, setAccount] = useState({});


    const [isChangingPassword, setChangingPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const userName = localStorage.getItem("userName");
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
        document.title = `Tài khoản`;
        axiosClient.get(`Users/${userName}`)
            .then(res => {
                setAccount(res.data);
            });
        axiosClient.get(`Submissions/ByUserName/${userName}`)
            .then(res => {
                const data = res.data.filter(item => item.isDelete === false);
                setSubmissions(data);
            });
        axiosClient.get(`Awards/User/${userName}`)
            .then(res => {
                setAwards(res.data);
            });
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
    const dateFormat = (srt) => {
        const date = new Date(srt);
        var yy = date.getFullYear();
        var mm = date.getMonth();
        var dd = date.getDate();
        return (dd + "/" + mm + "/" + yy);
    }
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
    //console.log(awards);
    const handleLogout = () => {
        // Xóa các thông tin đăng nhập khỏi localStorage
        localStorage.removeItem("jwt");
        localStorage.removeItem("userName");
        localStorage.removeItem("id");
        // Chuyển hướng đến trang login
        navigate('/login');
        // Refresh trang
        window.location.reload();
    };

    return (
        <Container className="profile-container">
            <Row>
                <Col md={3}>
                    <img className="profile-img" src={`https://localhost:7164/images/avatar/${account.avatar}`} alt="Profile Picture" />
                </Col>
                <Col md={9}>
                    <Row>
                        <Col>
                            <h2>{account.fullName}</h2>
                            <p>{account.email}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>{account.userName}</Col>
                        <Col md={3}> {account.gender}</Col>
                        <Col md={3}>{submissions.length} Bài thi</Col>
                        <Col md={3}>{awards.length} Giải thưởng </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tab.Container id="myTabs">
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link eventKey="tab1">Cuộc thi đã tham gia</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="tab2">Bài thi đã nộp</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="tab3">Giải thưởng</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="tab4">Tài khoản</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="tab1">
                                {submissions && submissions.length > 0 ? (
                                    <Table className="custom-table">
                                        {
                                            submissions.map(item => (
                                                <tr key={item.competition.id}>
                                                    <td>
                                                        <img src={`https://localhost:7164/images/competition/${item.competition.image}`} />
                                                    </td>
                                                    <td>
                                                        <Link to={`/cuoc-thi/${item.competition.id}`}>
                                                            {item.competition.name}
                                                        </Link>
                                                    </td>
                                                    <td>{dateFormat(item.competition.startDate)} - {dateFormat(item.competition.startDate)}</td>
                                                </tr>
                                            ))
                                        }
                                    </Table>
                                ) : (
                                    <p>Chưa tham gia cuộc thi nào.</p>
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="tab2">
                                {submissions && submissions.length > 0 ? (
                                    <Table className="custom-table">
                                        {
                                            submissions.map(item => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <img src={`https://localhost:7164/images/submissions/${item.imagePath}`} />
                                                    </td>
                                                    <td>
                                                        <Link to={`/bai-thi/${item.id}`}>
                                                            {item.name}
                                                        </Link>
                                                    </td>
                                                    <td>{dateFormat(item.submissionDate)}</td>
                                                </tr>
                                            ))
                                        }
                                    </Table>
                                ) : (
                                    <p>Chưa nộp bài thi nào.</p>
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="tab3">
                                {awards && !awards.competition ? (
                                    <Table className="custom-table">
                                        <thead>
                                            <tr>
                                                <th>Loại giải thưởng</th>
                                                <th>Tên giải</th>
                                                <th>Cuộc thi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                awards.map(item => {
                                                    const name = (item.order === 1) ? "Giải nhất" : (item.order === 2) ? "Giải nhì" : "Giải ba"
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>
                                                                {name}
                                                            </td>
                                                            <td>
                                                                {item.nameAward}
                                                            </td>
                                                            <td>
                                                                {item.competition.name}
                                                            </td>
                                                        </tr>

                                                    )
                                                }
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                ) : (
                                    <p>Không đạt được giải thưởng nào.</p>
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="tab4">
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
                                    <Button onClick={handleLogout} variant='danger'>
                                        Đăng xuất
                                    </Button>

                                    {/* Form thay đổi mật khẩu */}
                                    {isChangingPassword && (
                                        <div>
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
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
            <ToastContainer position="top-right" autoClose={2000} />
        </Container>
    );
};

export default ProfileUser;
