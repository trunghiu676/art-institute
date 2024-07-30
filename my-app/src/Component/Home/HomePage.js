
import './HomePage.scss'
import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import './HomePage.scss';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axiosClient from '../axiosClient';
import { useMemo } from 'react';

const HomePage = () => {

    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const [competitions, setCompetitions] = useState([]);
    const [exhibitions, setExhibitions] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [paintings, setPaintings] = useState([]);
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

    const ongoingExhibitions = useMemo(() => { //triễn lãm đang diễn ra
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
        document.title = 'Trang chủ ';
    }, []);
    //console.log("re-render");

    useEffect(() => {
        axiosClient.get(`Competitions`)
            .then(res => {
                const data = res.data.filter(item => item.isDelete === false && item.status === true);
                setCompetitions(data);
            });

        axiosClient.get(`Exhibitions`)
            .then(res => {
                const data = res.data.filter(item => item.isDelete === false && item.status === true);
                setExhibitions(data);
            });

        axiosClient.get(`Submissions`)
            .then(res => {
                const data = res.data.filter(item => item.isDelete === false);
                setSubmissions(data);
            });

        axiosClient.get(`ExhibitionPaintings`)
            .then(res => {
                const data = res.data.filter(item => item.status === true);
                setPaintings(data);
            });

        axiosClient.get(`Awards/Submissions`)
            .then(res => setAwardSubmissions(res.data));
    }, []);

    const dateFormat = (srt) => {
        const date = new Date(srt);
        var yy = date.getFullYear();
        var mm = date.getMonth();
        var dd = date.getDate();
        return (dd + "-" + mm + "-" + yy);
    };
    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={require('../../Images/Banner/1.jpg')}
                        alt="First slide"
                    />
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={require('../../Images/Banner/3.jpg')}
                        alt="Second slide"
                    />
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={require('../../Images/Banner/2.jpg')}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className="body-container">
                <div className='body-content'>
                    <div className='img1'><img style={{ width: 182 }} src={require('../../Images/anh-nay-anh-no/daunga.png')} /></div>
                    {/* cuoc thi dang dien ra */}
                    <div className='body-menu2 ' >
                        <Card.Text style={{ textAlign: 'center' }}>
                            <h1 className='title-h2' >Cuộc thi đang diễn ra</h1>
                        </Card.Text >
                        <div className='row'>
                            {
                                ongoingCompetitions.slice(0, 2).map(item => {
                                    return (
                                        <div className='col-md-2 col-lg-6 col-md-12 col-sm-24' key={item.id} >
                                            <NavLink to={`/cuoc-thi/${item.id}`} style={{ textDecoration: 0, color: 'black' }}>
                                                <Card className='cardimg' style={{ width: '40rem' }}>
                                                    <Link to={`/cuoc-thi/${item.id}`}><Card.Img variant="top" src={`https://localhost:7164/images/competition/${item.image}`} /></Link>
                                                    <Card.Body>
                                                        <Card.Text className='title'>
                                                            <span className='title-span'>{item.name}</span>
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
                    {/* end */}


                    {/* //bai thi gần đây */}
                    <div className='row body-menu1'>
                        <Card.Text style={{ textAlign: 'center', paddingTop: '3rem' }}>
                            <h1 className='title-h2' >Bài thi gần đây</h1>
                            <h6 className='title' >Một số bài thi gần đây do sinh viên vẽ </h6>
                        </Card.Text>
                        {
                            submissions.slice(0, 4).map(item => {
                                return (
                                    <div className='col-md-4 col-lg-3 col-md-6 col-sm-12' key={item.id}>
                                        <NavLink to={`/bai-thi/${item.id}`} style={{ textDecoration: 0, color: 'black' }}>
                                            <Card className='cardimg' style={{ width: '18rem' }}>
                                                <Card.Img variant="top" src={`https://localhost:7164/images/submissions/${item.imagePath}`} />
                                                <div className='text-center'><Card.Title >{item.name}</Card.Title></div>
                                            </Card>
                                        </NavLink>
                                    </div>
                                );
                            })
                        }

                    </div>
                    {/* trien lam đang diễn ra - map  ongoingExhibitions*/}
                    <div className='body-title1'>
                        <div className="new_title position-relative text-center mb-3">
                            <h3 className="">
                                <NavLink to='/trien-lam' >
                                    Triễn Lãm đang diễn ra
                                </NavLink>
                            </h3>
                        </div>
                    </div>
                    <div className='body-menu2 ' >
                        <div className='row'>
                            {
                                ongoingExhibitions.slice(0, 3).map(item => {
                                    return (
                                        <>
                                            <div className='col-lg-4 col-md-6 col-sm-12 mb-4' key={item.id} >
                                                <NavLink to={`/trien-lam/${item.id}`} style={{ textDecoration: 0, color: 'black' }}>
                                                    <Card className='cardimg' style={{ width: '26.5rem' }}>
                                                        <Card.Img variant="top" src={`https://localhost:7164/Images/Exhibition/${item.image}`} alt="EMMYLOU" />
                                                        <Card.Body>
                                                            <Card.Text className='title'>
                                                                <h2 className='title-h2'>{item.name}</h2>
                                                                <p>Kết thúc: {dateFormat(item.endDate)}</p>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </NavLink>
                                            </div>
                                        </>
                                    );
                                })
                            }
                        </div>
                    </div>
                    {/* end  */}
                    {/* cuộc thi sắp diễn ra */}
                    <div className='body-title1'>
                        <div className="new_title position-relative text-center mb-3">
                            <h3 className="">

                                <NavLink to='/cuoc-thi'>
                                    Cuộc thi sắp diễn ra
                                </NavLink>
                            </h3>
                        </div>
                    </div>

                    <div className='body-menu2 ' >

                        <div className='row'>
                            {
                                upcomingCompetitions.slice(0, 2).map(item => {
                                    return (
                                        <div className='col-md-2 col-lg-6 col-md-12 col-sm-24' key={item.id}>
                                            <NavLink to={`/cuoc-thi/${item.id}`} style={{ textDecoration: 0, color: 'black' }}>
                                                <Card className='cardimg'>
                                                    <Card.Img variant="top" src={`https://localhost:7164/Images/competition/${item.image}`} alt="EMMYLOU" />
                                                    <Card.Body>
                                                        <Card.Text className='title'>
                                                            <h2 className='title-h2'>{item.name}</h2>
                                                            <p>Bắt đầu: {dateFormat(item.startDate)}</p>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </NavLink>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        {/* end */}
                        <Card.Text style={{ textAlign: 'center', paddingTop: '3rem' }}>
                            <h2 className='title-h2' >Nghệ sĩ nỗi bật</h2>
                        </Card.Text>
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            <Carousel.Item interval={2000}>
                                <img
                                    className="d-block w-100"
                                    src={require('../../Images/Banner/5.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>

                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={2000}>
                                <img
                                    className="d-block w-100"
                                    src={require('../../Images/Banner/6.jpg')}
                                    alt="Second slide"
                                />
                                <Carousel.Caption>

                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={2000}>
                                <img
                                    className="d-block w-100"
                                    src={require('../../Images/Banner/7.jpg')}
                                    alt="Third slide"
                                />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>


                    </div>

                    <div className='img1'><img style={{ width: 182 }} src={require('../../Images/anh-nay-anh-no/daunga.png')} /></div>
                    {/* triễn lãm sắp diễn ra */}
                    <Card.Text style={{ textAlign: 'center', paddingTop: '1rem' }}>
                        <h2 className='title-h2' >Triễn lãm sắp diễn ra</h2>
                    </Card.Text>
                    <div className='body-menu2 ' >
                        <div className='row'>
                            {
                                upcomingExhibitions.slice(0, 2).map(item => {
                                    return (
                                        <>
                                            <div className='col-md-2 col-lg-6 col-md-12 col-sm-24' key={item.id} >
                                                <NavLink to={`/trien-lam/${item.id}`} style={{ textDecoration: 0, color: 'black' }}>
                                                    <Card className='cardimg' style={{ width: '40rem' }}>
                                                        <Card.Img variant="top" src={`https://localhost:7164/Images/Exhibition/${item.image}`} alt="EMMYLOU" />
                                                        <Card.Body>
                                                            <Card.Text className='title'>
                                                                <h2 className='title-h2'>{item.name}</h2>
                                                                <p>Bắt đầu: {dateFormat(item.startDate)}</p>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </NavLink>
                                            </div>
                                        </>
                                    );
                                })
                            }
                        </div>
                    </div>
                    {/* end  */}
                    <Card.Text style={{ textAlign: 'center', paddingTop: '3rem' }}>
                        <h2 className='title-h2' >Tranh nổi bật</h2>
                    </Card.Text>
                    <div className='row body-menu1'>
                        <div className='col-md-4 col-lg-3 col-md-6 col-sm-12 '>
                            <NavLink to='/bai-thi/1' style={{ textDecoration: 0, color: 'black' }}>
                                <Card className='cardimg' style={{ width: '20rem' }}>
                                    <Card.Img variant="" src={require('../../Images/anh-nay-anh-no/8.jpg')} />
                                    <div className='text-center'><Card.Title >Đường vào Bích động</Card.Title></div>
                                </Card>
                            </NavLink>
                        </div>
                        <div className='col-md-4 col-lg-3 col-md-6 col-sm-12'>
                            <NavLink to='/' style={{ textDecoration: 0, color: 'black' }}>
                                <Card className='cardimg' style={{ width: '20rem' }}>
                                    <Card.Img variant="top" src={require('../../Images/anh-nay-anh-no/9.jpg')} />
                                    <div className='text-center'><Card.Title>Nơi bình yên</Card.Title></div>
                                </Card>
                            </NavLink>
                        </div>
                        <div className='col-md-4 col-lg-3 col-md-6 col-sm-12'>
                            <NavLink to='/' style={{ textDecoration: 0, color: 'black' }}>
                                <Card className='cardimg' style={{ width: '20rem' }}>
                                    <Card.Img variant="top" src={require('../../Images/anh-nay-anh-no/10.jpg')} />
                                    <div className='text-center'><Card.Title>Sáng mùa Thu</Card.Title></div>
                                </Card>
                            </NavLink>
                        </div>
                        <div className='col-md-4 col-lg-3 col-md-6 col-sm-12' >
                            <NavLink to='/' style={{ textDecoration: 0, color: 'black' }}>
                                <Card className='cardimg' style={{ width: '20rem' }}>
                                    <Card.Img variant="top" src={require('../../Images/anh-nay-anh-no/11.jpg')} />
                                    <div className='text-center'><Card.Title>Rừng chiều</Card.Title></div>
                                </Card>
                            </NavLink>
                        </div>
                    </div>



                    <div className='body-title1'>
                        <div className="new_title position-relative text-center mb-3">
                            <h3 className="">
                                <NavLink to='/'>
                                    Tranh đoạt giải
                                </NavLink>
                            </h3>
                        </div>
                    </div>
                    <div className='body-menu2 ' >
                        <div className='row'>
                            {
                                awardSubmissions.slice(0, 3).map(item => {
                                    return (
                                        
                                        <div className='col-md-2 col-lg-4 col-md-12 col-sm-24' key={item.submission.id} >
                                            <NavLink to={`/bai-thi/${item.submission.id}`} style={{ textDecoration: 0, color: 'black' }}>
                                                <Card className='cardimg' style={{ width: '26.5rem' }}>
                                                    <Card.Img variant="top" src={`https://localhost:7164/Images/Submissions/${item.submission.image}`} />
                                                    <Card.Body>
                                                        <Card.Text className='title'>
                                                            <h2 className='title-h2'>{item.submission.name}</h2>
                                                            <span className='title-span'>Giải "{(item.order == 1) ? "Nhất" : (item.order == 2) ? "Nhì" : "Ba"}" cuộc thi "{item.competitionName}"</span>
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

                    <div className='body-title1'>
                        <div className="new_title position-relative text-center mb-3">
                            <h3 className="">
                                <NavLink to='/'>
                                    Tin tức & Blog
                                </NavLink>
                            </h3>
                        </div>
                    </div>
                    <div className='body-menu2 ' >
                        <div className='row'>
                            <div className='col-md-2 col-lg-6 col-md-12 col-sm-24' >
                                <NavLink to='/' style={{ textDecoration: 0, color: 'black' }}>
                                    <Card className='cardimg' style={{ width: '30rem', marginLeft: '10rem' }}>
                                        <Card.Img variant="top" src={require('../../Images/anh-nay-anh-no/13.jpg')} />
                                        <Card.Body>
                                            <Card.Text className='title'>
                                                <h2 className='title-h2'>Tranh Ao Hoa Súng của Monet bán với giá 74 triệu USD</h2>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </NavLink>
                            </div>
                            <div className='col-md-2 col-lg-6 col-md-12 col-sm-24' >
                                <NavLink to='/' style={{ textDecoration: 0, color: 'black' }}>
                                    <Card className='cardimg' style={{ width: '30rem' }}>
                                        <Card.Img variant="top" src={require('../../Images/anh-nay-anh-no/14.jpg')} />
                                        <Card.Body>
                                            <Card.Text className='title'>
                                                <h2 className='title-h2'>Những bức tranh triệu USD của Lê Phổ</h2>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </NavLink>

                            </div>
                            <div className="">
                                <p width={1273} height={417} className="d-block w-100"

                                    style={{ border: 0, paddingTop: '2rem' }}
                                    allowFullScreen=""
                                >

                                    <Card.Img src={require('../../Images/Banner/8.jpg')} />
                                </p>
                            </div>
                            <Card.Text style={{ textAlign: 'center', paddingTop: '3rem' }}>
                                <hr />
                                <h6 > Trang web BTH cung cấp không gian cho nghệ sĩ từ khắp nơi để chia sẻ tài năng và tác phẩm của mình, từ tranh truyền thống đến những biểu hiện nghệ thuật đương đại độc đáo. Chúng tôi tin rằng nghệ thuật có thể kết nối và tạo ra sự đa dạng, và trang web BTH là một bảng điều khiển năng động để thể hiện điều đó.</h6>

                                <h6 > Ngoài ra, BTH còn tổ chức các cuộc thi tranh, tạo cơ hội cho cộng đồng nghệ sĩ thể hiện sự sáng tạo và tài năng của mình. Chúng tôi tin rằng việc này không chỉ thúc đẩy sự phát triển cá nhân mà còn tạo ra một diễn đàn thú vị để các nghệ sĩ giao lưu và học hỏi lẫn nhau. </h6>
                                <hr />
                            </Card.Text>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;