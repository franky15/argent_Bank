
import { Navigate } from "react-router-dom";

import { accountServices } from "../_services/Account.services"; 
import { useSelector } from 'react-redux';

import Error from "../_utils/Error";

const AuthGuard = ({ children }) => { //children car il aura des enfants quand on va le mettre dans le router

    const userStore = useSelector((state) => state.auth);

    //console.log('**userStore loginStatus dans AuthGuard', userStore.loginStatus);

    //console.log('**accountServices.isLogged', accountServices.isLogged);
    
    if(!accountServices.isLogged){ //si false (pas de token ou token expiré) alors on est toujours redirigé vers la même page de connexion
        
        return <Navigate to="/auth/login"/> //navigate parmet une redirection vers une route
    
    }else if(userStore.loginStatus === ""){ //si l'utilisateur n'est pas récupéré alors on est redirigé vers la page de connexion 

        //console.log('**userStore dans AuthGuard', userStore);

        return <Navigate to="/auth/login"/> 

    }/*else if(userStore.loginError !== "" ){ //si l'utilisateur n'est pas récupéré alors on est redirigé vers la page de connexion 

        //console.log('**userStore dans AuthGuard', userStore);

        return <Error to="/error"/> 
    }*/

    return children  //ici on retourne le mini router <AdminRouter/> car il est l'enfant de <AuthGuard>
};

export default AuthGuard;
