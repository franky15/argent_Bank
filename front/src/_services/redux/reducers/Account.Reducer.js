//gestion de la logique de l'authentification du user

//importation de createAction pour la gestion la création des actions avec redux toolkit(remplace l'action creator)
import { createAction } from '@reduxjs/toolkit';

//importation de createReducer pour la gestion des reducers avec redux toolkit(remplace le reducer)
import { createReducer } from '@reduxjs/toolkit';


//le choix de ce state est dû au fait que l'authentification est un état global donc on choisit le state global
const initialState = {

    isAuthenticated: false,
    token: null,
}

// Création des actions à l'aide de createAction de Redux Toolkit
export const loginSuccess = createAction('auth/loginSuccess');
export const logoutSuccess = createAction('auth/logoutSuccess');
export const loginFailure = createAction('auth/loginFailure');

// Création du reducer à l'aide de createReducer de Redux Toolkit
const AccountReducer = createReducer(initialState, (builder) => { // createReducer prend deux paramètres, le premier est l'état initial et le deuxième est une fonction qui prend un paramètre un objet qui est le builder qui va permettre d'éxécuter de la logique en fontion de l'action dispatchée

    builder
        .addCase(loginSuccess, (state, action) => { // éxécution de ce cas lorsque loginSuccess sera dispatché, le deuxième paramètre est une fonction qui sera exécutée qui a également un premier paramètre qui est le state précédent et un deuxième paramètre qui est l'action actuelle dans laquelle on a le payload approprié
            
            console.log("***bienvenue loginSuccess")

            state.isAuthenticated = true; // Mis à jour de l'état pour indiquer que l'utilisateur est authentifié
            state.token = action.payload; // Mis à jour du token d'authentification avec celui reçu en payload ou ajout du payload dans l'action
       
           // console.log("***token dans reducer",state.token)
            //console.log("***isAuthenticated dans reducer",state.isAuthenticated)

            
        })
        .addCase(loginFailure,(state, action) => {

            console.log("***bienvenue loginFailure")

            state.isAuthenticated = false;
            state.token = null;

            //console.log("***isAuthenticated dans reducer",state.isAuthenticated)
        })
        .addCase(logoutSuccess, (state) => { 
            
            console.log("***bienvenue logoutSuccess")

            state.isAuthenticated = false; // Mis à jour de l'état pour indiquer que l'utilisateur n'est plus authentifié
            state.token = null; // Suppression du token d'authentification
            
           // console.log("***isAuthenticated dans reducer",state.isAuthenticated)
       
        });


})

//exportation du reducer AccountReducer
export default AccountReducer;
