import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, Toast, ToastContainer } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../../axiosClient";
import axios from "axios";
import useAuth from "../../UseAuth";


const StudentAdd = () => {
    useAuth('Thêm sinh viên');
    const [student, setStudent] = useState({});
    const [password, setPassword] = useState();
    const [file, setFile] = useState();//image
    const [avatarPath, setAvatarPath] = useState('');//thay đổi ảnh đại diện khi người dùng tải lên ảnh mới

    const [error, setError] = useState({});
    const [showErr, setShowErr] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'radio' ? (e.target.value === 'true' ? 'Nam' : 'Nữ') : e.target.value;

        setStudent((prev) => ({
            ...prev,
            status: true,
            [name]: value,
        }));
    };
    const handleFile = (e) => {
        setFile(e.target.files[0]);//lấy ảnh
        //thay đổi ảnh
        const reader = new FileReader();
        reader.onload = () => {
            setAvatarPath(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    }

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
            if (!student[field]) {
                errors[field] = `Vui lòng nhập ${field === 'userName' ? 'username' : field}.`;
                valid = false;
            }
        });

        //Kiểm tra mật khẩu
        if (!validatePassword(password)) {
            errors.password = "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và có độ dài tối thiểu 8 ký tự.";
            valid = false;
        }

        // Giao diện dấu sao đỏ
        setError(errors);

        return valid;
    };
    console.log(password);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(student);
        if (isSubmitting) {
            return; // Không cho phép submit lại nếu đang trong quá trình submit
        }
        const isValid = validForm();
        if (isValid) {
            setIsSubmitting(true); // Đánh dấu đang trong quá trình submit
            axiosClient.post(`Users/register-student?password=${password}`, student)
                .then((res) => {
                    if (file) {
                        const formData = new FormData();
                        formData.append("file", file);
                        axios.post(`https://localhost:7164/api/Users/upload/${student.userName}`, formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                            }
                        });
                    }
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate("/admin/student/list");
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
    return (<>
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row >
                    <Col md={9} className="block">
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="userName"
                                    onChange={handleInput}
                                    isInvalid={error.userName}
                                />
                                <Form.Control.Feedback type="invalid">{error.userName}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    onChange={handleInput}
                                    isInvalid={error.fullName}
                                />
                                <Form.Control.Feedback type="invalid">{error.fullName}</Form.Control.Feedback>
                            </Form.Group>

                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={handleInput}
                                    isInvalid={error.email}
                                />
                                <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Mật khẩu đăng nhập</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    isInvalid={error.password}
                                />
                                <Form.Control.Feedback type="invalid">{error.password}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">

                            <Form.Group as={Col} >
                                <Form.Label as="legend" column sm={2}>
                                    Giới tính<span className="required">*</span>
                                </Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Nam"
                                    name="gender"
                                    value={true}
                                    checked={student.gender === 'Nam'} // Sửa ở đây
                                    onChange={handleInput}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Nữ"
                                    name="gender"
                                    value={false}
                                    checked={student.gender === 'Nữ'} // Sửa ở đây
                                    onChange={handleInput}
                                />

                                <Form.Control.Feedback type="invalid">{error.gender}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Ngày sinh</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="birthDate"
                                    onChange={handleInput}
                                    isInvalid={error.birthDate}
                                />
                                <Form.Control.Feedback type="invalid">{error.birthDate}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Ngày vào trường</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    onChange={handleInput}
                                    isInvalid={error.startDate}
                                />
                                <Form.Control.Feedback type="invalid">{error.startDate}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Col>
                    <Col md={3} className="block">
                        <Form.Group className="mb-2">
                            <Form.Label>Ảnh đại diện</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleFile}
                            />
                            <div style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '8px' }}>
                                <img src={avatarPath} width={240} />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="success" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Đang tạo người dùng..." : "Gửi"}
                </Button>
            </Form>
        </Container>
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
    </>);
}

export default StudentAdd;