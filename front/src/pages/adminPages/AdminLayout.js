import React from 'react';
import {Outlet } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AdminLayout = () => {
    return (
        <div className='AdminLayout'>
            <Header/>
                <Outlet/>
            <Footer/>
        </div>
    );
};

export default AdminLayout; 