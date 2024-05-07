import React from 'react'; //{useState}
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//importation des  routers
import AdminRouter from './pages/adminPages/AdminRouter';
import AuthRouter from './pages/auth/AuthRouter';
import PublicRouter from './pages/publicPages/PublicRouter';

//permet de protéger les routes qui ont besoin de authentification
import AuthGuard from './_helpers/AuthGuard';

//importation des layouts
import AdminLayout from './pages/adminPages/AdminLayout';

import Error from './_utils/Error';


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/*' element={<PublicRouter/>} />
        <Route path='/auth/*' element={<AuthRouter/>} />
        <Route path='/error' element={<Error />} />
        <Route element={<AdminLayout/>}>
          <Route path='/admin/*' element={
             <AuthGuard>
                <AdminRouter/>
             </AuthGuard>
            
          }/>

        </Route>
      </Routes>
    
    
    </BrowserRouter> 
  );
}

export default App;
