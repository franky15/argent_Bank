
//********NB: les sélecteurs sont des fonctions ayant un paramètre (state globale) et qui retournent une partie de ce state global


//récupération du status de l'authentification de l'utilisateur
export const isAuthenticatedSelector = (state) => state.auth;

//récupération du token de l'utilisateur
export const tokenSelector = (state) => state.reducerAuth.token;

export const getuserSelector = (state) => state.reducerUser.user;