import { faEdit, faEye, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Container, Modal, Row, Spinner, Table, Image } from "react-bootstrap";
import axiosClient from "../../../axiosClient";
import { Link } from "react-router-dom";

const AdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    //delete
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const [adminToDelete, setAdminToDelete] = useState({});
    const showConfirmation = (teacher) => {
        handleShowDelete();
        setAdminToDelete(teacher);
    }
    const handleDelete = () => {
        axiosClient.put(`/Users/Delete/${adminToDelete.id}`)
            .then(res => {
                const updatedCompetitions = admins.filter(c => c.id !== adminToDelete.id);
                setAdmins(updatedCompetitions);

                toast.success("Xóa thành công!", { autoClose: 2000 }); // Hiển thị thông báo xóa thành công
            })
            .catch(error => {
                toast.error("Xóa thất bại!"); // Hiển thị thông báo xóa thất bại
            });

        handleCloseDelete();
    }

    useEffect(() => {
        document.title = `Admin - Danh sách admin`;
        axiosClient.get(`Users/GetUserByAdmin`)
            .then(res => {
                const data = res.data.filter(item => item.status === true);
                setAdmins(data);
                setLoading(false);
            })
    }, [adminToDelete, showDelete]);

    //console.log(competitions);
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

    const pageCount = Math.ceil(admins.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentStudents = admins.slice(offset, offset + itemsPerPage);
    //end

    console.log(admins);
    return (<Container>
        <Link to={`/admin/admin/add`} className="btn btn-success" >
            Thêm admin
        </Link>
        <Table className="block">
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Username</th>
                    <th>Họ tên</th>
                    <th>Giới tính </th>
                    <th>Chức năng</th>
                </tr>
            </thead>
            {loading ? (
                // Hiệu ứng tải trang sẽ được hiển thị trong lúc đợi dữ liệu
                <Spinner animation="border" variant="primary" />
            ) : (
                <tbody>
                    {
                        currentStudents
                            .map(item => {
                                if (item.status == true) {
                                    return (
                                        <tr key={item.id}>
                                            <td>
                                                <img src={(`https://localhost:7164/images/avatar/${item.avatar}`)} height={"40px"} />
                                            </td>
                                            <td>{item.userName} </td>
                                            <td>{item.fullName}</td>
                                            <td>{item.gender}</td>
                                            <td>
                                                <Button variant="danger" onClick={() => showConfirmation(item)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                                <Link to={`/admin/user/${item.userName}`} className="btn btn-info">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                }
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
                <Modal.Title>Xoa cuoc thi</Modal.Title>
            </Modal.Header>
            <Modal.Body>Ban co chac muon xoa cuoc thi {adminToDelete.name}!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    <FontAwesomeIcon icon={faX} />
                    Huy bo
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                    Xoa
                </Button>
            </Modal.Footer>
        </Modal>
        <ToastContainer position="top-right" autoClose={2000} />
    </Container>);
}

export default AdminList;