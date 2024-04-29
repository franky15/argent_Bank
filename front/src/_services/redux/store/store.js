import { configureStore } from '@reduxjs/toolkit';

//importation des reducers
import AccountReducer from '../reducers/Account.Reducer';
import { userReducer } from '../reducers/User.Reducer';


// Création du store à l'aide de configureStore de Redux Toolkit
const store = configureStore({
  reducer: {
    reducerAuth: AccountReducer,
    reducerUser: userReducer,
  }
 
});

export default store;
