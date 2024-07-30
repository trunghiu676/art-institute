import axios from "axios";
import axiosClient from "../../../axiosClient";
import { useEffect, useState } from "react";
import { Form, Button, Container, Toast, ToastContainer, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../UseAuth";

const ExhibitionAdd = () => {
    const [exhibition, setExhibition] = useState({});
    const [file, setFile] = useState();//image
    const [error, setError] = useState({});
    const [showErr, setShowErr] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarPath, setAvatarPath] = useState('https://via.placeholder.com/150x120&text=No+Image');//thay đổi ảnh đại diện khi người dùng tải lên ảnh mới

    useAuth('Tạo triễn lãm');
    const userId = localStorage.getItem("id");

    const navigate = useNavigate();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setExhibition((prev) => ({
            ...prev,
            status: true,
            userId: userId,
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

    //kiểm tra người dùng nhập vào
    const validateForm = () => {
        const errors = {};
        let valid = true;

        // Kiểm tra tên cuộc thi
        if (!exhibition.name) {
            errors.name = "Vui lòng nhập tên triễn lãm.";
            valid = false;
        }

        // Kiểm tra ngày bắt đầu không được nhỏ hơn ngày hiện tại
        const today = new Date().toISOString().split('T')[0];
        if (new Date(exhibition.startDate) < new Date(today)) {
            errors.startDate = "Ngày bắt đầu không được nhỏ hơn ngày hiện tại.";
            valid = false;
        }

        // Kiểm tra ngày kết thúc không được nhỏ hơn ngày bắt đầu
        if (new Date(exhibition.endDate) < new Date(exhibition.startDate)) {
            errors.endDate = "Ngày kết thúc không được nhỏ hơn ngày bắt đầu.";
            valid = false;
        }
        // Kiểm tra mô tả
        if (!exhibition.description) {
            errors.description = "Vui lòng nhập mô tả triễn lãm.";
            valid = false;
        }

        // Kiểm tra ảnh đại diện
        if (!file) {
            errors.image = "Vui lòng tải lên ảnh đại diện.";
            valid = false;
        }

        setError(errors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return; // Không cho phép submit lại nếu đang trong quá trình submit
        }
        const isValid = validateForm();
        if (isValid) {
            setIsSubmitting(true); // Đánh dấu đang trong quá trình submit
            axiosClient.post(`Exhibitions`, exhibition)
                .then((res) => {
                    const id = res.data.id;
                    //upload anh dai dien
                    const formData = new FormData();
                    formData.append("file", file);
                    axios.post(`https://localhost:7164/api/Exhibitions/upload/${id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                        }
                    });
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate("/admin/exhibition/list");
                    }, 2000);
                }).catch(() => {
                    setShowErr(true);
                    setIsSubmitting(false); // Bật lại nút submit nếu có lỗi
                })
        } else {
            setShowErr(true);
        }
    }
    return (<>
        {/* {showSuccess && <div className="alert alert-success">Link den chi tiet!</div>} */}
        <Container className="block">
            <Form onSubmit={handleSubmit} >
                <Row>
                    <Col md={9}>
                        <Form.Group className="mb-2">
                            <Form.Label>Tên triễn lãm</Form.Label>
                            <Form.Control type="text" name="name" onChange={handleInput} isInvalid={error.name} />
                            <Form.Control.Feedback type="invalid">{error.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Ngày bắt đầu</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    onChange={handleInput}
                                    isInvalid={error.startDate}
                                />
                                <Form.Control.Feedback type="invalid">{error.startDate}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Ngày kết thúc</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    onChange={handleInput}
                                    isInvalid={error.endDate}
                                />
                                <Form.Control.Feedback type="invalid">{error.endDate}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-2">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                onChange={handleInput}
                                isInvalid={error.description} />
                            <Form.Control.Feedback type="invalid">{error.description}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
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


                <Button variant="success" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Đã tạo triễn lãm..." : "Tạo triễn lãm"}
                </Button>
            </Form>
        </Container>

        <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
            <Toast onClose={() => setShowErr(false)} show={showErr} delay={3000} autohide>
                <Toast.Header className="bg-danger">
                    <strong className="me-auto">Lỗi</strong>
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

export default ExhibitionAdd;