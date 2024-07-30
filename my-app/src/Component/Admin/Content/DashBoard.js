import { faAward, faCheckCircle, faClock, faCoffee, faImage, faMarsDouble, faMedal, faPalette, faPen, faPlayCircle, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import useAuth from "../UseAuth";

const Dashboard = (props) => {

    useAuth('Trang chủ');

    const [competitions, setCompetitions] = useState([]);
    const [exhibitions, setExhibitions] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [paintings, setPaintings] = useState([]);
    const [awards, setAwards] = useState([]);
    const [awardSubmissions, setAwardSubmissions] = useState([{ submission: {} }]);


    const ongoingCompetitions = useMemo(() => { //cuộc thi đang diễn ra
        const currentDate = new Date();
        return competitions.filter(item => (
            new Date(item.startDate) <= currentDate && new Date(item.endDate) >= currentDate
        ));
    }, [competitions]);

    const upcomingCompetitions = useMemo(() => { //cuộc thi sắp diễn ra
        const currentDate = new Date();
        return competitions.filter(item => (
            new Date(item.startDate) > currentDate
        ));
    }, [competitions]);

    const ongoingExhibitions = useMemo(() => {//triễn lãm đang diễn ra
        const currentDate = new Date();
        return exhibitions.filter(item => (
            new Date(item.startDate) <= currentDate && new Date(item.endDate) >= currentDate
        ));
    }, [exhibitions]);

    const upcomingExhibitions = useMemo(() => {//triễn lãm sắp diễn ra
        const currentDate = new Date();
        return exhibitions.filter(item => (
            new Date(item.startDate) > currentDate
        ));
    }, [exhibitions]);

    useEffect(() => {
        axiosClient.get(`Competitions`)
            .then(res => {
                const data = res.data.filter(item => item.isDelete === false);
                setCompetitions(data)
            });
        axiosClient.get(`Exhibitions`)
            .then(res => {
                const data = res.data.filter(item => item.isDelete === false);
                setExhibitions(data)
            });
        axiosClient.get(`Submissions`)
            .then(res => {
                const data = res.data.filter(item => item.isDelete === false);
                setSubmissions(data)
            });
        axiosClient.get(`ExhibitionPaintings`)
            .then(res => {
                setPaintings(res.data)
            });
        axiosClient.get(`Awards`)
            .then(res => {
                setAwards(res.data);
                const data = res.data.filter(item => item.userId === null);
                setAwardSubmissions(data);
            });
    }, []);


    return (
        <Container>

            <Row>
                <Col>
                    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#fff', marginTop: '20px', textAlign: 'center' }}>
                        Chào mừng bạn đến với HỆ THỐNG QUẢN TRỊ NỘI DUNG WEBSITE - Được xây dựng bởi BTH
                    </div>
                </Col>
            </Row>
            <Row >
                <Col>
                    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#fff', marginTop: '20px', marginBottom: '20px' }}>
                        <Link to={`competition/list`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ marginRight: '10px' }}>
                                <FontAwesomeIcon icon={faMedal} size="3x" color="#4CAF50" />
                            </div>
                            <div>
                                <div style={{ fontSize: '24px', fontWeight: '600', color: '#426DBA' }}>{competitions.length}</div>
                                <div style={{ color: '#426DBA', fontSize: '12px' }}> CUỘC THI </div>
                            </div>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#fff', marginTop: '20px', marginBottom: '20px' }}>
                        <Link to={`exhibition/list`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ marginRight: '10px' }}>
                                <FontAwesomeIcon icon={faPalette} size="3x" color="#FF7043" />
                            </div>
                            <div>
                                <div style={{ fontSize: '24px', fontWeight: '600', color: '#426DBA' }}>{exhibitions.length}</div>
                                <div style={{ color: '#426DBA', fontSize: '12px' }}> TRIỄN LÃM </div>
                            </div>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#fff', marginTop: '20px', marginBottom: '20px' }}>
                        <Link to={`submission/list`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ marginRight: '10px' }}>
                                <FontAwesomeIcon icon={faPen} size="3x" color="#9A4444" />
                            </div>
                            <div>
                                <div style={{ fontSize: '24px', fontWeight: '600', color: '#426DBA' }}>{submissions.length}</div>
                                <div style={{ color: '#426DBA', fontSize: '12px' }}> BÀI THI </div>
                            </div>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#fff', marginTop: '20px', marginBottom: '20px' }}>
                        <Link to={`exhibition/painting`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ marginRight: '10px' }}>
                                <FontAwesomeIcon icon={faImage} size="3x" color="#E9B824" />
                            </div>
                            <div>
                                <div style={{ fontSize: '24px', fontWeight: '600', color: '#426DBA' }}>{paintings.length}</div>
                                <div style={{ color: '#426DBA', fontSize: '12px' }}> BỨC TRANH </div>
                            </div>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#fff', marginTop: '20px', marginBottom: '20px' }}>
                        <Link to={`competition/award`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ marginRight: '10px' }}>
                                <FontAwesomeIcon icon={faAward} size="3x" color="#EF5350" />
                            </div>
                            <div>
                                <div style={{ fontSize: '24px', fontWeight: '600', color: '#426DBA' }}>{awards.length}</div>
                                <div style={{ color: '#426DBA', fontSize: '12px' }}> GIẢI THƯỞNG </div>
                            </div>
                        </Link>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    <div >
                        <Row className="container">
                            <Col md={4} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#fff', marginTop: '20px', marginBottom: '20px' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <h5>Cuộc thi</h5><hr />
                                    <div to={`competition/list`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ marginRight: '20px' }}>
                                            <FontAwesomeIcon icon={faPlayCircle} size="2x" color="#EC8F5E" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '24px', fontWeight: '600', color: '#426DBA', marginLeft: '20px' }}>{ongoingCompetitions.length}</div>
                                            <div style={{ fontSize: '12px', marginLeft: '20px' }}> CUỘC THI ĐANG DIỄN RA </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <div to={`competition/list`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ marginRight: '20px' }}>
                                            <FontAwesomeIcon icon={faClock} size="2x" color="#FFD700" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '24px', fontWeight: '600', color: '#426DBA', marginLeft: '20px' }}>{upcomingCompetitions.length}</div>
                                            <div style={{ fontSize: '12px', marginLeft: '20px' }}> CUỘC THI CHƯA DIỄN RA </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <div to={`competition/list`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ marginRight: '20px' }}>
                                            <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#4CAF50 " />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '24px', fontWeight: '600', color: '#426DBA', marginLeft: '20px' }}>{competitions.length - (ongoingCompetitions.length + upcomingCompetitions.length)}</div>
                                            <div style={{ fontSize: '12px', marginLeft: '20px' }}> CUỘC THI ĐÃ HOÀN THÀNH </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#fff', marginTop: '20px', marginBottom: '20px' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <h5>Triễn lãm</h5><hr />
                                    <div to={`competition/list`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ marginRight: '20px' }}>
                                            <FontAwesomeIcon icon={faPlayCircle} size="2x" color="#EC8F5E" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '24px', fontWeight: '600', color: '#426DBA', marginLeft: '20px' }}>{ongoingExhibitions.length}</div>
                                            <div style={{ fontSize: '12px', marginLeft: '20px' }}> TRIỄN LÃM ĐANG DIỄN RA </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <div to={`competition/list`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ marginRight: '20px' }}>
                                            <FontAwesomeIcon icon={faClock} size="2x" color="#FFD700" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '24px', fontWeight: '600', color: '#426DBA', marginLeft: '20px' }}>{upcomingExhibitions.length}</div>
                                            <div style={{ fontSize: '12px', marginLeft: '20px' }}> TRIỄN LÃM CHƯA DIỄN RA </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <div to={`competition/list`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ marginRight: '20px' }}>
                                            <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#4CAF50 " />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '24px', fontWeight: '600', color: '#426DBA', marginLeft: '20px' }}>{exhibitions.length - (ongoingExhibitions.length + upcomingExhibitions.length)}</div>
                                            <div style={{ fontSize: '12px', marginLeft: '20px' }}> TRIỄN LÃM ĐÃ HOÀN THÀNH </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#fff', marginTop: '20px', marginBottom: '20px' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <h5>Giải thưởng</h5><hr />
                                    <Link to={`competition/list`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ marginRight: '10px' }}>
                                            <FontAwesomeIcon icon={faAward} size="2x" color="#4CAF50" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '24px', fontWeight: '600', color: '#426DBA' }}>{awardSubmissions.length}</div>
                                            <div style={{ color: '#426DBA', fontSize: '12px' }}> GIẢI THƯỞNG ĐÃ TRAO  </div>
                                        </div>
                                    </Link>
                                </div>
                            </Col>
                        </Row>

                    </div>

                </Col>
                <Col md={4}>
                    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#fff', marginTop: '20px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                CUỘC THI GẦN NHẤT
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Link to={`competition/list`} style={{ marginLeft: 'auto' }}>Xem tất cả</Link>
                            </div>
                        </div>
                        <table>
                            {
                                competitions.sort((a, b) => b.id - a.id)
                                    .slice(0, 3)
                                    .map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td><img src={(`https://localhost:7164/images/competition/${item.image}`)} width={"50px"} /></td>
                                                <td>{item.name}</td>
                                            </tr>
                                        )
                                    })
                            }
                        </table>
                    </div>


                    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#fff', marginTop: '20px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                TRIỄN LÀM GẦN NHẤT
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Link to={`competition/list`} style={{ marginLeft: 'auto' }}>Xem tất cả</Link>
                            </div>
                        </div>
                        <table>
                            {
                                exhibitions.sort((a, b) => b.id - a.id)
                                    .slice(0, 3)
                                    .map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td><img src={(`https://localhost:7164/images/exhibition/${item.image}`)} width={"50px"} /></td>
                                                <td>{item.name}</td>
                                            </tr>
                                        )
                                    })
                            }
                        </table>
                    </div>
                </Col>
            </Row>

        </Container >
    )
}

export default Dashboard;