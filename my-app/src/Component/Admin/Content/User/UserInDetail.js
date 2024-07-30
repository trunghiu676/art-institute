import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form, Toast, ToastContainer } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../../axiosClient";
import axios from "axios";
import useAuth from "../../UseAuth";
const UserInDetail = () => {
    const { userName } = useParams();
    const [userDetail, setUserdetail] = useState({});
    const [file, setFile] = useState();//image
    const [avatarPath, setAvatarPath] = useState('');//thay đổi ảnh đại diện khi người dùng tải lên ảnh mới
    const [error, setError] = useState({});
    const [showErr, setShowErr] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const navigate = useNavigate();
    useAuth(`Chi tiết tài khoản ${userDetail.fullName}`)
    useEffect(() => {
        axiosClient.get(`Users/${userName}`)
            .then(res => {
                setUserdetail(res.data);
                setAvatarPath(`https://localhost:7164/Images/Avatar/${res.data.avatar}`)
            })
    }, []);
    const dateFormat = (str) => {
        const date = new Date(str);
        var yy = date.getFullYear();
        var mm = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return (yy + "-" + mm + "-" + dd);
    }
    console.log(userDetail);
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'radio' ? (e.target.value === 'true' ? 'Nam' : 'Nữ') : e.target.value;
        setUserdetail((prev) => ({
            ...prev,
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
    const validForm = () => {
        const errors = {};
        let valid = true;

        // Bắt buộc nhập
        const requiredFields = ['userName', 'email', 'fullName'];
        requiredFields.forEach((field) => {
            if (!userDetail[field]) {
                errors[field] = `Vui lòng nhập ${field === 'userName' ? 'username' : field}.`;
                valid = false;
            }
        });

        // Giao diện dấu sao đỏ
        setError(errors);

        return valid;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userDetail);
        const isValid = validForm();
        if (isValid) {
            if (file) {
                // Nếu có file mới, thực hiện các thao tác liên quan đến file
                const formData = new FormData();
                formData.append("file", file);
                axios.post(`https://localhost:7164/api/Users/upload/${userName}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
            }
            axiosClient.put(`Users/${userName}`, userDetail)
                .then((res) => {
                    setShowSuccess(true);
                    setTimeout(() => {
                        //navigate("/admin/student/list");
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
                                    value={userDetail.userName}
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
                                    value={userDetail.fullName}
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
                                    value={userDetail.email}
                                    placeholder="Nhập email"
                                    onChange={handleInput}
                                    isInvalid={error.email}
                                />
                                <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={userDetail.phoneNumber}
                                    name="phoneNumber"
                                    placeholder="Nhập số điện thoại"
                                    onChange={handleInput}
                                    isInvalid={error.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">{error.phoneNumber}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group  >
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={userDetail.address}
                                    placeholder="Nhập địa chỉ"
                                    onChange={handleInput}
                                    isInvalid={error.address}
                                />
                                <Form.Control.Feedback type="invalid">{error.address}</Form.Control.Feedback>
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
                                    // checked={userDetail.gender === 'Nam'} // Sửa ở đây
                                    onChange={handleInput}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Nữ"
                                    name="gender"
                                    value={false}
                                    checked={userDetail.gender === 'Nữ'} // Sửa ở đây
                                    onChange={handleInput}
                                />

                                <Form.Control.Feedback type="invalid">{error.gender}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Ngày sinh</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="birthDate"
                                    value={dateFormat(userDetail.birthDate)}
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
                                    value={dateFormat(userDetail.startDate)}
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
                                isInvalid={error.image} />
                            <Form.Control.Feedback type="invalid">{error.image}</Form.Control.Feedback>
                            <div style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '8px' }}>
                                <img src={avatarPath} width={240} />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit" >
                    Cập nhật
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

export default UserInDetail;