import React, { useState } from 'react';
import { Container, Row, Col, Image, Form, Button, Table, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import './Submission.scss'
import { useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../UseAuth';
const SubmissionDetail = () => {
    const { id } = useParams();
    const userId = localStorage.getItem("id");
    //modal danh gia
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //modal chi tiết     result
    const [resultToDetail, setResultToDetail] = useState({});
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    const [submission, setSubmission] = useState({ user: {} });//bài thi
    const [results, setResults] = useState([{ user: {} }]);//danh sách các đánh giá
    const [result, setResult] = useState();//để đánh giá khi giáo viên chưa đánh giá bài thi này
    const [averagRating, setAverageRating] = useState(0); //trung bình số sao
    const [isUserReviewed, setIsUserReviewed] = useState(false); //trạng thái đánh giá của giáo viên đăng nhập
    useAuth(`Bài thi ${submission.name}`)
    //Xem ảnh lớn nhất
    const [showImageModal, setShowImageModal] = useState(false);
    const [largeImageSrc, setLargeImageSrc] = useState('');
    const showLargeImage = (imagePath) => {
        setLargeImageSrc(imagePath);
        setShowImageModal(true);
    };
    const imageTooltip = (
        <Tooltip id="image-tooltip">Nhấp vào để xem chi tiết hình ảnh</Tooltip>
    );

    //end
    //lấy chi tiết bài thi
    useEffect(() => {
        axiosClient.get(`Submissions/${id}`)
            .then(res => {
                setSubmission(res.data);
            })
    }, []);
    useEffect(() => {
        axiosClient.get(`Results/submission/${id}`)
            .then(res => {
                setResults(res.data);
                // Tính trung bình số sao
                var totalRating = res.data.reduce((acc, obj) => {
                    if (obj.user.id === userId) { //kiểm tra có người dùng trong danh sách các đánh giá hay không
                        setIsUserReviewed(true);
                    }
                    return acc + obj.rating; //trả về trung bình số sao
                }, 0);
                setAverageRating((totalRating / res.data.length).toFixed(1));
            })
    }, [show]);
    const dateFormat = (str) => {
        const date = new Date(str);
        var yy = date.getFullYear();
        var mm = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
        var dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return (yy + "-" + mm + "-" + dd);
    }
    //
    const fullStars = Math.floor(averagRating); // Số ngôi sao đầy
    const remainder = averagRating - fullStars; // Phần thập phân
    // console.log(fullStars);

    //rating trong modals + đánh giá bài thi
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleMouseOver = (rating) => {
        setHoveredRating(rating);
    };
    const handleMouseOut = () => {
        setHoveredRating(0);
    }
    const handleClick = (rating) => {
        setRating(rating);
        setResult((prev) => ({
            ...prev,
            rating: rating,
        }));
    };
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setResult((prev) => ({
            ...prev,
            submissionId: id,
            userId: userId,
            [name]: value,
        }));
    };
    const handleSubmit = () => {
        axiosClient.post(`Results`, result).then(res => {
            //console.log(res.data);
            handleClose();
        });
    }
    //end
    //modal result
    const showDetal = (result) => {
        handleShowDetail();
        setResultToDetail(result);
    }

    //end
    return (<>
        <Container>
            <Button
                variant="success"
                className="submit-button"
                onClick={handleShow}
                disabled={isUserReviewed}>
                {isUserReviewed ? 'Bạn đã đánh giá bài thi này' : 'Đánh giá'}
            </Button>

            <Row className='block'>
                <Col md={6}>
                    <Form>
                        <Form.Group controlId="field1">
                            <Form.Label>Tên tác phẩm</Form.Label>
                            <Form.Control type="text" value={submission.name} readOnly />
                        </Form.Group>
                        <Form.Group controlId="field2">
                            <Form.Label>Ngày nộp</Form.Label>
                            <Form.Control type="text" value={dateFormat(submission.submissionDate)} readOnly />
                        </Form.Group>
                        <Form.Group controlId="field2">
                            <Form.Label>Người nộp</Form.Label>
                            <Form.Control type="text" readOnly value={submission.user.fullName} />
                        </Form.Group>
                        <br></br>
                    </Form>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="ratings">
                        <div className="star-rating">
                            {/* Ngôi sao đầy */}

                            {
                                fullStars ? (
                                    [...Array(fullStars)].map((_, index) => (
                                        <span key={index} className="star filled">
                                            ★
                                        </span>
                                    ))
                                ) : null
                            }


                            {/* Ngôi sao không đầy */}
                            {remainder > 0 && (
                                <div className="star partial">
                                    <span className="star-content">
                                        ★
                                    </span>
                                </div>
                            )}

                            <p>Trung bình {averagRating} sao</p>
                        </div>
                    </Form.Group>
                    <OverlayTrigger placement="bottom" overlay={imageTooltip}>
                        <Image
                            style={{ cursor: "pointer" }}
                            src={`https://localhost:7164/Images/submissions/${submission.imagePath}`}
                            fluid
                            width={"300px"}
                            onClick={() => showLargeImage(`https://localhost:7164/Images/submissions/${submission.imagePath}`)}
                        />
                    </OverlayTrigger>
                </Col>
            </Row>
            <Row className='block'>
                <Col md={6}>
                    <Form.Group controlId="field4">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" rows={5} value={submission.description} readOnly />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form>
                        <Form.Group controlId="field5">
                            <Form.Label>Câu trích dẫn</Form.Label>
                            <Form.Control as="textarea" rows={5} value={submission.quote} readOnly />
                        </Form.Group>
                    </Form>
                </Col>
                <br></br>
            </Row>

            <Row className='block'>
                <h5>Danh sách các đánh giá</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Số sao</th>
                            <th>Người đánh giá</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index}>
                                <td>{result.rating !== null ? result.rating : 'N/A'}</td>
                                <td>{result.user && result.user.fullName !== null ? result.user.fullName : 'N/A'}</td>
                                <td>
                                    <Button variant="success" onClick={() => showDetal(result)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
        {/* //modals danh gia*/}
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Đánh giá bài thi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={3}>
                            <strong>Xếp hạng: {rating} (sao)</strong>
                        </Col>
                        <Col>
                            <div className="starRating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`star2 ${star <= (hoveredRating || rating) ? "filled2" : ""}`}
                                        onMouseOver={() => handleMouseOver(star)}
                                        onMouseOut={handleMouseOut}
                                        onClick={() => handleClick(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" >
                        <Form.Label><strong>Điểm tích cực</strong></Form.Label>
                        <Form.Control as="textarea" rows={2} name='positivePoint' onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label><strong>Điểm hạn chế</strong></Form.Label>
                        <Form.Control as="textarea" rows={2} name='limitation' onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label><strong>Lĩnh vực cải tiến</strong></Form.Label>
                        <Form.Control as="textarea" rows={2} name='improvementArea' onChange={handleInput} />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Thoát
                </Button>
                <Button variant="success" onClick={handleSubmit}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
        {/* //modal show chi tiet danh gia  */}
        {/* modal detal */}
        <Modal show={showDetail} onHide={handleCloseDetail} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết đánh giá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Số sao: </strong>{resultToDetail.rating !== null ? resultToDetail.rating : 'N/A'}</p>
                <p><strong> Điểm tích cực: </strong>{resultToDetail.improvementArea !== null ? resultToDetail.improvementArea : 'N/A'}</p>
                <p><strong>Điểm hạn chế: </strong>{resultToDetail.limitation !== null ? resultToDetail.limitation : 'N/A'}</p>
                <p><strong>Lĩnh vực cần cải tiến: </strong>{resultToDetail.positivePoint !== null ? resultToDetail.positivePoint : 'N/A'}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDetail}>
                    Thoát
                </Button>
            </Modal.Footer>
        </Modal>

        {/* modal chi tiét hình ảnh */}
        <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết hình ảnh</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image src={largeImageSrc} fluid />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowImageModal(false)}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>

    </>);
}

export default SubmissionDetail;