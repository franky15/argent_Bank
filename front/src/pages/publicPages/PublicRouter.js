import React from 'react';
import { Routes, Route } from "react-router-dom";
import {Home} from './index';


import PupblicLayout from './PublicLayout';
import Error from '../../_utils/Error';

const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<PupblicLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path='*' element= { <Error/> }/>
            </Route>
        </Routes>
    );
};

export default PublicRouter;