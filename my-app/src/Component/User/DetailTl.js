import './DetailTl.scss'
import { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import axiosClient from '../axiosClient';
import axios from 'axios';

const DetailTl = () => {
    const [exhibition, setExhibition] = useState({});
    const [paintings, setPaintings] = useState([{ submission: {}, exhibition: {} }]);
    const [submission, setsubmission] = useState({});
    const [awards, setAwards] = useState([{ nameAward: '', submission: {} }]);
    const { id } = useParams();

    const userId = localStorage.getItem("id");

    const dateFormat = (srt) => {
        const date = new Date(srt);
        var yy = date.getFullYear();
        var mm = date.getMonth();
        var dd = date.getDate();
        return (dd + "/" + mm + "/" + yy);
    }

    useEffect(() => {
        axiosClient.get(`Exhibitions/${id}`).then(res => {
            setExhibition(res.data);
            document.title = `${res.data.name}`;
        });
        axiosClient.get(`ExhibitionPaintings/ExhibitionId/${id}`).then(res => { setPaintings(res.data) })
    }, []);
    console.log(paintings);
    return (<>
        <div id="container1" >
            <div class="productt-details">

                <h1>{exhibition.name} </h1>

                <p class="information">" Thời gian: Từ {dateFormat(exhibition.startDate)} đến {dateFormat(exhibition.endDate)}  "</p>

                <img src={`https://localhost:7164/images/exhibition/${exhibition.image}`} width={720} />


                <p class="information">{exhibition.description}</p>
                {
                    paintings && paintings.length > 0 ? (
                        paintings.map(item => {
                            return (
                                <div key={item.id}>
                                    <Card >
                                        <img src={`https://localhost:7164/images/submissions/${item.image}`} width={720} />
                                        <p class="information">Tác phẩm : "{item.paintingName}"</p>
                                    </Card>
                                    <p class="information">{item.description}</p>

                                </div>
                            )
                        })
                    ) : ""
                }

            </div>

        </div >
    </>);
}

export default DetailTl;