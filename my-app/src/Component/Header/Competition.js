import { Breadcrumb, Card, CardText } from 'react-bootstrap';
import './Competition.scss';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosClient from '../axiosClient';

const Competition = (props) => {
    const [competitions, setCompetitions] = useState([]);
    const [ongoingCompetitions, setOngoingCompetitions] = useState([]); //cuộc thi đang diễn ra
    const [upcomingCompetitions, setUpcomingCompetitions] = useState([]); //cuộc thi sắp diễn ra
    const [completedCompetitions, setCompletedCompetitions] = useState([]); //Cuộc thi đã hoàn thành
    useEffect(() => {
        document.title = 'Cuộc thi';
    }, []);
    useEffect(() => {
        axiosClient.get(`Competitions`)
            .then(res => {
                const data = res.data.filter(item => item.isDelete === false && item.status === true);
                setCompetitions(data);
                const currentDate = new Date();

                // Lọc các cuộc thi có startDate nhỏ hơn ngày hiện tại và endDate lớn hơn ngày hiện đại (Cuộc thi đang diễn ra)
                const dataDate = data.filter(item => (
                    new Date(item.startDate) <= currentDate && new Date(item.endDate) >= currentDate
                ));
                setOngoingCompetitions(dataDate);

                //lọc các cuộc thi sắp diễn ra
                const upDataDate = data.filter(item => (
                    new Date(item.startDate) > currentDate
                ));
                setUpcomingCompetitions(upDataDate);

                //lọc các cuộc thi đã diễn ra
                const completedDataDate = data.filter(item => (
                    new Date(item.endDate) < currentDate
                ));
                setCompletedCompetitions(completedDataDate);
            });
    }, []);
    const dateFormat = (srt) => {
        const date = new Date(srt);
        var yy = date.getFullYear();
        var mm = date.getMonth();
        var dd = date.getDate();
        return (dd + "-" + mm + "-" + yy);
    }
    console.log(competitions);
    return (
        <>
            <div className='Competiton'>
                <div className="container">
                    <h5 className="linknow">
                        <Breadcrumb >
                            <Breadcrumb.Item ><NavLink to='/' className='nav-link' style={{ color: 'black' }}>Home</NavLink></Breadcrumb.Item>
                            <Breadcrumb.Item active> Cuộc thi</Breadcrumb.Item>
                        </Breadcrumb>
                    </h5>
                    <p className="header" style={{ fontSize: 35 }}>Các Cuộc Thi Đang Diễn Ra</p>
                    <div className="content">
                        {
                            ongoingCompetitions.map((item) => {
                                return (
                                    <div className="wrapper" key={item.id}>
                                        <Link to={`${item.id}`}>
                                            <div className="box vintage">

                                                <img src={`https://localhost:7164/Images/submissions/${item.image}`} alt="EMMYLOU" />
                                                <h2>{item.name}</h2>

                                                <p>Thời hạn: {dateFormat(item.endDate)}</p>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <br />
                    <p className="header" style={{ fontSize: 35 }}>Các Cuộc Thi Sắp Diễn Ra</p>
                    <div className="content">
                        {
                            upcomingCompetitions.map((item) => {
                                return (
                                    <div className="wrapper" key={item.id}>
                                        <Link to={`${item.id}`}>
                                            <div className="box vintage">

                                                <img src={`https://localhost:7164/Images/submissions/${item.image}`} alt="EMMYLOU" />
                                                <h2>{item.name}</h2>

                                                <p>Bắt đầu: {dateFormat(item.endDate)}</p>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <br />
                    <p className="header" style={{ fontSize: 35 }}>Các Cuộc Thi Đã Hoàn Thành</p>
                    <div className="content">
                        {
                            completedCompetitions.map((item) => {
                                return (
                                    <div className="wrapper" key={item.id}>
                                        <Link to={`${item.id}`}>
                                            <div className="box vintage">

                                                <img src={`https://localhost:7164/Images/submissions/${item.image}`} alt="EMMYLOU" />
                                                <h2>{item.name}</h2>

                                                <p>Thời gian: {dateFormat(item.startDate)} đến {dateFormat(item.endDate)}</p>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <Card.Text style={{ textAlign: 'center', paddingTop: '3rem' }}>
                        <hr />
                        <h6 > Trang web BTH cung cấp không gian cho nghệ sĩ từ khắp nơi để chia sẻ tài năng và tác phẩm của mình, từ tranh truyền thống đến những biểu hiện nghệ thuật đương đại độc đáo. Chúng tôi tin rằng nghệ thuật có thể kết nối và tạo ra sự đa dạng, và trang web BTH là một bảng điều khiển năng động để thể hiện điều đó.</h6>

                        <h6 > Ngoài ra, BTH còn tổ chức các cuộc thi tranh, tạo cơ hội cho cộng đồng nghệ sĩ thể hiện sự sáng tạo và tài năng của mình. Chúng tôi tin rằng việc này không chỉ thúc đẩy sự phát triển cá nhân mà còn tạo ra một diễn đàn thú vị để các nghệ sĩ giao lưu và học hỏi lẫn nhau. </h6>
                        <hr />
                    </Card.Text>
                </div>
            </div>


        </>
    );
}

export default Competition;