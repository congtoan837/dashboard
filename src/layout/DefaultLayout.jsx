import React from 'react';
import {AppHeader, AppSidebar} from 'components/index';
import {CContainer} from "@coreui/react";
import {Outlet} from "react-router-dom";

const DefaultLayout = () => {
    return (
        <div>
            <AppSidebar/>
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader/>
                <div className="body flex-grow-1">
                    <CContainer className="px-4" lg>
                        <Outlet/>
                    </CContainer>
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
