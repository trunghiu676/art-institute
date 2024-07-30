import './Contact.scss';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink } from 'react-router-dom';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useEffect } from 'react';


const Contact = (props) => {
    useEffect(() => {
        document.title = 'Liên hệ';
    }, [])

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_9z0lc5f', 'template_01', form.current, 'mp1Yc7DKiSQaw_Rcm')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thanks You !!!',
            showConfirmButton: false,
            timer: 1500
        })
    };
    return (
        <>
            <h5 className="linknow container">
                <Breadcrumb >
                    <Breadcrumb.Item ><NavLink to='/' className='nav-link' style={{ color: 'black' }}>TRANG CHỦ</NavLink></Breadcrumb.Item>
                    <Breadcrumb.Item active>LIÊN HỆ</Breadcrumb.Item>
                </Breadcrumb>
            </h5>

            <section className="w-100 mt-4 menu-contact-lh">
                <div className="container left-contact">
                    <div className="row mt-4">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-3">
                            <div className="w-100 h-100 contact-right wp-contact-footer bg-white">
                                <h1 className="title-text">
                                    <span>THÔNG TIN LIÊN HỆ</span>
                                </h1>
                                <div className="col-contact content-contact">
                                    <p style={{ textAlign: "center" }}>
                                        <img
                                            alt=""
                                            src={require('../../Images/Logo/vuongtrong.png')}
                                            style={{ width: 300, height: 300 }}
                                        />
                                    </p>
                                    <p>
                                        <span style={{ fontSize: 14 }}>
                                            <strong>Showroom :</strong> 102, Nguyễn Đình Chính, Phường 15, Quận Phú Nhuận, TP. HCM
                                        </span>
                                    </p>
                                    <p>
                                        <span style={{ fontSize: 14 }}>
                                            <strong />
                                        </span>
                                    </p>
                                    <p>
                                        <span style={{ fontSize: 14 }}>
                                            <strong>Điện thoại :</strong>&nbsp;
                                            <a href="tel:(028) 6275 8888">(028) 6275 8888</a> -{" "}
                                            <a href="tel:(028) 6684 9229">(028) 6684 9229</a> -{" "}
                                            <a href="tel:(028) 2245 8844">(028) 2245 8844</a>
                                        </span>
                                    </p>
                                    <p>
                                        <span style={{ fontSize: 14 }}>
                                            <strong>Hotline:</strong>{" "}
                                            <a href="tel:0937309888" rel="noreferrer nofollow" target="_blank"> 0836 688 638 ( Mr. Hiu)
                                            </a>
                                        </span>
                                    </p>
                                    <p>
                                        <span style={{ fontSize: 14 }}>
                                            <strong>Hotline+Zalo 1:</strong>{" "}
                                            <a href="https://zalo.me/0836688638">0836 688 638(Mr. Bao)</a>
                                        </span>
                                    </p>
                                    <p>
                                        <span style={{ fontSize: 14 }}>
                                            <strong>Hotline+Zalo 2:</strong>{" "}
                                            <a href="http://zalo.me/0836688638"> 0989 475 888(Mr. Thiet)
                                            </a>
                                        </span>
                                    </p>
                                    <p>
                                        <span style={{ fontSize: 14 }}>
                                            <strong>Email:</strong> cskh@bthacademy.com
                                        </span>
                                    </p>
                                    <p>
                                        <span style={{ fontSize: 14 }}>
                                            <strong>Website:</strong> <strong>www.bthacademy.vn</strong>
                                        </span>
                                    </p>
                                    <p>
                                        <span style={{ fontSize: 14 }}>
                                            Với tiêu chí làm thỏa mãn nhu cầu hoàn thiện giá trị thẩm mỹ cho
                                            các công trình kiến trúc, xây dựng , chúng tôi đặt tính chuyên
                                            nghiệp, sự uy tín, tận tâm lên hàng đầu để phục vụ khách hàng.
                                        </span>
                                    </p>
                                    <p>
                                        <span style={{ fontSize: 14 }}>
                                            Chúng tôi cam kết mang đến cho Quý khách hàng những sản phẩm có
                                            chất lượng tốt nhất, hiện đại nhất bằng chính sự trân trọng,
                                            niềm tin và trách nhiệm của mình với kim chỉ nam hành động Kinh
                                            doanh gắn liền với Uy tín, Chất lượng .
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3 mt-md-0 mb-3 right-contact">
                            <div className="w-100  h-100 contact-right contact-left bg-white ">
                                <h2 className="title-text">
                                    <span>FORM LIÊN HỆ</span>
                                </h2>
                                <form
                                    id="Form_dia_chi"
                                    className="wm-campaign-form wm-form"
                                    name="frmRegister"
                                    method="POST"
                                    ref={form} onSubmit={sendEmail}
                                >
                                    <div className="row">
                                        <div className="col-lg-12 col-sm-12 col-12 step_2">
                                            <div className="form-group" id="input-name">
                                                <label htmlFor="wmFieldName">Họ và tên *</label>
                                                <input
                                                    className="form-control form-controll"
                                                    defaultValue=""
                                                    placeholder='Nguyen Van An'
                                                    type="text" name="user_name"

                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-sm-12 col-12 step_2">
                                            <div className="form-group" id="input-phone">
                                                <label htmlFor="wmFieldPhone">Số điện thoại *</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-controll"
                                                    name="phone"
                                                    placeholder='096.436.7777'
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-sm-12 col-12 step_2">
                                            <div className="form-group" id="input-address">
                                                <label htmlFor="wmFieldName">Địa chỉ</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-controll"
                                                    name="address"
                                                    defaultValue=""
                                                    placeholder='102 Nguyen Dinh Chinh'

                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-sm-12 col-12 step_2">
                                            <div className="form-groupemail" id="input-email">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control form-controll"
                                                    id="wmFieldEmail"
                                                    defaultValue=""
                                                    placeholder='Email...'
                                                    name="user_email"
                                                />
                                                <label htmlFor="wmFieldName"
                                                    data-empty="Hãy nhập trường này"
                                                    data-invalid="Email không hợp lệ"
                                                    data-valid="Email hợp lệ">
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group step_2" id="input-content">
                                        <label htmlFor="wmFieldEmail">Nội dung</label>
                                        <textarea
                                            name="message"
                                            type="text"
                                            className="form-control form-controll p-2"
                                            id="content"
                                            rows={5}
                                            defaultValue={""}
                                            placeholder='Noi dung'
                                        />
                                    </div>
                                    <div
                                        className="form-group btnSuccess text-center  step_2"
                                        id="input-content" type="submit" value="Send"
                                    >
                                        <button
                                            // type="button"
                                            name="contact"
                                            id="contact"
                                            className="w-100 btn btn-info rounded position-relative font-weight-bold mt-2 p-2"
                                            type="submit" value="Send"

                                        >
                                            <svg
                                                width="1.5em"
                                                height="1.5em"
                                                viewBox="0 0 16 16"
                                                className="bi bi-arrow-right bounceAndRotate"

                                            >
                                            </svg>{" "}
                                            GỬI LIÊN HỆ
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="contact-google-map">
                <p>
                    <iframe
                        className="d-block w-100"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.201757241521!2d106.67615171458921!3d10.795853992308347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d6786d52bf%3A0x77a4a2db8949796e!2zMTAyIE5ndXnhu4VuIMSQw6xuaCBDaMOtbmgsIFBoxrDhu51uZyAxNSwgUGjDuiBOaHXhuq1uLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1671530024170!5m2!1svi!2s"
                        width={1510}
                        height={450}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"

                    />

                </p>
            </div>


        </>
    )
}
export default Contact;