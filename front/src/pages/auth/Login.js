import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';  


import {jwtDecode } from 'jwt-decode'; // Correction de l'import de jwtDecode

import { accountServices } from '../../_services/Account.services';

import { login } from '../../features/_slices/authSlice';


const Login = () => {

	const dispatch = useDispatch();

    const userStore = useSelector((state) => state.auth.user);

    console.log('**userStore', userStore);

    const navigate = useNavigate();

    const [loginObject, setLoginObject] = useState({
        email: "",
        password: "",
    });

    const change = (e) => {
        setLoginObject({ ...loginObject, [e.target.name]: e.target.value });
    }

	//console.log('**loginObject', loginObject)

    const submit = (e) => {

        e.preventDefault(); // Prévenir le comportement par défaut du formulaire

        if (loginObject.email.trim() && loginObject.password.trim()) { // Correction de la condition de vérification du formulaire

            dispatch(login(loginObject))

            console.log('**userStore.userId', userStore);

            
            dispatch(login(loginObject)).then(() => {

                //récupération de l'id de l'utilisateur du localstorage
                const id = localStorage.getItem("userId");

                console.log('**id', id);

                navigate(`/admin/profile/${id}`); 

            });

        
        }
    }

    return (
        <main className="main bg-dark"> {/* Utilisation de className au lieu de class */}
            <section className="sign-in-content"> {/* Utilisation de className au lieu de class */}
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper"> {/* Utilisation de className au lieu de class */}
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name='email' onChange={change} />
                    </div>
                    <div className="input-wrapper"> {/* Utilisation de className au lieu de class */}
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name='password' onChange={change} />
                    </div>
                    <div className="input-remember"> {/* Utilisation de className au lieu de class */}
                        <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" onClick={submit}>Sign In</button> {/* Utilisation de className au lieu de class */}
                </form>
            </section>
        </main>
    );
};

export default Login;
