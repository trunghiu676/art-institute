import React from "react";
import './Footer.scss'
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaCcMastercard, FaCcPaypal, FaCcJcb, FaCcVisa, FaCcApplePay, FaPinterest } from 'react-icons/fa'


const Footer = (props) => {
    return (
        <>
            <footer className="pt-4">
                <div className="footter-contact">
                    <div className="row ">
                        <div className="col-lg-5 col-sm-12 col-12 mb-3 mb-lg-0 col-contact">
                            <p className="title-contact">HỌC VIỆN MỸ THUẬT BTH ART ACADEMY</p>
                            <i className="fas fa-map-marker-alt " style={{ color: 'black' }} />
                            Showroom Hà Nội: Số 463 Hoàng Quốc Việt - Bắc Từ Liêm - HN. <span>Hotline: <a href="tel:0937309879" rel="noreferrer nofollow">096.486.3333</a></span> <br />
                            Showroom Đà Nẵng: Số 120 Núi Thành - Phường Hoà Thuận Đông - Q.Hải Châu - Đà Nẵng.<br />
                            Showroom HCM: Số 102 Nguyễn Đình Chính - phường 15 - quận Phú Nhuận - TP.HCM.<br />
                            Email: cskh@bthart.com.vn<br />
                            Website: www.bthart.vn<br />
                            Hotline bán lẻ:<span><a href="tel:0937309879" rel="noreferrer nofollow">096.486.3333 </a> ( Ms HIU)</span> <br />
                            Hotline dự án:<span><a href="tel:0937309879" rel="noreferrer nofollow"> 096.881.8888</a> ( Mr BAO)</span> <br />
                            CSKH: <span><a href="tel:0937309879" rel="noreferrer nofollow">091.667.5555</a> </span><br />
                            Giấy CNĐKDN: 0102358899<br />
                            Ngày cấp: 31/08/2007
                            Cơ quan cấp: Phòng Đăng ký kinh doanh Sở Kế hoạch và Đầu tư TPHN<br />

                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="title-contact mb-3">HỖ TRỢ KHÁCH HÀNG</div>
                            <ul className="ul-footer">
                                <li>
                                    <h6 className="title_h6">
                                        <a href="/contact" >Bảo hành </a>  <br />

                                    </h6>
                                </li>
                                <li>
                                    <h6 className="title_h6">
                                        <a href="/contact" >Quy định và hình thức thanh toán</a><br />

                                    </h6>
                                </li>
                                <li>
                                    <h6 className="title_h6">
                                        <a href="/contact" >Vận chuyển giao nhận</a><br />

                                    </h6>
                                </li>
                                <li>
                                    <h6 className="title_h6">
                                        <a href="/conatct" >Đổi trả hàng và hoàn tiền</a><br />

                                    </h6>
                                </li>
                                <li>
                                    <h6 className="title_h6">
                                        <a href="/contact" >Bảo mật thông tin</a><br />

                                    </h6>
                                </li>

                            </ul>
                            <div className="title-contact">
                                LIÊN KẾT MẠNG XÃ HỘI
                            </div>
                            <div className="social">
                                <a href="/" title="Facebook">
                                    <FaFacebook />
                                </a>
                                <a href="/" title="Instagram">
                                    <FaInstagram />
                                </a>
                                <a href="/" title="Youtube">
                                    <FaYoutube />
                                </a>
                                <a href="/" title="Twitter">
                                    <FaTwitter />
                                </a>
                                <a href="/" title="Twitter">
                                    <FaPinterest />
                                </a>

                            </div>

                            <div className="d-flex flex-nowrap justify-content-start align-items-center">
                                <a
                                    className="w-50"
                                    href="/contact"
                                    target="_blank"
                                >
                                    <img
                                        className="img-fluid"
                                        src={require('../../Images/Logo/vuongtrong.png')}
                                    />
                                </a>
                                <a
                                    href="/contact"
                                    title="DMCA.com Protection Status"
                                    className="dmca-badge w-25 pl-3"
                                >
                                    {" "}
                                    <img
                                        className="img-fluid"
                                        src="https://images.dmca.com/Badges/_dmca_premi_badge_2.png?ID=9eddbb58-2596-4106-ab66-8fb7ca2ba150"
                                        alt="DMCA.com Protection Status"
                                    />
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="title-contact" style={{paddingBottom: 20}}>
                                VỊ TRÍ CỬA HÀNG
                            </div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.201757241521!2d106.67615171458921!3d10.795853992308347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d6786d52bf%3A0x77a4a2db8949796e!2zMTAyIE5ndXnhu4VuIMSQw6xuaCBDaMOtbmgsIFBoxrDhu51uZyAxNSwgUGjDuiBOaHXhuq1uLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1671530024170!5m2!1svi!2s"
                                height={300}
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                
                            />
                        </div>
                        <div className="copyright text-center pt-3 pb-3 mt-3 font-size-14">
                        Bản Quyền @ 2023{" "}
                        <span className="text-ffbe00">
                            BTH ART - Thế giới tranh vẽ trang trí cao cấp.
                        </span>

                    </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer;