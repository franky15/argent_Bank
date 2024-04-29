
//********NB: les sélecteurs sont des fonctions ayant un paramètre (state globale) et qui retournent une partie de ce state global


//récupération du status de l'authentification de l'utilisateur
export const isAuthenticatedSelector = (state) => state.reducerAuth.isAuthenticated;

//récupération du token de l'utilisateur
export const tokenSelector = (state) => state.reducerAuth.token;

export const getuserSelector = (state) => state.reducerUser.user;