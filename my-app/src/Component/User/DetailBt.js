import './DetailBt.scss';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Figure from 'react-bootstrap/Figure'; // Thêm import Figure từ react-bootstrap
import { useState } from 'react';
import axiosClient from '../axiosClient';
import { useEffect } from 'react';
import { Button, Modal, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const DetailBt = (props) => {
    const [submission, setSubmission] = useState({ user: {}, competition: {} });
    const [results, setResults] = useState([{ user: {} }]);//danh sách các đánh giá
    const [resultToDetail, setResultToDetail] = useState({});
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    const { id } = useParams();

    const dateFormat = (srt) => {
        const date = new Date(srt);
        var yy = date.getFullYear();
        var mm = date.getMonth();
        var dd = date.getDate();
        return (dd + "/" + mm + "/" + yy);
    }
    useEffect(() => {
        axiosClient.get(`Submissions/${id}`).then(res => {
            setSubmission(res.data)
            document.title = `${res.data.name}`;
        });
    }, []);
    useEffect(() => {
        axiosClient.get(`Results/submission/${id}`)
            .then(res => {
                setResults(res.data);
            })
    }, []);
    //console.log(submission);
    const showDetal = (result) => {
        handleShowDetail();
        setResultToDetail(result);
    }
    return (
        <>
            <h5 className="linknow">
                <Breadcrumb>
                    <Breadcrumb.Item active>Chi tiết bài thi</Breadcrumb.Item>
                </Breadcrumb>
            </h5>

            <div className="w-100 mt-4 detail-quiz-container">

                <div className="container">
                    <div className="row mt-4">
                        <div className="col-lg-6 col-md-12 col-sm-12 col-12 left-content">
                            <div className="img-content">
                                <img src={`https://localhost:7164/images/submissions/${submission.imagePath}`} width={600} />
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12 col-sm-12 col-12 mt-4 mt-lg-0 right-content">
                            <div>
                                <h2 className="title-text" >
                                    {submission.name}
                                </h2><br />
                                <div className="divauthor description">
                                    <ul>
                                        <li>
                                            <p>
                                                <span  >
                                                    <span style={{ fontSize: 16 }}>
                                                        <strong>Mã số bài thi :</strong>
                                                    </span>
                                                </span>
                                                <span  >
                                                    <span style={{ fontSize: 16 }}> {submission.id}</span>
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span  >
                                                    <span style={{ fontSize: 16 }}>
                                                        <strong>Cuộc thi :</strong>
                                                    </span>
                                                </span>
                                                <span  >
                                                    <span style={{ fontSize: 16 }}> {submission.competition.name}</span>
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span  >
                                                    <span style={{ fontSize: 16 }}>
                                                        <strong>Mô Tả :</strong>
                                                    </span>
                                                </span>
                                                <span  >
                                                    <span style={{ fontSize: 16 }}> {submission.description}</span>
                                                </span>
                                            </p>
                                        </li>
                                        <li>
                                            <p>
                                                <span  >
                                                    <span style={{ fontSize: 16 }}>
                                                        <strong>Ngày gửi :</strong>
                                                    </span>
                                                </span>
                                                <span  >
                                                    <span style={{ fontSize: 16 }}> {dateFormat(submission.submissionDate)}</span>
                                                </span>
                                            </p>
                                        </li>


                                        <li>
                                            <p>
                                                <span  >
                                                    <span style={{ fontSize: 16 }}>
                                                        <strong>Câu trích dẫn :</strong>
                                                    </span>
                                                </span>
                                                <span  >
                                                    <span style={{ fontSize: 16 }}> {submission.quote}</span>
                                                </span>
                                            </p>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                      
                        <div className="col-lg-1 col-md-12 col-sm-12 col-12 mt-4 mt-lg-0">
                            <Figure className="figure-container">
                                <Figure.Image
                                    className="user-avatar"
                                    width={70}
                                    height={70}
                                    alt="User Avatar"
                                    src={`https://localhost:7164/images/avatar/${submission.user.avatar}`}
                                />
                                <Figure.Caption className="author-name">
                                    <Link to={`/${submission.user.userName}`}>
                                        Tác giả: {submission.user.fullName}
                                    </Link>
                                </Figure.Caption>
                            </Figure>
                        </div>

                        <Row className='results'>
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

                    </div>
                </div>
            </div >
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

        </>
    )
}

export default DetailBt;
