//gestion de la logique du user

//importation des selectors qui permettent de récupérer les données du store
import { tokenSelector } from "../selectors/selectors";

//importation de createAction pour la gestion la création des actions avec redux toolkit(remplace l'action creator)
import { createAction } from '@reduxjs/toolkit';

//importation de createReducer pour la gestion des reducers avec redux toolkit(remplace le reducer)
import { createReducer } from '@reduxjs/toolkit';


//importation des services
import { userServices } from '../../User.services';


//le choix de ce state est dû au fait que l'authentification est un état global donc on choisit le state global
const initialState = {

    user: null,
    userUpdateSuccess: false,
    userGetSuccess: false,
    userDeleteSuccess: false,
    userError: false
    
}

// Création des actions à l'aide de createAction de Redux Toolkit
export const userUpdateSuccess = createAction('user/userUpdateSuccess');
export const userGetSuccess = createAction('user/userGetSuccess');
export const userDeleteSuccess = createAction('user/userDeleteSuccess');
export const userError = createAction('user/userError');

// Définition du reducer qui fonctionnera avec getUserThunk
export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(userUpdateSuccess, (state, action) => {

            console.log("**bienvenue dans l'action  userUpdateSuccess");
            
            state.userUpdateSuccess = true;
            state.userGetSuccess = false;
            state.user = action.payload;

        })
        .addCase(userGetSuccess, (state, action) => {

            console.log("**bienvenue dans l'action  userGetSuccess");

            state.userGetSuccess = true;
            state.userUpdateSuccess = false;
            state.user = action.payload;

            //console.log('**state.user dans mon action', state.user);
        })
        .addCase(userDeleteSuccess, (state) => {
            state.userDeleteSuccess = true;
        })
        .addCase(userError, (state, action) => {
            state.userError = true;
        });
});

//récupération de l'utilisateur
// Création du thunk creator de la fonction getUser car elle est asynchrone d'ou le dispatch, getState en paramètre
export async function getUserThunk(dispatch, getState) {
    
    const user = tokenSelector(getState());

    if (user && user !== null) {
        try {
            

            // Effectuer la requête
            const response = await userServices.getUser(user);
            const userData = response.data.body;
            
            // Dispatch l'action avec les données récupérées
            dispatch(userGetSuccess(userData));


        } catch (err) {
            // Gérer les erreurs
            console.error('Error fetching user:', err);
            dispatch(userError());
        }
    }
       

};

