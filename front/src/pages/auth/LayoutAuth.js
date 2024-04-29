import React from 'react';
import {Outlet } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const LayoutAuth = () => {
    return (
        <div className='LayoutAuth'>
            <Header/>
                <Outlet/>
            <Footer/>
        </div>
       
    );
};

export default LayoutAuth;