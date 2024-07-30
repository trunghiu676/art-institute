import { Breadcrumb, Card } from "react-bootstrap";
import "./News.scss"
import { NavLink } from "react-router-dom";
const News = (props) => {
    return (
        <>
            <div className='body-menu2 ' >
                <div className='row'>
                    <div className='col-lg-4 col-md-4 col-sm-12 mb-4' >
                        <NavLink to='/' style={{ textDecoration: 0, color: 'black' }}>
                            <Card className='cardimg'>
                                <Card.Img variant="top" src={require('../../Images/anh-nay-anh-no/13.jpg')} />
                                <Card.Body>
                                    <Card.Text className='title'>
                                        <h2 className='title-h2'>Tranh Ao Hoa Súng của Monet bán với giá 74 triệu USD</h2>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </NavLink>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 mb-4' >
                        <NavLink to='/' style={{ textDecoration: 0, color: 'black' }}>
                            <Card className='cardimg' >
                                <Card.Img variant="top" src={require('../../Images/anh-nay-anh-no/14.jpg')} />
                                <Card.Body>
                                    <Card.Text className='title'>
                                        <h2 className='title-h2'>Những bức tranh triệu USD của Lê Phổ</h2>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </NavLink>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 mb-4' >
                        <NavLink to='/' style={{ textDecoration: 0, color: 'black' }}>
                            <Card className='cardimg'>
                                <Card.Img variant="top" src={require('../../Images/anh-nay-anh-no/11.jpg')} />
                                <Card.Body>
                                    <Card.Text className='title'>
                                        <h2 className='title-h2'>Họa sĩ ẩn câu đố vào tranh, thưởng bitcoin cho người giải được</h2>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </NavLink>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 mb-4' >
                        <NavLink to='/' style={{ textDecoration: 0, color: 'black' }}>
                            <Card className='cardimg'>
                                <Card.Img variant="top" src={require('../../Images/anh-nay-anh-no/1.jpg')} />
                                <Card.Body>
                                    <Card.Text className='title'>
                                        <h2 className='title-h2'> Ngắm 'Hành trình đã qua' của hai họa sĩ trẻ</h2>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </NavLink>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 mb-4' >
                        <NavLink to='/' style={{ textDecoration: 0, color: 'black' }}>
                            <Card className='cardimg'>
                                <Card.Img variant="top" src={require('../../Images/anh-nay-anh-no/8.jpg')} />
                                <Card.Body>
                                    <Card.Text className='title'>
                                        <h2 className='title-h2'>Miền Trung qua từng nét vẽ</h2>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </NavLink>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 mb-4' >
                        <NavLink to='/' style={{ textDecoration: 0, color: 'black' }}>
                            <Card className='cardimg'>
                                <Card.Img variant="top" src={require('../../Images/anh-nay-anh-no/9.jpg')} />
                                <Card.Body>
                                    <Card.Text className='title'>
                                        <h2 className='title-h2'>Đại gia mua bức tranh hơn 2tr USD</h2>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </NavLink>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default News;
