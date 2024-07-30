import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../../../axiosClient";
import { Col, Container, Row, Spinner, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import useAuth from "../../UseAuth";

const AwardList = () => {

    useAuth('Danh sách giải thưởng');


    const [awards, setAwards] = useState([{ user: {}, competition: {} }]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axiosClient.get(`Awards`)
            .then(res => {
                setAwards(res.data);
                setLoading(false);
            })
    }, []);
console.log(awards);
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

    const pageCount = Math.ceil(awards.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentAwards = awards.slice(offset, offset + itemsPerPage);
    //end

    return (<>
        <Container>
            <Table className="block">
                <thead>
                    <tr>
                        <th>Loại giải thưởng</th>
                        <th>Tên giải thưởng</th>
                        <th>Người nhận</th>
                        <th>Cuộc thi</th>
                    </tr>
                </thead>
                {loading ? (
                    // Hiệu ứng tải trang sẽ được hiển thị trong lúc đợi dữ liệu
                    <Spinner animation="border" variant="primary" />
                ) : (
                    <tbody>
                        {currentAwards.map(data => {
                            const prize = data.order === 1 ? "Giải nhất" : data.order === 2 ? "Giải nhì" : data.order === 3 ? "Giải ba" : "Giải khuyến khích";
                            return (
                                <tr>
                                    <td>{prize}</td>
                                    <td>{data.nameAward}</td>
                                    <td>{data.user ? data.user.fullName : "Chưa trao giải"}</td>
                                    <td>{data.competition.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                )}
                <tfoot>
                    <tr>
                        <td colSpan={4}>{/*  phân trang */}
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
                            {/* end */}</td>
                    </tr>
                </tfoot>
            </Table>

        </Container>
    </>);
}

export default AwardList;