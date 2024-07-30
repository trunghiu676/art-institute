import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import './PayMent.scss';
import banner1 from '../../Images/Banner/1.jpg';



const PayMent = (props) => {
    const searchSp = (values) => {
        if (values !== '') {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Payment Successful',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    return (
        <>
            <section className="w-100 pt-3 pb-3 position-relative">
                <div className="container payment">
                    <h5 className="linknow">
                        <Breadcrumb >
                            <Breadcrumb.Item ><NavLink to='/' className='nav-link'>TRANG CHỦ</NavLink></Breadcrumb.Item>
                            <Breadcrumb.Item active>THANH TOÁN</Breadcrumb.Item>
                        </Breadcrumb>
                    </h5>
                    <form method="post" name="shoppingcart" id="shoppingcart">
                        <div className="row step_2">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="w-100 h-100 border rounded bg-white mb-2 mb-lg-0 pl-2 pr-2 pb-2 pl-sm-3 pr-sm-3 pb-sm-3">
                                    <div className="title-text">
                                        <span style={{ color: 'black', fontWeight: 600, fontSize: 20 }}>Thông Tin Khách Hàng</span>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 col-12">
                                            <div className="form-group" id="input-name">
                                                <input
                                                    type="text"
                                                    className="form-control name"
                                                    name="name"
                                                    defaultValue=""
                                                    placeholder="Họ và tên (*)"
                                                    control-id="ControlID-4"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-12">
                                            <div className="form-group" id="input-phone">
                                                <input
                                                    name="phone"
                                                    className="form-control phone"
                                                    type="text"
                                                    defaultValue=""
                                                    placeholder="Số điện thoại (*)"
                                                    control-id="ControlID-5"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-12">
                                            <div className="form-group" id="input-email">
                                                <input
                                                    defaultValue=""
                                                    name="email"
                                                    className="form-control email"
                                                    type="email"
                                                    placeholder="Email"
                                                    control-id="ControlID-6"
                                                />
                                                <label htmlFor="wmFieldName"
                                                    data-empty="Hãy nhập trường này"
                                                    data-invalid="Email không hợp lệ"
                                                    data-valid="Email hợp lệ">
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group" id="input-address">
                                        <input
                                            name="address"
                                            className="form-control address"
                                            type="text"
                                            defaultValue=""
                                            placeholder="Địa chỉ"
                                            control-id="ControlID-7"
                                        />
                                    </div>
                                    <div className="title_thanhtoan" style={{ color: 'black', fontWeight: 600, fontSize: 20 }}>Thông tin người nhận hàng</div>
                                    <div className="form-group mycheck">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="check"
                                                defaultValue={1}
                                                onclick="copy_info(this.checked)"
                                                control-id="ControlID-8"
                                            />{" "}
                                            Tôi là người nhận hàng
                                        </label>
                                    </div>
                                    <div className="form-group" id="input-name_nn">
                                        <input
                                            type="text"
                                            className="form-control name_nn"
                                            name="name_nn"
                                            defaultValue=""
                                            placeholder="Họ và tên người nhận hàng (*)"
                                            control-id="ControlID-9"
                                        />
                                    </div>
                                    <div className="form-group" id="input-phone_nn">
                                        <input
                                            type="text"
                                            className="form-control phone_nn"
                                            name="phone_nn"
                                            defaultValue=""
                                            placeholder="Số điện thoại người nhận hàng (*)"
                                            control-id="ControlID-10"
                                        />
                                    </div>
                                    <div className="form-group" id="input-address_nn">
                                        <input
                                            type="text"
                                            className="form-control address_nn"
                                            name="address_nn"
                                            defaultValue=""
                                            placeholder="Địa chỉ người nhận hàng (*)"
                                            control-id="ControlID-11"
                                        />
                                    </div>
                                    <div className="form-group" id="input-notice">
                                        <textarea
                                            name="notice"
                                            type="text"
                                            className="form-control p-2"
                                            style={{ height: 100 }}
                                            placeholder="Ghi chú đơn hàng"
                                            control-id="ControlID-12"
                                            defaultValue={""}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 col-12 mt-4 mt-lg-0">
                                <div className="w-100 border rounded bg-white pl-2 pr-2 pb-2 pl-sm-3 pr-sm-3 pb-sm-3">
                                    <div className="title-text">
                                        <span style={{ color: 'black', fontWeight: 600, fontSize: 20 }}>Giỏ Hàng Của Bạn</span>
                                    </div>
                                    <table className="table mb-0">
                                        <tbody>
                                            <input
                                                type="hidden"
                                                name="rowid"
                                                defaultValue="8b6089269d17381873ec2207506aa62a"
                                                control-id="ControlID-13"
                                            />
                                            <tr className="position-relative">
                                                <td
                                                    colSpan={2}
                                                    className="product-name position-relative"
                                                    data-title="Product"
                                                >
                                                    <div className="row">
                                                        <div className="col-md-2 col-sm-2 col-3 pl-0">
                                                            <a href="">
                                                                <img
                                                                    className="img-fluid border"
                                                                    src="https://thegioianhsang.vn/application/upload/products/thumbs/den-chum-phong-khach-thcn293.jpg"
                                                                    alt="Đèn chùm gắn trần phòng khách 15 bóng PH-THCN293"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="col-md-10 col-sm-10 col-9">
                                                            <div className="name-cart font-weight-bold mt-2 mt-sm-0">
                                                                <span>
                                                                    Đèn chùm gắn trần phòng khách 15 bóng PH-THCN293
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span>
                                                                    Mã sản phẩm : <b>PH23-THCN293</b>
                                                                </span>
                                                            </div>
                                                            <div className="w-100 mt-2 pt-2 bordertop">
                                                                <div className="row d-flex align-items-center">
                                                                    <div className="col-lg-5 col-5">
                                                                        <div className="w-100 d-flex justify-content-start align-items-center">
                                                                            <div className="w-50">Số lượng:</div>
                                                                            <div className="w-50 no-gutters number d-flex justify-content-start ml-2">
                                                                                <div
                                                                                    className="col-lg-4 col-4 rounded-left bt_quantity_update quantity_down"
                                                                                    quantity="-"
                                                                                    rowid="8b6089269d17381873ec2207506aa62a"
                                                                                >
                                                                                    <i className="fas fa-minus" />
                                                                                </div>
                                                                                <div className="col-lg-4 col-4 product-quantity">
                                                                                    <input
                                                                                        name="qty"
                                                                                        type="text"
                                                                                        id="qty8b6089269d17381873ec2207506aa62a"
                                                                                        className="qty"
                                                                                        defaultValue={1}
                                                                                        disabled=""
                                                                                        control-id="ControlID-14"
                                                                                    />
                                                                                </div>
                                                                                <div
                                                                                    className="col-lg-4 col-4 rounded-right bt_quantity_update quantity_up"
                                                                                    quantity="+"
                                                                                    rowid="8b6089269d17381873ec2207506aa62a"
                                                                                >
                                                                                    <i className="fas fa-plus" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-7 col-7 colprice">
                                                                        <div className="w-100">
                                                                            Giá bán :{" "}
                                                                            <span className="font-weight-bold">
                                                                                3,300,000<sup>đ</sup>
                                                                            </span>
                                                                        </div>
                                                                        <a
                                                                            className="delete"
                                                                            href=""
                                                                            title="8b6089269d17381873ec2207506aa62a"
                                                                            id={1}
                                                                        >
                                                                            <i className="fas fa-trash-alt" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*end col-md-10*/}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="position-relative">
                                                <td
                                                    colSpan={2}
                                                    className="product-name position-relative"
                                                    data-title="Product"
                                                >
                                                    <div className="row">
                                                        <div className="col-md-2 col-sm-2 col-3 pl-0">
                                                            <a href="">
                                                                <img
                                                                    className="img-fluid border"
                                                                    src="https://thegioianhsang.vn/application/upload/products/thumbs/den-tha-tran-phong-khach-EC-T48-17.jpg"
                                                                    alt="Đèn chùm gắn trần phòng khách 15 bóng PH-THCN293"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="col-md-10 col-sm-10 col-9">
                                                            <div className="name-cart font-weight-bold mt-2 mt-sm-0">
                                                                <span>
                                                                    Đèn Thả Trần Phòng Khách Hiện Đại Sang Trọng EC-T48/17
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span>
                                                                    Mã sản phẩm : <b>BH12-CJCN591</b>
                                                                </span>
                                                            </div>
                                                            <div className="w-100 mt-2 pt-2 bordertop">
                                                                <div className="row d-flex align-items-center">
                                                                    <div className="col-lg-5 col-5">
                                                                        <div className="w-100 d-flex justify-content-start align-items-center">
                                                                            <div className="w-50">Số lượng:</div>
                                                                            <div className="w-50 no-gutters number d-flex justify-content-start ml-2">
                                                                                <div
                                                                                    className="col-lg-4 col-4 rounded-left bt_quantity_update quantity_down"
                                                                                    quantity="-"
                                                                                    rowid="8b6089269d17381873ec2207506aa62a"
                                                                                >
                                                                                    <i className="fas fa-minus" />
                                                                                </div>
                                                                                <div className="col-lg-4 col-4 product-quantity">
                                                                                    <input
                                                                                        name="qty"
                                                                                        type="text"
                                                                                        id="qty8b6089269d17381873ec2207506aa62a"
                                                                                        className="qty"
                                                                                        defaultValue={2}
                                                                                        disabled=""
                                                                                        control-id="ControlID-14"
                                                                                    />
                                                                                </div>
                                                                                <div
                                                                                    className="col-lg-4 col-4 rounded-right bt_quantity_update quantity_up"
                                                                                    quantity="+"
                                                                                    rowid="8b6089269d17381873ec2207506aa62a"
                                                                                >
                                                                                    <i className="fas fa-plus" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-7 col-7 colprice">
                                                                        <div className="w-100">
                                                                            Giá bán :{" "}
                                                                            <span className="font-weight-bold">
                                                                                5,200,000<sup>đ</sup>
                                                                            </span>
                                                                        </div>
                                                                        <a
                                                                            className="delete"
                                                                            href=""
                                                                            title="8b6089269d17381873ec2207506aa62a"
                                                                            id={1}
                                                                        >
                                                                            <i className="fas fa-trash-alt" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*end col-md-10*/}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    className="font-weight-bold"
                                                    style={{ verticalAlign: "middle" }}
                                                >
                                                    Tổng Thanh Toán
                                                </td>
                                                <td className="font-weight-bold font-size-18 text-danger total_tamtinh text-right" style={{ fontWeight: 700 }}>
                                                    13,500,000 đ
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="w-100 payment">
                                        <div className="title_thanhtoan">Phương thức thanh toán</div>
                                        <ul className="wc_payment_methods payment_methods methods">
                                            <li className="wc_payment_method payment_method_2">
                                                <input
                                                    id="payment_method_2"
                                                    type="radio"
                                                    className="input-radio"
                                                    name="payment_method"
                                                    defaultValue={2}
                                                    defaultChecked="checked"
                                                    control-id="ControlID-15"
                                                />
                                                <label htmlFor="payment_method_{{ $item->id }}">
                                                    Thanh toán bằng tiền mặt
                                                </label>
                                            </li>
                                            <li className="wc_payment_method payment_method_1">
                                                <input
                                                    id="payment_method_1"
                                                    type="radio"
                                                    className="input-radio"
                                                    name="payment_method"
                                                    defaultValue={1}
                                                    control-id="ControlID-16"
                                                />
                                                <label htmlFor="payment_method_{{ $item->id }}">
                                                    Thanh toán online bằng thẻ visa, master, ATM
                                                </label>
                                            </li>
                                        </ul>
                                        <div className="w-100 border-top pt-3 text-center">
                                            <input
                                                type="hidden"
                                                name="csrf_test_name"
                                                defaultValue="53b90e12cc0193a9e61b2a4c9c160192"
                                            />
                                            <button
                                                type="button"
                                                onclick="javascript:formCart('shoppingcart');"
                                                className="w-100 btn btn-info rounded p-2 mt-1"
                                                control-id="ControlID-17"
                                                onClick={() => { searchSp() }}

                                            >
                                                <svg
                                                    width="1.5em"
                                                    height="1.5em"
                                                    viewBox="0 0 16 16"
                                                    className="bi bi-arrow-right bounceAndRotate"
                                                    fill="currentColor"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"
                                                    />
                                                </svg>{" "}
                                                MUA NGAY
                                            </button>
                                            <a
                                                className="d-block mt-3 font-weight-bold"
                                                href="/"
                                                title="Mua Thêm Sản Phẩm Khác"
                                                style={{ color: 'black', fontWeight: 600, fontSize: 20, textDecoration: 'none' }}
                                            >
                                                Mua Thêm Sản Phẩm Khác{" "}
                                                <svg
                                                    width="1.5em"
                                                    height="1.5em"
                                                    viewBox="0 0 16 16"
                                                    className="bi bi-arrow-right"
                                                    fill="currentColor"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"
                                                    />
                                                </svg>{" "}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='body-title1'>
                        <div className="new_title position-relative text-center mb-3">
                            <h3 className="">
                                <hr />
                                <NavLink to='/'
                                    title="Đèn trang trí mới"
                                >
                                    Sản phẩm tương tự
                                </NavLink>
                            </h3>
                        </div>
                    </div>
                    {/* <div className="row">
                        {datadenngoaithat.map((course, index) => {
                            return (
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={index}>
                                    <NavLink to='/detailsp' className='spthem'>
                                        <div className="card">
                                            <img src={course.imgurl} className="card-img-top " />
                                            <div className="card-body">
                                                <h2 className="card-title">
                                                    {course.tieude}
                                                </h2>
                                                <span className="card-price">
                                                    {course.giasp}
                                                </span>
                                                <del className='card-sale'>
                                                    {course.giagiam}
                                                </del>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            )
                        })}
                    </div> */}
                </div>
            </section>

        </>
    )
}

export default PayMent;