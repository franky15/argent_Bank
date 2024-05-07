import React from 'react';
import { Route, Routes } from "react-router-dom";

//importation des composants
import Error from '../../_utils/Error';

import { Profile } from './user/index';

const AdminRouter = () => {
    return (
        <Routes>
            <Route>
                <Route path='/profile/:id' element={<Profile />} />
            
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    );
};

export default AdminRouter;