import React,{useEffect, useState} from 'react';

import { accountServices } from '../_services/Account.services';

import { useSelector, useDispatch } from 'react-redux';
//importation des selectors qui permettent de récupérer les données du store

import { getUser } from '../features/_slices/userSlice';

//importation des images du dossier images
import argent from '../images/argentBankLogo.png';
import { Link, useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'; 

const Header = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userStore = useSelector((state) => state.user.user);

    //récupération de l'url de la page avec useLocation
    //const url = useLocation();
    //console.log('**url1', url1);

    const url = window.location.href;


    useEffect(() => {

        //dispatch de l'action getUserThunk qui permet de récupérer l'utilisateur à chaque fois que dispatch est appelé
        dispatch(getUser);
        
    }, [dispatch]);


    //console.log('**user Login', user);

    let userSelect = userStore;

    //fonction de déconnexion de l'utilisateur
    const signOut = () => {

        accountServices.logout();
       
        localStorage.clear();
        //localStorage.removeItem("userToken")

    }

    return (
     
        <nav className="main-nav">

            <Link className="main-nav-logo" to="/">
                
                <img src={argent} alt="Argent Bank Logo"  className="main-nav-logo-image" />
                
                <h1 className="sr-only">Argent Bank</h1>
            </Link>

           { url.includes("admin") && userSelect  ?
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