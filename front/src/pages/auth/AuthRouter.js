import React from 'react';
import {  Route, Routes } from 'react-router-dom';

import LayoutAuth from './LayoutAuth';
import Login from './Login';
import Error from '../../_utils/Error';

const AuthRouter = () => {
    return (
        <Routes>
            <Route element={<LayoutAuth/>}>
                <Route index element={<Login/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element= { <Error/> }/>
            </Route>
        </Routes>
    );
};

export default AuthRouter;