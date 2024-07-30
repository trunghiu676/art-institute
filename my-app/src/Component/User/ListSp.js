
import { useEffect, useState } from 'react';
import './ListSp.scss'
import { NavLink, useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';

const ListSp = (props) => {
    const navigate = useNavigate();

    const handleBuy = () => {
        navigate("/login")
    }
    const handleDetail = () => {
        navigate("/detailsp")
    }
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        axiosClient.get(`Competitions`)
            .then(res => {
                setCompetitions(res.data);
            })
    }, []);
    console.log(competitions);
    return (
        <>
            <h1 className="container">Menu</h1>
            <div className="list-sp-container container">
                <div className="sanpham">
                    <div className="row">
                        {competitions.map((item) => {
                            return (
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 home-item">
                                    <div className="card">
                                        <img src={(`https://localhost:7164/Images/anh-nay-anh-no/${item.image}`)} width={"50px"} className="card-img-bottom" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {item.name}
                                            </h5>
                    
                                            <button className='btn btn-primary-1' onClick={() => handleBuy()}>Buy Now</button>

                                            <button className='btn btn-primary-2' onClick={() => handleDetail()}>Detail</button>


                                        </div>
                                    </div>
                                </div>

                            )
                        })}
                    </div>



                </div>
            </div>
        </>
    )
}

export default ListSp;