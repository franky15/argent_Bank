
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

//importation des services
import { userServices } from "../../_services/User.services";


//le choix de ce state est dû au fait que l'authentification est un état global donc on choisit le state global
const initialState = {

    user: null,
    userUpdateSuccess: false,
    userGetSuccess: false,
    userError: false
    
}



//creation de l'action asynchrone pour récupérer l'utilisateur
export const getUser = createAsyncThunk(

    'user/getUser',
    async (user, { rejectWithValue }) => {

        try {
            const response = await userServices.getUser();
            return response.data.body;

        } catch (err) {
            console.error('Error fetching user:', err);
            return rejectWithValue(err.response.data);
        }

    }
);

export const updateUser = createAsyncThunk(

    'user/updateUser',
    async (user, { rejectWithValue }) => {

        try {
            const response = await userServices.updateUser(user);
            return response.data.body;

        } catch (err) {
            console.error('Error fetching user:', err);
            return rejectWithValue(err.response.data);
        }

    }
);

//création du slice pour gérer les actions et le state
export const userSlice = createSlice({

    name: "user", // Nom du slice
    initialState, //transmission du state initial en fonction de l'authentification
    reducers: {}, // Définition des reducers de des parties synchrones
    
    extraReducers: (builder) => {

        builder
            .addCase(getUser.fulfilled, (state, action) => {

                state.user = action.payload;
                state.userGetSuccess = true;
                state.userUpdateSuccess = false;
                state.userError = false;

            })

        builder
            .addCase(updateUser.fulfilled, (state, action) => {

                state.user = action.payload;
                state.userUpdateSuccess = true;
                state.userGetSuccess = false;
                state.userError = false;

            })
        
        builder
            .addCase(getUser.rejected, (state) => {

                state.userError = true;
                state.userGetSuccess = false;
                state.userUpdateSuccess = false;

            })
        builder
            .addCase(updateUser.rejected, (state) => {

                state.userError = true;
                state.userGetSuccess = false;
                state.userUpdateSuccess = false;

            });

    }



});


//exportation du reducer
const userReducer = userSlice.reducer;
export default userReducer;




