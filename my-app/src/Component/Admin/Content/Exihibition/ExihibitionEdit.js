import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../../../axiosClient";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Button, Container, Toast, ToastContainer, Row, Col, Table, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useAuth from "../../UseAuth";

const ExhibitionEdit = () => {

    const { id } = useParams();
    const [exhibition, setExhibition] = useState({});
    const [file, setFile] = useState();//image
    const [paintings, setPaintings] = useState([]);
    const [error, setError] = useState({});
    const [showErr, setShowErr] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [avatarPath, setAvatarPath] = useState('');//thay đổi ảnh đại diện khi người dùng tải lên ảnh mới

    const navigate = useNavigate();
    useAuth(`Edit triễn lãm ${exhibition.name}`)
    //delete
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const [paintingToDelete, setPaintingToDelete] = useState({});
    const [idPaintingDelete, setIdPaintingDelete] = useState([]);
    const showConfirmation = (painting) => {
        handleShowDelete();
        setPaintingToDelete(painting);
    }
    const handleDelete = () => {
        setIdPaintingDelete((prev) => (
            [
                ...prev,
                paintingToDelete.id,
            ])
        );
        const updatedPainting = paintings.filter(c => c.id !== paintingToDelete.id);
        setPaintings(updatedPainting);
        handleCloseDelete();
    }
    //end   
    //lấy chi tiết triễn lãm
    useEffect(() => {
        axiosClient.get(`Exhibitions/${id}`)
            .then(res => {
                setExhibition(res.data);
                setAvatarPath(`https://localhost:7164/Images/exhibition/${res.data.image}`)
            })
    }, []);
    //Lấy danh sách các bức tranh thuộc triễn lãm
    useEffect(() => {
        axiosClient.get(`ExhibitionPaintings/ExhibitionId/${id}`)
            .then(res => {
                setPaintings(res.data);
                //console.log(paintings);
            })
    }, [])
    //format lai ngay
    const dateFormat = (str) => {
        const date = new Date(str);
        var yy = date.getFullYear();
        var mm = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return (yy + "-" + mm + "-" + dd);
    }
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setExhibition((prev) => ({
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

    //kiểm tra người dùng nhập vào
    const validateForm = () => {
        const errors = {};
        let valid = true;

        // Kiểm tra tên cuộc thi
        if (!exhibition.name) {
            errors.name = "Vui lòng nhập tên triễn lãm.";
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

        setError(errors);
        return valid;
    };
    //console.log(exhibition);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            if (idPaintingDelete.length > 0) {
                idPaintingDelete.map(idPainting => {
                    axiosClient.delete(`ExhibitionPaintings/${idPainting}`, idPainting);
                });
            }
            //  Kiểm tra xem người dùng đã chọn file mới chưa
            if (file) {
                // Nếu có file mới, thực hiện các thao tác liên quan đến file
                const formData = new FormData();
                formData.append("file", file);
                axios.post(`https://localhost:7164/api/Exhibitions/upload/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
            }
            axiosClient.put(`Exhibitions/${id}`, exhibition)
                .then((res) => {
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate("/admin/exhibition/list");
                    }, 2000);
                }).catch(() => {
                    setShowErr(true);
                });
        } else {
            setShowErr(true);
        }
    }
    //console.log(exhibition);

    return (<>
        {showSuccess && <div className="alert alert-success">Link den chi tiet!</div>}
        <Container className="block">
            <Form onSubmit={handleSubmit} >
                <Button variant="success" type="submit">
                    Cập nhật
                </Button>
                <hr />
                <Row>
                    <Col md={9}>
                        <Form.Group className="mb-2">
                            <Form.Label>Tên triễn lãm</Form.Label>
                            <Form.Control type="text" name="name" value={exhibition.name} onChange={handleInput} isInvalid={error.name} />
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
                                    value={dateFormat(exhibition.startDate)}
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
                                    value={dateFormat(exhibition.endDate)}
                                />
                                <Form.Control.Feedback type="invalid">{error.endDate}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-2">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="description"
                                onChange={handleInput}
                                value={exhibition.description}
                                isInvalid={error.description} />
                            <Form.Control.Feedback type="invalid">{error.description}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-2">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Check
                                type="switch"
                                name="status"
                                label="Hiện"
                                checked={exhibition.status}
                                onChange={handleInput}
                            />
                        </Form.Group>
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


            </Form>
            <Row className="block">
                <h4>Danh sách các bức tranh</h4>
                {/* danh sách các bài thi của cuộc thi cụ th */}
                <Table className="block">
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên tác phẩm</th>
                            <th>Giá</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            paintings.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            <img src={(`https://localhost:7164/Images/submissions/${item.image}`)} width={"50px"} />
                                        </td>
                                        <td>
                                            <Link to={`/admin/exhibition/painting/edit/${item.id}`}>{item.paintingName}</Link>
                                        </td>
                                        <td>{(item.price)}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => showConfirmation(item)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                {/* end */}
            </Row>
        </Container>

        <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
            <Toast onClose={() => setShowErr(false)} show={showErr} delay={3000} autohide>
                <Toast.Header className="bg-danger">
                    <strong className="me-auto">Lỗi</strong>
                    <small>now</small>
                </Toast.Header>
                <Toast.Body>Sửa thất bại, kiểm tra lại dữ liệu!</Toast.Body>
            </Toast>
        </ToastContainer>
        <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
            <Toast onClose={() => setShowSuccess(false)} show={showSuccess} delay={3000} autohide>
                <Toast.Header className="bg-success">
                    <strong className="me-auto">Thành công</strong>
                    <small>now</small>
                </Toast.Header>
                <Toast.Body>Sửa thành công!</Toast.Body>
            </Toast>
        </ToastContainer>

        {/* //modals delete painting */}
        <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
                <Modal.Title>Xóa bức tranh</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có muốn xóa bức tranh: {paintingToDelete.paintingName}!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    <FontAwesomeIcon icon={faX} />
                    &nbsp; Hủy bỏ
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                    &nbsp; Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default ExhibitionEdit;