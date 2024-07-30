import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import { useState } from 'react';
import { FaUserAlt, FaCartPlus } from 'react-icons/fa'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import './Header.scss';


const Header = (props) => {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const showDropdown = (e) => {
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }

    const [show1, setShow1] = useState(false);
    const showDropdown1 = (e) => {
        setShow1(!show1);
    }
    const hideDropdown1 = e => {
        setShow1(false);
    }


    return (
        <>
            <aside className="w-100 wp-header pt-4 pb-1 navbar-fixed-top">

                <div className="container">
                    <div className=""></div>

                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-lg-3 col-12 search-bar mb-1 mb-lg-0 search1">
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Tranh Son Dau"
                                    className="me-2"
                                    aria-label="Search"
                                    values={['den led']}
                                />
                                <Button style={{ background: 'black', border: 'black' }}
                                    onClick={() => {
                                    }}>Tìm </Button>
                            </Form>
                        </div>
                        <div className="col-lg-6 col-6">
                            <a
                                className="d-flex justify-content-center"
                                href="/"
                                title="banner"
                            >
                                <NavLink to='/'>
                                    <img width={290} height={90} style={{ textAlign: 'center' }} src={require('../../Images/Logo/ngangtrong.png')} />
                                </NavLink>
                            </a>

                        </div>
                        <div className="col-lg-2 col-3 ">
                            <div className='justify-content align-items-center'>
                                <NavLink to='/profile'><FaUserAlt style={{ color: 'black', fontSize: '30px', color: 'black' }} /></NavLink>
                                <span style={{ fontSize: '15px', marginRight: '15px', color: 'black' }} className="homeName"> <strong>  {localStorage.getItem('userName')}</strong></span>

                                <NavLink to='/payment'><FaCartPlus style={{ color: 'black', fontSize: '30px', color: 'black' }} /></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <div>
                <Navbar bg="light" expand="lg">
                    <Container >
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse className="collapse navbar-collapse" id="navbarSupportedContent">
                            <Nav
                                className="me-auto mb-1 mb-lg-100"
                                style={{ maxHeight: '' }}
                                navbarScroll
                            >
                                <NavLink to='/' className='nav-link' >TRANG CHỦ</NavLink>
                                <NavLink to='trien-lam' className='nav-link'>TRIỄN LÃM</NavLink>
                                <NavLink to='cuoc-thi' className='nav-link'>CUỘC THI</NavLink>
                                <NavLink to='tin-tuc' className='nav-link'>TIN TỨC</NavLink>
                                <NavLink to='contact' className='nav-link'>LIÊN HỆ</NavLink>
                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}

export default Header;