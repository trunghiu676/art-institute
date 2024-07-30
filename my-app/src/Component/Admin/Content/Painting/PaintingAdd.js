import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import axiosClient from "../../../axiosClient";
import './Painting.scss';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../../UseAuth";
const PaintingAdd = () => {
    const [submissions, setSubmissions] = useState([]);
    const [exhibitions, setExhibitions] = useState([]);
    const [exhibition, setExhibition] = useState({});
    const [selectedSubmissions, setSelectedSubmissions] = useState([]);
    const [selectedExhibition, setSelectedExhibition] = useState();

    const navigate = useNavigate();
    useAuth(`Thêm tranh vào triễn lãm`)

    useEffect(() => {
        axiosClient.get(`Submissions`)
            .then(res => {
                const data = res.data.filter(item => item.isDelete === false);
                setSubmissions(data);
            });
        axiosClient.get('Exhibitions')
            .then(res => {
                const data = res.data.filter(item => item.isDelete === false);
                setExhibitions(data);
                setSelectedExhibition(data.length > 0 ? data[0].id : null);
                setExhibition(data[0]);
            });
    }, []);
    const dateFormat = (str) => {
        const date = new Date(str);
        var yy = date.getFullYear();
        var mm = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return (dd + "/" + mm + "/" + yy);
    }

    const handleCheckboxChange = (submissionId) => {
        setSelectedSubmissions(prev => {
            if (prev.includes(submissionId)) {
                return prev.filter(id => id !== submissionId);
            } else {
                return [...prev, submissionId];
            }
        });
    };

    const handleExhibitionChange = (event) => {
        // Lưu trữ triển lãm được chọn
        const selectedExhibitionId = parseInt(event.target.value);
        setSelectedExhibition(selectedExhibitionId);
        setExhibition(prevExhibition => exhibitions.find(item => item.id === selectedExhibitionId));
    };
    // console.log(exhibition);
    // console.log(selectedExhibition);

    const handleUpdate = () => {
        // Xử lý cập nhật dữ liệu với các bức tranh và triển lãm được chọn
        const updatedPaintings = selectedSubmissions.map(submissionId => {
            const submission = submissions.find(submission => submission.id === submissionId);
            return {
                paintingName: submission.name,
                description: submission.description,
                image: submission.imagePath,
                price: 0,
                isSold: false,
                status: true,
                submissionId: submission.id,
                exhibitionId: selectedExhibition
            };
        });

        updatedPaintings.forEach(item => {
            //console.log(item);
            axiosClient.post(`ExhibitionPaintings`, item)
                .then(res => console.log(res.data))
                .catch(error => console.error("Error:", error));
        });
        toast.success("Thêm thành công!", { autoClose: 1000 });
        setTimeout(() => {
            navigate("/admin/exhibition/painting");
        }, 1000);
        // Hiển thị thông báo cập nhật thành công
        //console.log("Updated Paintings:", updatedPaintings);
    };

    return (
        <>
            <Button onClick={handleUpdate} variant="success">
                Cập nhật
            </Button>
            <Row>
                <Col md={8} >
                    <Table className="block table-stripedd">
                        <thead>
                            <tr>
                                <th>Chọn bức tranh</th>
                                <th>Hình ảnh</th>
                                <th>Tên tác phẩm</th>
                                <th>Thuộc cuộc thi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                submissions.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                onChange={() => handleCheckboxChange(item.id)}
                                                checked={selectedSubmissions.includes(item.id)}
                                            />
                                        </td>
                                        <td>
                                            <img src={`https://localhost:7164/Images/submissions/${item.imagePath}`} width={"100px"} alt={`Submission ${item.id}`} />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.competition.name}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
                <Col md={4} className="block">
                    <Form.Label htmlFor="inputPassword5"><strong>Chọn triễn lãm</strong></Form.Label>
                    <Form.Select onChange={handleExhibitionChange} >
                        {exhibitions.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </Form.Select>

                    {(exhibition) ? (
                        <div>
                            <strong>Triễn lãm đã chọn:</strong>
                            <p>{exhibition.name}</p>
                            <p>Thời gian: Từ {dateFormat(exhibition.startDate)} đến {dateFormat(exhibition.endDate)}</p>
                            <img src={(`https://localhost:7164/Images/exhibition/${exhibition.image}`)} width={"300px"} />
                            {/* Hiển thị các thông tin khác của triển lãm */}
                        </div>
                    ) : (
                        <p>Vui lòng chọn một triễn lãm</p>
                    )}
                </Col>
            </Row>
            <ToastContainer position="top-right" autoClose={2000} />

        </>
    );
};

export default PaintingAdd;
