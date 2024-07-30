import './NotFound.scss'
import React from "react";
import { NavLink } from 'react-router-dom';


const NotFound = (props) => {
    return (
        <>

            <div className='NotFound'>
                <>
                    <div className="container">
                        <div className="loader">
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                        <div className="loading">
                            <span className="loader-text">404</span>
                            <span className="loader-text">Loading</span>
                        </div>
                    </div>

                </>
            </div>
        </>

    )
}
export default NotFound;