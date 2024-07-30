import axios from "axios";
import axiosClient from "../../../axiosClient";
import { useEffect, useState } from "react";
import { Form, Button, Container, Toast, ToastContainer, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../UseAuth";

const CompetitionAdd = () => {
    useAuth('Tạo cuộc thi')

    const [competition, setCompetition] = useState({});//competition
    const [file, setFile] = useState();//image
    const [award, setAward] = useState({});
    const [error, setError] = useState({});
    const [showErr, setShowErr] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarPath, setAvatarPath] = useState('https://via.placeholder.com/150x120&text=No+Image');//thay đổi ảnh đại diện khi người dùng tải lên ảnh mới

    const navigate = useNavigate();

    const userId = localStorage.getItem("id");
    //console.log(idUser);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCompetition((prev) => ({
            ...prev,
            userId: userId,
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

    const handleInputAward = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAward((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //kiểm tra người dùng nhập vào
    const validateForm = () => {
        const errors = {};
        let valid = true;

        // Kiểm tra tên cuộc thi
        if (!competition.name) {
            errors.name = "Vui lòng nhập tên cuộc thi.";
            valid = false;
        }

        // Kiểm tra ngày bắt đầu không được nhỏ hơn ngày hiện tại
        const today = new Date().toISOString().split('T')[0];
        if (new Date(competition.startDate) < new Date(today)) {
            errors.startDate = "Ngày bắt đầu không được nhỏ hơn ngày hiện tại.";
            valid = false;
        }

        // Kiểm tra ngày kết thúc không được nhỏ hơn ngày bắt đầu
        if (new Date(competition.endDate) < new Date(competition.startDate)) {
            errors.endDate = "Ngày kết thúc không được nhỏ hơn ngày bắt đầu.";
            valid = false;
        }
        // Kiểm tra mô tả
        if (!competition.description) {
            errors.description = "Vui lòng nhập mô tả cuộc thi.";
            valid = false;
        }

        // Kiểm tra ảnh đại diện
        if (!file) {
            errors.image = "Vui lòng tải lên ảnh đại diện.";
            valid = false;
        }

        // Kiểm tra giải nhất
        if (!award.firstPlace) {
            errors.firstPlace = "Vui lòng nhập tên giải nhất.";
            valid = false;
        }

        // Kiểm tra giải nhì
        if (!award.secondPlace) {
            errors.secondPlace = "Vui lòng nhập tên giải nhì.";
            valid = false;
        }

        // Kiểm tra giải ba
        if (!award.thirdPlace) {
            errors.thirdPlace = "Vui lòng nhập tên giải ba.";
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
            axiosClient.post(`Competitions`, competition)
                .then((res) => {
                    const competitionId = res.data.id;
                    //upload anh dai dien
                    const formData = new FormData();
                    formData.append("file", file);
                    axios.post(`https://localhost:7164/api/Competitions/upload/${competitionId}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                        }
                    });

                    const createAward = (name, order) => {
                        axiosClient.post(`Awards`, {
                            nameAward: name,
                            order: order,
                            competitionId: competitionId
                        });
                    }
                    // Tạo giải thưởng "Nhất" nếu có tên được nhập
                    if (award.firstPlace) {
                        createAward(award.firstPlace, 1);
                    }
                    // Tạo giải thưởng "Nhì" nếu có tên được nhập
                    if (award.secondPlace) {
                        createAward(award.secondPlace, 2);
                    }
                    // Tạo giải thưởng "Ba" nếu có tên được nhập
                    if (award.thirdPlace) {
                        createAward(award.thirdPlace, 3);
                    }
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate("/admin/competition/list");
                    }, 2000);
                }).catch(() => {
                    setShowErr(true);
                    setIsSubmitting(false); // Bật lại nút submit nếu có lỗi
                })
        } else {
            setShowErr(true);
        }
    };

    return (
        <>
            {/* {showSuccess && <div className="alert alert-success">Link den chi tiet!</div>} */}
            <Container >
                <Form onSubmit={handleSubmit} >
                    <Row>
                        <Col md={9} className="block">

                            <Form.Group className="mb-2">
                                <Form.Label>Tên cuộc thi</Form.Label>
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
                            <Form.Group className="mb-2">
                                <Form.Label>Giải nhất</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstPlace"
                                    onChange={handleInputAward}
                                    isInvalid={error.firstPlace} />
                                <Form.Control.Feedback type="invalid">{error.firstPlace}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Giải nhì</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="secondPlace"
                                    onChange={handleInputAward}
                                    isInvalid={error.secondPlace} />
                                <Form.Control.Feedback type="invalid">{error.secondPlace}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Giải ba</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="thirdPlace"
                                    onChange={handleInputAward}
                                    isInvalid={error.thirdPlace} />
                                <Form.Control.Feedback type="invalid">{error.thirdPlace}</Form.Control.Feedback>
                            </Form.Group>
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

                    <Button variant="success" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Đã tạo cuộc thi..." : "Lưu"}
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
        </>
    );
};

export default CompetitionAdd;
