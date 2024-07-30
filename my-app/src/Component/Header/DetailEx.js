import { Breadcrumb } from "react-bootstrap";
import "./DetailEx.scss"
import { NavLink } from "react-router-dom";

const DetailEx = () => {


    return (
        <>
            <div className="mt-3">
                <div className="container">
                    <h5 className="linknow">
                        <Breadcrumb >
                            <Breadcrumb.Item ><NavLink to='/' className='nav-link' style={{ color: 'black' }}>Home</NavLink></Breadcrumb.Item>
                            <Breadcrumb.Item active> Exhibition</Breadcrumb.Item>
                        </Breadcrumb>
                    </h5>
                    <>
                        <title>CSS Cards</title>
                        <meta charSet="UTF-8" />

                        <div className="card-category-3">
                            <span className="category-name">Overlay Image Cards</span> <br />
                            <br />
                            <ul>
                                <li>
                                    <div className="ioverlay-card io-card-1">
                                        <div className="card-content">
                                            <span className="card-title">Light of Ocean</span>
                                            <p className="card-text">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry.Image by{" "}
                                                <a
                                                    href="https://pixabay.com/users/Mariamichelle-165491/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=685303"
                                                    style={{ textDecoration: "none", color: "#fff" }}
                                                >
                                                    Michelle Maria
                                                </a>{" "}
                                                from{" "}
                                                <a
                                                    href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=685303"
                                                    style={{ textDecoration: "none", color: "#fff" }}
                                                >
                                                    Pixabay
                                                </a>
                                            </p>
                                        </div>
                                        <span className="card-link">
                                            <a href="#" title="Read Full">
                                                {" "}
                                                This is a Link{" "}
                                            </a>
                                        </span>
                                        <img src="https://www.dropbox.com/s/360d3xgejuncx7l/bora-bora-685303_1280.jpg?raw=1" />
                                    </div>
                                </li>
                                <li>
                                    <div className="ioverlay-card io-card-2">
                                        <div className="card-content">
                                            <span className="card-title">Card Title</span>
                                            <p className="card-text">
                                                Image by{" "}
                                                <a
                                                    href="https://pixabay.com/users/1195798-1195798/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4296784"
                                                    style={{ textDecoration: "none", color: "#fff" }}
                                                >
                                                    1195798
                                                </a>{" "}
                                                from{" "}
                                                <a
                                                    href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4296784"
                                                    style={{ textDecoration: "none", color: "#fff" }}
                                                >
                                                    Pixabay
                                                </a>
                                            </p>
                                        </div>
                                        <span className="card-link">
                                            <a href="#" title="Read Full">
                                                <span>This is a Link</span>
                                            </a>
                                        </span>
                                        <img src="https://www.dropbox.com/s/lsxxizyph3ic7zb/frog-4296784_640.jpg?raw=1" />
                                    </div>
                                </li>
                            </ul>

                            <ul>
                                <li>
                                    <div className="ioverlay-card io-card-1">
                                        <div className="card-content">
                                            <span className="card-title">Light of Ocean</span>
                                            <p className="card-text">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry.Image by{" "}
                                                <a
                                                    href="https://pixabay.com/users/Mariamichelle-165491/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=685303"
                                                    style={{ textDecoration: "none", color: "#fff" }}
                                                >
                                                    Michelle Maria
                                                </a>{" "}
                                                from{" "}
                                                <a
                                                    href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=685303"
                                                    style={{ textDecoration: "none", color: "#fff" }}
                                                >
                                                    Pixabay
                                                </a>
                                            </p>
                                        </div>
                                        <span className="card-link">
                                            <a href="#" title="Read Full">
                                                {" "}
                                                This is a Link{" "}
                                            </a>
                                        </span>
                                        <img src="https://www.dropbox.com/s/360d3xgejuncx7l/bora-bora-685303_1280.jpg?raw=1" />
                                    </div>
                                </li>
                                <li>
                                    <div className="ioverlay-card io-card-2">
                                        <div className="card-content">
                                            <span className="card-title">Card Title</span>
                                            <p className="card-text">
                                                Image by{" "}
                                                <a
                                                    href="https://pixabay.com/users/1195798-1195798/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4296784"
                                                    style={{ textDecoration: "none", color: "#fff" }}
                                                >
                                                    1195798
                                                </a>{" "}
                                                from{" "}
                                                <a
                                                    href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4296784"
                                                    style={{ textDecoration: "none", color: "#fff" }}
                                                >
                                                    Pixabay
                                                </a>
                                            </p>
                                        </div>
                                        <span className="card-link">
                                            <a href="#" title="Read Full">
                                                <span>This is a Link</span>
                                            </a>
                                        </span>
                                        <img src="https://www.dropbox.com/s/lsxxizyph3ic7zb/frog-4296784_640.jpg?raw=1" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <br />


                    </>

                </div>
            </div>
        </>
    );
}

export default DetailEx;