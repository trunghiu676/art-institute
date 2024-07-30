import React, { useState } from 'react';
import { Container, Row, Col, Image, Form, Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from "../../UseAuth";

const PaintingEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [painting, setPainting] = useState({ exhibition: {} });//bài thi
    useAuth(`Edit bức tranh ${painting.paintingName}`)

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
    //lấy chi tiết tranh
    useEffect(() => {
        axiosClient.get(`ExhibitionPaintings/${id}`)
            .then(res => {
                setPainting(res.data);
            })
    }, []);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setPainting((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = () => {
        axiosClient.put(`ExhibitionPaintings/${id}`, painting)
            .then(() => {
                toast.success("Thành công")
                setTimeout(() => {
                    navigate(`/admin/exhibition/edit/${painting.exhibition.id}`)
                }, 1500);
            })
    }

    return (<>
        <Container>
            <Button
                variant="success"
                className="submit-button"
                onClick={handleSubmit}
            >
                Cập nhật
            </Button>

            <Row className='block'>
                <Col md={6}>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Check
                                type="switch"
                                name="status"
                                label="Hiện"
                                checked={painting.status}
                                onChange={handleInput}
                            />
                        </Form.Group>
                        <Form.Group controlId="field1">
                            <Form.Label>Tên tác phẩm</Form.Label>
                            <Form.Control type="text" name='paintingName' value={painting.paintingName} onChange={handleInput} />
                        </Form.Group>
                        <Form.Group controlId="field2">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control type="text" name='price' value={painting.price} onChange={handleInput} />
                        </Form.Group>
                        <Form.Group controlId="field4">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control as="textarea" name='description' rows={5} value={painting.description} onChange={handleInput} />
                        </Form.Group>
                        <br></br>
                    </Form>
                </Col>
                <Col md={6}>
                    <OverlayTrigger placement="bottom" overlay={imageTooltip}>
                        <Image
                            style={{ cursor: "pointer" }}
                            src={`https://localhost:7164/Images/submissions/${painting.image}`}
                            fluid
                            width={"500px"}
                            onClick={() => showLargeImage(`https://localhost:7164/Images/submissions/${painting.image}`)}
                        />
                    </OverlayTrigger>
                </Col>
            </Row>

        </Container>

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
        <ToastContainer position="top-right" autoClose={2000} />
    </>);
}

export default PaintingEdit;