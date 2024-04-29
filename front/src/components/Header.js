import React,{useEffect, useState} from 'react';

import { accountServices } from '../_services/Account.services';

import { useSelector, useDispatch } from 'react-redux';
//importation des selectors qui permettent de récupérer les données du store
import { getuserSelector } from '../_services/redux/selectors/selectors';

import { getUserThunk } from '../_services/redux/reducers/User.Reducer';
//importation des images du dossier images
import argent from '../images/argentBankLogo.png';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'; 

const Header = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    //récupération de l'url de la page
    const url = window.location.href;

    const token = localStorage.getItem('userToken');

    const [redirectNav, setRedirectNav] = useState(false);

    useEffect(() => {

        //dispatch de l'action getUserThunk qui permet de récupérer l'utilisateur à chaque fois que dispatch est appelé
        dispatch(getUserThunk);

        
        //fonction de gestion de la redirection de l'utilisateur qui n'est pas connecté quand il veut accéder à la page admin
        const redirect = () => {

            if(  (token === "undefined"  || token === null ) && url.includes("admin") ){

                setRedirectNav(true);
            
            }
            
        }

    redirect()
        
    }, [dispatch,url, navigate,token]);

    //redirection vers la page de connexion si l'utilisateur n'est pas connecté 
    if(redirectNav === true){

        navigate('/auth/login');
    }


    //récupération du user dans le store stocker lors du dispatch de l'action getUserThunk
    const user = useSelector(getuserSelector);

    let userSelect = user;
    
    if( (token === "undefined"  || token === null ) && (user!== null && user !== undefined) ){

        //gestion de la valeur lorsqu'on modifie les données de l'utilisateur
        //let userSelect1 = user;

         // Stockage des données dans le localStorage
         //localStorage.setItem('user', JSON.stringify(userSelect1)); 

        //récupération du user dans localstorage et non du store car il faut que la donnée persiste même si on recharge la page
        userSelect = JSON.parse(localStorage.getItem('user'));

    
    }else{
        //récupération du user dans localstorage et non du store car il faut que la donnée persiste même si on recharge la page
        userSelect = JSON.parse(localStorage.getItem('user'));

    }
    

   

    //fonction de déconnexion de l'utilisateur
    const signOut = () => {

        accountServices.logout();
       
        localStorage.clear();
        //localStorage.removeItem("userToken")

    }

   
 


    
    //fonction de gestion de la redirection de l'utilisateur qui n'est pas connecté quand il veut accéder à la page admin
   /* const redirect = () => {


        //const token = localStorage.getItem('userToken');

        console.log("****token",token);

        if(  (token === "undefined"  || token === null ) && url.includes("admin") ){

            console.log("***token",token);

            navigate('/auth/login');

            console.log("***redirect");
        }
        
    }

    redirect()*/
    


    return (
     
        <nav className="main-nav">

            <Link className="main-nav-logo" to="/">
                
                <img src={argent} alt="Argent Bank Logo"  className="main-nav-logo-image" />
                
                <h1 className="sr-only">Argent Bank</h1>
            </Link>

           { url.includes("admin") && (token !== "undefined"  || token !== null) ?
            <div className='containerSignOut'>
                <Link className="main-nav-item" href="./user.html">
                    <i className="fa fa-user-circle"></i>
                    {userSelect && userSelect !== null ? userSelect.firstName : ""}
                </Link>
                <Link className="main-nav-item" to="/" onClick={signOut}>
                    <i className="fa fa-sign-out"></i>
                    Sign out
                </Link>
            </div>
            :
            <div className='containerSignIn'>
                <Link className="main-nav-item" to="/auth/login" >
                <i className="fa fa-user-circle"></i>
                    Sign in
                </Link>
            </div>
            
            }
        </nav>
    
    );
};

export default Header;