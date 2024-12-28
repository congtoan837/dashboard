import React, {Suspense, useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {CSpinner, useColorModes} from '@coreui/react';
import './scss/style.scss';

// Layouts
import DefaultLayout from "./layout/DefaultLayout";

// Pages
import Dashboard from "./views/Dashboard";
import UsersContainer from "./views/UsersContainer";
import Login from "./views/Login";
import Page404 from "./views/Page404";
import Page500 from "./views/Page500";
import IndexLayout from "./layout/IndexLayout";
import ProductsContainer from "./views/ProductsContainer";

const App = () => {
    const {isColorModeSet, setColorMode} = useColorModes('mode');
    const storedTheme = useSelector((state) => state.theme);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
        const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
        if (theme) {
            setColorMode(theme);
        }

        if (isColorModeSet()) {
            return;
        }

        setColorMode(storedTheme);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <BrowserRouter>
            <Suspense fallback={<CSpinner color="primary"/>}>
                <Routes>
                    {/* Routes using DefaultLayout */}
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<DefaultLayout/>}>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="users" element={<UsersContainer/>}/>
                        <Route path="orders"/>
                        <Route path="products" element={<ProductsContainer/>}/>
                    </Route>
                    <Route path="/" element={<Navigate to="/dashboard" replace/>}/>

                    {/* Routes using DefaultLayout */}
                    <Route path="/" element={<IndexLayout/>}>
                        <Route path="home" element={<Page500/>}/>
                    </Route>

                    {/* Catch all other routes */}
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
