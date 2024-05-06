import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { useNavigate } from 'react-router-dom';
import {jwtDecode }from "jwt-decode";

import { accountServices } from "../../_services/Account.services";

const initialState = {

    token: "",
    userId: "",
    //email: "",
    //password: "",
    loginStatus: "",
    loginError: "",
}

// Création d'une action asynchrone pour gérer la connexion de l'utilisateur
export const login = createAsyncThunk(

    'auth/login', // Nom de l'action
    async(loginObject, { rejectWithValue }) => { // Fonction asynchrone qui prend en paramètre les informations de connexion et un objet contenant une méthode rejectWithValue pour gérer les erreurs

        try{
        
            const response = await accountServices.login(loginObject) 
            accountServices.saveToken(response.data.body.token)

            return response.data

        }catch(err){
            console.log(err.code);
            return rejectWithValue(err.response.data)
        }

    }

);

// Création du slice pour gérer les actions et le state
const authSlice = createSlice({

    name: "auth", // Nom du slice
    initialState, //transmission du state initial en fonction de l'authentification
    
    reducers: {  // Définition des reducers de des parties synchrones

        // Fonction pour déconnecter l'utilisateur
        logout: (state) => {

            accountServices.logout(); 
            state.token = "";
           
        },
    },
    extraReducers:(builder) => {  

        builder
            .addCase(login.fulfilled, (state, action) => { // Ajout d'un cas de succès pour l'action de connexion

                state.token = action.payload.body.token;
                state.loginStatus = "success"; 
                state.loginError = ""; 

                const token = action.payload.body.token;

                if (token) {

                    try {
                        
                        const decodedToken = jwtDecode(token);
                        state.userId = decodedToken.id;

                        //stockage deuserId dans le localstorage
                        localStorage.setItem("userId", decodedToken.id);

                        return state;
                
                    } catch (error) {

                        console.error('Erreur lors du décodage du token :', error);
                    
                        state.loginError = error;

                        //déconnexion de l'utilisateur entrainant la suppression du token du localstorage
                        accountServices.logout();
                    }

                }

            });

        builder
            .addCase(login.pending, (state, action) => { 
                state.loginStatus = "loading"; 

            });

        builder
            .addCase(login.rejected, (state, action) => { 

                console.log("****action.payload dans rejected", action.payload.error)

                state.loginStatus = "failed"; 
                state.loginError = action.payload.error; 

                console.log("erreur", action.payload.error);
            });
             

    }


})

// Export des actions
export const { logout } = authSlice.actions;

// Export du reducer
const authReducer = authSlice.reducer;

export default authReducer
