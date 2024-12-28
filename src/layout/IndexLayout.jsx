import React from 'react'

import {Outlet} from "react-router-dom";
import {Header} from "../components";

const IndexLayout = () => {
    return (
        <div className="wrapper d-flex flex-column min-vh-100">
            <Header/>
            <div className="main">
                <Outlet/>
            </div>
        </div>
    )
}

export default IndexLayout
