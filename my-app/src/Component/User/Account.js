import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Table, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.scss';
import axiosClient from '../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';
const Account = () => {
    const [submissions, setSubmissions] = useState([{ competition: {} }]);
    const [awards, setAwards] = useState([{ competition: {} }]);
    const [account, setAccount] = useState({});

    const { userName } = useParams();

    useEffect(() => {
        document.title = `Tài khoản`;
        axiosClient.get(`Users/${userName}`)
            .then(res => {
                setAccount(res.data);
            });
        axiosClient.get(`Submissions/ByUserName/${userName}`)
            .then(res => {
                const data = res.data.filter(item => item.isDelete === false);
                setSubmissions(data);
            });
        axiosClient.get(`Awards/User/${userName}`)
            .then(res => {
                setAwards(res.data);
            });
    }, []);

    const dateFormat = (srt) => {
        const date = new Date(srt);
        var yy = date.getFullYear();
        var mm = date.getMonth();
        var dd = date.getDate();
        return (dd + "/" + mm + "/" + yy);
    }

    return (
        <Container className="profile-container">
            <Row>
                <Col md={3}>
                    <img className="profile-img" src={`https://localhost:7164/images/avatar/${account.avatar}`} alt="Profile Picture" />
                </Col>
                <Col md={9}>
                    <Row>
                        <Col>
                            <h2>{account.fullName}</h2>
                            <p>{account.email}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>{account.userName}</Col>
                        <Col md={3}> {account.gender}</Col>
                        <Col md={3}>{submissions.length} Bài thi</Col>
                        <Col md={3}>{awards.length} Giải thưởng </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tab.Container id="myTabs">
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link eventKey="tab1">Cuộc thi đã tham gia</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="tab2">Bài thi đã nộp</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="tab3">Giải thưởng</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="tab1">
                                {submissions && submissions.length > 0 ? (
                                    <Table className="custom-table">
                                        {
                                            submissions.map(item => (
                                                <tr key={item.competition.id}>
                                                    <td>
                                                        <img src={`https://localhost:7164/images/competition/${item.competition.image}`} />
                                                    </td>
                                                    <td>
                                                        <Link to={`/cuoc-thi/${item.competition.id}`}>
                                                            {item.competition.name}
                                                        </Link>
                                                    </td>
                                                    <td>{dateFormat(item.competition.startDate)} - {dateFormat(item.competition.startDate)}</td>
                                                </tr>
                                            ))
                                        }
                                    </Table>
                                ) : (
                                    <p>Chưa tham gia cuộc thi nào.</p>
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="tab2">
                                {submissions && submissions.length > 0 ? (
                                    <Table className="custom-table">
                                        {
                                            submissions.map(item => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <img src={`https://localhost:7164/images/submissions/${item.imagePath}`} />
                                                    </td>
                                                    <td>
                                                        <Link to={`/bai-thi/${item.id}`}>
                                                            {item.name}
                                                        </Link>
                                                    </td>
                                                    <td>{dateFormat(item.submissionDate)}</td>
                                                </tr>
                                            ))
                                        }
                                    </Table>
                                ) : (
                                    <p>Chưa nộp bài thi nào.</p>
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="tab3">
                                {awards && !awards.competition ? (
                                    <Table className="custom-table">
                                        <thead>
                                            <tr>
                                                <th>Loại giải thưởng</th>
                                                <th>Tên giải</th>
                                                <th>Cuộc thi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                awards.map(item => {
                                                    const name = (item.order === 1) ? "Giải nhất" : (item.order === 2) ? "Giải nhì" : "Giải ba"
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>
                                                                {name}
                                                            </td>
                                                            <td>
                                                                {item.nameAward}
                                                            </td>
                                                            <td>
                                                                {item.competition.name}
                                                            </td>
                                                        </tr>

                                                    )
                                                }
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                ) : (
                                    <p>Không đạt được giải thưởng nào.</p>
                                )}
                            </Tab.Pane>

                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Account;
