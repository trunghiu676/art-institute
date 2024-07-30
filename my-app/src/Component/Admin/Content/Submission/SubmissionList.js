import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Container, Modal, Row, Spinner, Table } from "react-bootstrap";
import axiosClient from "../../../axiosClient";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import useAuth from "../../UseAuth";

const SubmissionList = () => {
    useAuth("Danh sách bài thi");
    const [submissions, setSubmissions] = useState([{ user: {}, competition: {} }]);
    const [loading, setLoading] = useState(true);
    //delete
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const [submissionToDelete, setSubmissionToDelete] = useState({});
    const showConfirmation = (submission) => {
        handleShowDelete();
        setSubmissionToDelete(submission);
    }
    const handleDelete = () => {
        axiosClient.put(`/Submissions/Delete/${submissionToDelete.id}`)
            .then(res => {
                const updatedCompetitions = submissions.filter(c => c.id !== submissionToDelete.id);
                setSubmissions(updatedCompetitions);

                toast.success("Xóa thành công!", { autoClose: 2000 }); // Hiển thị thông báo xóa thành công
            })
            .catch(error => {
                toast.error("Xóa thất bại!"); // Hiển thị thông báo xóa thất bại
            });

        handleCloseDelete();
    }


    useEffect(() => {
        axiosClient.get(`Submissions`)
            .then(res => {
                const data = res.data.filter(item => item.isDelete === false);
                setSubmissions(data);
                setLoading(false);
            })
    }, [submissionToDelete, showDelete]);
    const dateFormat = (srt) => {
        const date = new Date(srt);
        var yy = date.getFullYear();
        var mm = date.getMonth();
        var dd = date.getDate();
        return (dd + "/" + mm + "/" + yy);
    }
    console.log(submissions);
    //phân trang
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Số phần tử trên mỗi trang
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(0); // Reset trang về 0 khi thay đổi số hàng hiển thị
    };

    const pageCount = Math.ceil(submissions.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentSubmissions = submissions.slice(offset, offset + itemsPerPage);
    //end

    return (
        <Container>
            <Table className="block">
                <thead>
                    <tr>
                        <th>Ảnh</th>
                        <th>Tên tác phẩm</th>
                        <th>Ngày nộp</th>
                        <th>Người nộp</th>
                        <th>Thuộc cuộc thi</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                {loading ? (
                    // Hiệu ứng tải trang sẽ được hiển thị trong lúc đợi dữ liệu
                    <Spinner animation="border" variant="primary" />
                ) : (
                    <tbody>
                        {
                            currentSubmissions
                                .map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>
                                                <img src={(`https://localhost:7164/Images/submissions/${item.imagePath}`)} width={"50px"} />
                                            </td>
                                            <td>
                                                <Link to={`/admin/submission/edit/${item.id}`}>{item.name}</Link>
                                            </td>
                                            <td> {dateFormat(item.submissionDate)}</td>
                                            <td>{item.user.fullName}</td>
                                            <td>{item.competition.name}</td>
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
                )}
            </Table>
            {/*  phân trang */}
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={1} // Hiển thị trang hiện tại và 2 trang trước và sau trang hiện tại
                        pageRangeDisplayed={2} // Hiển thị tổng cộng 5 trang trong thanh phân trang
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                        initialPage={currentPage} // Đặt trang ban đầu khi load component
                        disableInitialCallback={true} // Không gọi hàm onPageChange khi ban đầu load component
                        previousClassName="page-link"
                        nextClassName="page-link"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousLinkClassName="page-link"
                        nextLinkClassName="page-link"
                    />
                </Col>
                <Col md={4}>
                    <div className="news-per-page">
                        <label>Hiển thị:</label>
                        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </Col>
            </Row>
            {/* end */}
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa bài thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa bài thi này {submissionToDelete.name}!</Modal.Body>
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
            <ToastContainer position="top-right" autoClose={2000} />
        </Container>
    );
}

export default SubmissionList;