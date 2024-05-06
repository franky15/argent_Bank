import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


//importation des éléments de redux et du store
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from './features/_slices/authSlice';
import userReducer from './features/_slices/userSlice';
//import store from './_services/redux/store/store';


//creation du store
const store = configureStore({

  reducer: {

   auth: authReducer,
   user: userReducer,

  },

  
});

//éxécution des actions ou fonction asynchrones 







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
