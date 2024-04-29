
import Axios from "./Caller.services"


// gestion de la connexion
let login = (loginObject) => {
    
   

    return Axios.post("/api/v1/user/login", loginObject) 
}                                      


//gestion du token dans le localstorage
let saveToken = (token) => {  
    
    localStorage.setItem("userToken", token) //enregistrement du token dans le localstorage
}

let logout = () => {

    localStorage.removeItem("userToken")  //supression du token dans le localstorage
}

let getToken = () => {
    return localStorage.getItem("userToken")  //récupération du token dans le localStorage
}

let isLogged = () => {
    
    let token = localStorage.getItem("userToken")

    return !!token //transformation d'une variable en booléen ici ça veut dire s'il y a un token on retournera true (!!)  inversement s'il n'y a pas de token return false(!) 
}



export const accountServices = {  //exportation de l'objet accountServices qui va contenir ces trois
    login, saveToken, logout, isLogged, getToken
}