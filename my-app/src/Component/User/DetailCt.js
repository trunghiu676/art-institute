import './DetailCt.scss'
import { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import axiosClient from '../axiosClient';
import axios from 'axios';

const DetailCt = () => {
    const [competition, setCompetition] = useState({});
    const [submissions, setSubmissions] = useState([{ user: {}, competition: {} }]);
    const [submission, setsubmission] = useState({});
    const [awards, setAwards] = useState([{ nameAward: '', submission: {} }]);
    const { id } = useParams();

    const userId = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    const dateFormat = (srt) => {
        const date = new Date(srt);
        var yy = date.getFullYear();
        var mm = date.getMonth();
        var dd = date.getDate();
        return (dd + "/" + mm + "/" + yy);
    }
    //  console.log(submissions);

    //nộp bài thi
    const [avatarPath, setAvatarPath] = useState('https://via.placeholder.com/150x120&text=No+Image');//thay đổi ảnh đại diện khi người dùng tải lên ảnh mới
    const [file, setFile] = useState();//image
    const [error, setError] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);//lưu giá trị đã nộp bài hay chưa 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInput = (e) => { //ghi các giá trị người dùng nhập vào trang nộp bài thi
        const name = e.target.name;
        const value = e.target.value;
        setsubmission((prev) => ({
            ...prev,
            competitionId: id,
            submissionDate: new Date(),
            userId: userId,
            [name]: value,
        }));
    };
    const handleFile = (e) => { //lấy ảnh trong upload file
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
        if (!submission.name) {
            errors.name = "Vui lòng nhập tên bài thi.";
            valid = false;
        }

        // Kiểm tra mô tả
        if (!submission.description) {
            errors.description = "Vui lòng nhập mô tả.";
            valid = false;
        }
        if (!submission.quote) {
            errors.quote = "Vui lòng nhập câu trích dẫn.";
            valid = false;
        }

        // Kiểm tra ảnh đại diện
        if (!file) {
            errors.image = "Vui lòng tải lên bức tranh.";
            valid = false;
        }

        setError(errors);
        return valid;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(submission);
        if (isSubmitting) {
            return; // Không cho phép submit lại nếu đang trong quá trình submit
        }
        const isValid = validateForm();
        if (isValid) {
            setIsSubmitting(true); // Đánh dấu đang trong quá trình submit
            axiosClient.post(`Submissions`, submission) //tiến hành gửi tranh nếu đã qua bước kiểm tra dữ liệu validateForm
                .then((res) => {
                    const id = res.data.id;
                    //upload anh dai dien
                    const formData = new FormData();
                    formData.append("file", file);
                    axios.post(`https://localhost:7164/api/Submissions/upload/${id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                        }
                    });
                    toast.success("Nộp bài thành công")
                    setTimeout(() => {
                        handleClose();
                    }, 1000);
                }).catch(() => {
                    toast.error("Lỗi")
                    setIsSubmitting(false); // Bật lại nút submit nếu có lỗi
                })
        } else {
            toast.error("Lỗi");
        }
    }
    //end
    // Kiểm tra xem có người dùng có userId là 'hiu' trong danh sách submissions không
    const userSubmitted = submissions.some(submission => submission.userId === userId);

    useEffect(() => {
        axiosClient.get(`Competitions/${id}`).then(res => {
            setCompetition(res.data);
            document.title = `${res.data.name}`;
        });
        axiosClient.get(`Submissions/Competition_Id/${id}`).then(res => { setSubmissions(res.data) })
        axiosClient.get(`Awards/Competition/${id}`).then(res => { setAwards(res.data) });
    }, [show]);

    return (<>
        <div id="container" >
            <div className="product-details">

                <h1>{competition.name} </h1>

                <p className="information">" {competition.description} "</p>
                <p className="information">" Thời gian: Từ {dateFormat(competition.startDate)} đến {dateFormat(competition.endDate)}  "</p>
                <p className="information">" Giải nhất: {awards.length > 0 ? awards[0].nameAward : 'Chưa có giải nhất'} "</p>
                <p className="information">" Giải nhì: {awards.length > 1 ? awards[1].nameAward : 'Chưa có giải nhì'}"</p>
                <p className="information">" Giải ba: {awards.length > 2 ? awards[2].nameAward : 'Chưa có giải ba'}"</p>
                <br /><br /> <br />
                <div className="control">
                    {/* Kiểm tra nếu có người dùng 'hiu' đã nộp bài */}
                    {userSubmitted ? (
                        <Button className='btnn' disabled>
                            <span className="button">Bạn đã nộp bài thi</span>
                        </Button>
                    ) : (
                        /* Nếu không có, hiển thị nút "Nộp bài dự thi" */
                        new Date(competition.startDate) < new Date() && new Date(competition.endDate) > new Date() && role === "Student" && (
                            <Button className='btnn' onClick={handleShow}>
                                <span className="button">Nộp bài dự thi</span>
                            </Button>
                        )
                    )}
                </div>
            </div>
            <div className="product-image">
                <img src={`https://localhost:7164/images/competition/${competition.image}`} width={720} />
            </div>
        </div >
        {//tranh đạt giải trong cuộc thi
            (awards[0].userId) ?
                (
                    <>
                        <div className='body-title1'>
                            <div className="new_title position-relative text-center mb-3">
                                <h3 className="">

                                    Tranh đoạt giải

                                </h3>
                            </div>
                        </div>
                        <div className='body-menu2 container ' >
                            <div className='row'>
                                {
                                    awards.slice(0, 3).map(item => {
                                        return (
                                            <div className='col-md-2 col-lg-4 col-md-12 col-sm-24' key={item.submission.id}>
                                                <NavLink to={`/bai-thi/${item.submission.id}`} style={{ textDecoration: 0, color: 'black' }}>
                                                    <Card className='cardimg' style={{ width: '26.5rem' }}>
                                                        <Card.Img variant="top" src={`https://localhost:7164/images/submissions/${item.submission.image}`} />
                                                        <Card.Body>
                                                            <Card.Text className='title'>
                                                                <h2 className='title-h2'>{item.submission.name} - {item.fullName}</h2>
                                                                <span className='title-span'>"Giải {(item.order == 1) ? "Nhất" : (item.order == 2) ? "Nhì" : "Ba"}"</span>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </NavLink>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>

                    </>
                ) : ''
        }
        {//các bức tranh đc sinh viên gửi lên 
            (submissions[0]) ?
                (
                    <>
                        <div className='body-title1'>
                            <div className="new_title position-relative text-center mb-3">
                                <h3 className="">

                                    Các bức tranh đã gửi lên bởi sinh viên

                                </h3>
                            </div>
                        </div>
                        <div className='body-menu2 container ' >
                            <div className='row'>
                                {
                                    submissions.map(item => {
                                        return (
                                            <div className='col-md-2 col-lg-4 col-md-12 col-sm-24' key={item.id}>
                                                <NavLink to={`/bai-thi/${item.id}`} style={{ textDecoration: 0, color: 'black' }}>
                                                    <Card className='cardimg' style={{ width: '26.5rem' }}>
                                                        <Card.Img variant="top" src={`https://localhost:7164/images/submissions/${item.imagePath}`} />
                                                        <Card.Body>
                                                            <Card.Text className='title'>
                                                                <h2 className='title-h2'>"{item.name}" </h2>
                                                                <span className='title-span'>{item.user.fullName}</span>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </NavLink>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>

                    </>
                ) : ''
        }
        {/* //modal hiển thị nộp bài thi  */}
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Nộp bài thi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label><strong>Tên tác phẩm: </strong></Form.Label>
                        <Form.Control type='text' name='name' onChange={handleInput} onInvalid={error.name} />
                        <Form.Control.Feedback type="invalid">{error.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label><strong>Mô tả: </strong></Form.Label>
                        <Form.Control as="textarea" rows={2} name='description' onChange={handleInput} onInvalid={error.description} />
                        <Form.Control.Feedback type="invalid">{error.description}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label><strong>Câu trích dẫn: </strong></Form.Label>
                        <Form.Control as="textarea" rows={2} name='quote' onChange={handleInput} onInvalid={error.quote} />
                        <Form.Control.Feedback type="invalid">{error.quote}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ảnh đại diện</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleFile}
                            isInvalid={error.image} />
                        <Form.Control.Feedback type="invalid">{error.image}</Form.Control.Feedback>
                        <div style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '8px' }}>
                            <img src={avatarPath} width={300} />
                        </div>
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Thoát
                </Button>
                <Button variant="success" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Đã nộp..." : "Nộp"}
                </Button>
            </Modal.Footer>
        </Modal>
        <ToastContainer position="top-right" autoClose={1000} />
    </>);
}

export default DetailCt;