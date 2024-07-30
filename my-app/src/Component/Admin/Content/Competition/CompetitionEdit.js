import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table, Toast, ToastContainer } from "react-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../axiosClient";
import axios from "axios";
import useAuth from "../../UseAuth";

const CompetitionEdit = () => {
    var { id } = useParams()

    const [competition, setCompetition] = useState({});
    const [file, setFile] = useState();//image
    const [error, setError] = useState({});
    const [showErr, setShowErr] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [award1, setAward1] = useState({});//lấy ra giải nhất
    const [award2, setAward2] = useState({});//lấy ra giải nhì
    const [award3, setAward3] = useState({});//lấy ra giải 3
    const [submissions, setSubmissions] = useState([]);
    const [awardsEnabled, setAwardsEnabled] = useState();

    const [avatarPath, setAvatarPath] = useState('');//thay đổi ảnh đại diện khi người dùng tải lên ảnh mới

    const navigate = useNavigate();
    useAuth(`Edit cuộc thi ${competition.name}`)
    //lấy chi tiết cuộc thi
    useEffect(() => {
        axiosClient.get(`Competitions/${id}`)
            .then(res => {
                setCompetition(res.data);
                setAvatarPath(`https://localhost:7164/Images/competition/${res.data.image}`)
            });
        //lấy 3 giải thưởng thuộc cuộc thi này
        axiosClient.get(`Awards/Competition_Id/${id}`)
            .then(res => {
                setAward1(res.data[0]);
                setAward2(res.data[1]);
                setAward3(res.data[2]);
                // console.log(res.data[0]);
                if (res.data[0].userId == null ? setAwardsEnabled(false) : setAwardsEnabled(true));
            });
    }, []);
    const [isCompetitionEnded, setIsCompetitionEnded] = useState(false);
    //lấy ngày kết thúc so với ngày hiện tại => chỉ cuộc thi nào kết thúc mới được phép trao giải
    useEffect(() => {
        const today = new Date();
        const competitionEndDate = new Date(competition.endDate);
        setIsCompetitionEnded(competitionEndDate < today);
    }, [competition.endDate]);

    //lấy danh sách các bài thi thuộc cuộc thi này, (các bài thi đã được tính trung bình số sao)
    useEffect(() => {
        axiosClient.get(`Submissions/average-ratings/${id}`)
            .then(res => {
                setSubmissions(res.data);
            })
    }, [id]);
    // console.log(submissions);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setCompetition((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // console.log(competition);
    const handleFile = (e) => {
        setFile(e.target.files[0]);//lấy ảnh
        //thay đổi ảnh
        const reader = new FileReader();
        reader.onload = () => {
            setAvatarPath(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    const dateFormat = (str) => {
        const date = new Date(str);
        var yy = date.getFullYear();
        var mm = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return (yy + "-" + mm + "-" + dd);
    }

    //kiểm tra người dùng nhập vào
    const validateForm = () => {
        const errors = {};
        let valid = true;

        // Kiểm tra tên cuộc thi
        if (!competition.name) {
            errors.name = "Vui lòng nhập tên cuộc thi.";
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

        // Kiểm tra giải nhất
        if (award1.nameAward == '') {
            errors.firstPlace = "Vui lòng nhập tên giải nhất.";
            valid = false;
        }

        // Kiểm tra giải nhì
        if (award2.nameAward == '') {
            errors.secondPlace = "Vui lòng nhập tên giải nhì.";
            valid = false;
        }

        // Kiểm tra giải ba
        if (award3.nameAward == '') {
            errors.thirdPlace = "Vui lòng nhập tên giải ba.";
            valid = false;
        }

        setError(errors);
        return valid;
    };

    // nút trao giải
    const toggleAwards = () => {
        setAwardsEnabled(!awardsEnabled);
    };
    useEffect(() => {
        if (awardsEnabled) {
            // Gán giải thưởng cho 3 hàng đầu
            if (submissions.length >= 3) {
                submissions[0].award = "Giải nhất";  // Giải nhất
                submissions[1].award = "Giải nhì"; // Giải nhì
                submissions[2].award = "Giải ba";  // Giải ba

                setAward1((prev) => ({ ...prev, userId: submissions[0].userId }));
                setAward2((prev) => ({ ...prev, userId: submissions[1].userId }));
                setAward3((prev) => ({ ...prev, userId: submissions[2].userId }));
            }
        } else {
            if (submissions.length >= 3) {
                submissions[0].award = "Chưa trao giải";
                submissions[1].award = "Chưa trao giải";
                submissions[2].award = "Chưa trao giải";

                setAward1((prev) => ({ ...prev, userId: null }));
                setAward2((prev) => ({ ...prev, userId: null }));
                setAward3((prev) => ({ ...prev, userId: null }));
            }
        }
    }, [awardsEnabled, submissions]);
    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (isValid) {

            axiosClient.put(`Awards/${award1.id}`, award1);
            axiosClient.put(`Awards/${award2.id}`, award2);
            axiosClient.put(`Awards/${award3.id}`, award3);

            // Kiểm tra xem người dùng đã chọn file mới chưa
            if (file) {
                // Nếu có file mới, thực hiện các thao tác liên quan đến file
                const formData = new FormData();
                formData.append("file", file);
                axios.post(`https://localhost:7164/api/Competitions/upload/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
            }
            axiosClient.put(`Competitions/${id}`, competition)
                .then(() => {
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate("/admin/competition/list");
                    }, 2000);
                }).catch(() => {
                    setShowErr(true);
                })
        } else {
            setShowErr(true);
        }
    };

    return (<>
        <Container>
            <Form onSubmit={handleSubmit}>
                <Button type="submit" variant="success">Cập nhật</Button> <hr />
                <Row>
                    <Col xs={12} md={9} className="block">
                        <Form.Group className="mb-2">
                            <Form.Label>Tên cuộc thi</Form.Label>
                            <Form.Control type="text"
                                name="name"
                                value={competition.name}
                                onChange={handleInput}
                                isInvalid={error.name} />
                            <Form.Control.Feedback type="invalid">{error.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Ngày bắt đầu</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    value={dateFormat(competition.startDate)}
                                    onChange={handleInput}
                                />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Ngày kết thúc</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    value={dateFormat(competition.endDate)}
                                    onChange={handleInput}
                                    isInvalid={error.endDate}
                                />
                                <Form.Control.Feedback type="invalid">{error.endDate}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-2">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea" rows={6}
                                name="description"
                                value={competition.description}
                                onChange={handleInput}
                                isInvalid={error.description} />
                            <Form.Control.Feedback type="invalid">{error.description}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Giải thưởng Nhất </Form.Label>
                            <Form.Control
                                type="text"
                                name="firstPlace"
                                value={award1.nameAward}
                                onChange={(e) => setAward1((prev) => ({
                                    ...prev,
                                    nameAward: e.target.value,
                                }))}
                                isInvalid={error.firstPlace}
                            />
                            <Form.Control.Feedback type="invalid">{error.firstPlace}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Giải thưởng Nhì </Form.Label>
                            <Form.Control
                                type="text"
                                name="secondPlace"
                                value={award2.nameAward}
                                onChange={(e) => setAward2((prev) => ({
                                    ...prev,
                                    nameAward: e.target.value,
                                }))}
                                isInvalid={error.secondPlace}
                            />
                            <Form.Control.Feedback type="invalid">{error.secondPlace}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Giải thưởng Ba </Form.Label>
                            <Form.Control
                                type="text"
                                name="thirdPlace"
                                value={award3.nameAward}
                                onChange={(e) => setAward3((prev) => ({
                                    ...prev,
                                    nameAward: e.target.value,
                                }))}
                                isInvalid={error.thirdPlace}
                            />
                            <Form.Control.Feedback type="invalid">{error.thirdPlace}</Form.Control.Feedback>
                        </Form.Group>


                    </Col>
                    <Col xs={6} md={3} className="block">
                        <Form.Group className="mb-2">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Check
                                type="switch"
                                name="status"
                                label="Hiện"
                                checked={competition.status}
                                onChange={handleInput}
                            />
                        </Form.Group>
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
                <Row className="block">
                    <h5>Danh sách các bài thi</h5>
                    <Form.Check
                        style={{ marginLeft: "15px" }}
                        type="switch"
                        label="Trao giải cho cuộc thi này"
                        className="mb-2"
                        checked={awardsEnabled}
                        disabled={submissions.length === 0 || !isCompetitionEnded}
                        onChange={toggleAwards}
                    /><hr />

                    {/* danh sách các bài thi của cuộc thi cụ th */}
                    <Table className="block">
                        <thead>
                            <tr>
                                <th>Ảnh</th>
                                <th>Tên bài thi</th>
                                <th>Ngày nộp</th>
                                <th>Người thực hiện</th>
                                <th>Số sao đạt được</th>
                                <th>Giải thưởng</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                submissions.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: "center" }}>
                                            Chưa có bài thi nào được gửi lên
                                        </td>
                                    </tr>
                                ) : (
                                    submissions.map(item => {
                                        return (
                                            <tr key={item.submissionId}>
                                                <td>
                                                    <img src={(`https://localhost:7164/Images/submissions/${item.imagePath}`)} width={"50px"} />
                                                </td>
                                                <td>
                                                    <Link to={`/admin/submission/edit/${item.submissionId}`}>{item.name}</Link>
                                                </td>
                                                <td> {dateFormat(item.submissionDate)}</td>
                                                <td>{item.userName}</td>
                                                <td>{item.averageRating}</td>
                                                <td>{item.award}</td>
                                            </tr>
                                        )
                                    })
                                )
                            }
                        </tbody>
                    </Table>
                    {/* end */}
                </Row>
            </Form>

        </Container>


        <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
            <Toast onClose={() => setShowErr(false)} show={showErr} delay={3000} autohide>
                <Toast.Header className="bg-danger">
                    <strong className="me-auto">Lỗi</strong>
                    <small>now</small>
                </Toast.Header>
                <Toast.Body>Chỉnh sửa thất bại, kiểm tra lại dữ liệu!</Toast.Body>
            </Toast>
        </ToastContainer>
        <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
            <Toast onClose={() => setShowSuccess(false)} show={showSuccess} delay={3000} autohide>
                <Toast.Header className="bg-success">
                    <strong className="me-auto">Thành công</strong>
                    <small>now</small>
                </Toast.Header>
                <Toast.Body>Chỉnh sửa thành công!</Toast.Body>
            </Toast>
        </ToastContainer>
    </>);
}

export default CompetitionEdit;