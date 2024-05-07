import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';  

import { login } from '../../features/_slices/authSlice';


const Login = () => {


	const dispatch = useDispatch();

    // const userStore = useSelector((state) => state.auth.user);
    const userStore = useSelector((state) => state.auth);

    //console.log('**userStore', userStore);

    const navigate = useNavigate();

    const [loginAlert, setLoginAlert] = useState(false);

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

            //dispatch(login(loginObject))

            

            dispatch(login(loginObject)).then(() => {

                //récupération de l'id de l'utilisateur du localstorage
                const id = localStorage.getItem("userId");

                //récupération de loginStatus du localstorage
                const loginStatus = localStorage.getItem("loginStatus");

                console.log('**userStore', userStore.loginStatus);

                setLoginAlert(false);

                if(loginStatus === "failed" ){ 

                    console.log('** loginStatus', loginStatus);

                    setLoginAlert(true);
                
                }else{

                    //setLoginAlert(false);

                    navigate(`/admin/profile/${id}`); 
                }

            })

        }
    }

    return (
        <main className="main bg-dark"> {/* Utilisation de className au lieu de class */}
            <section className="sign-in-content"> {/* Utilisation de className au lieu de class */}
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>    
                {   loginAlert && <p className='alertLogin'>Mot de passe ou email incorrect</p>}
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
