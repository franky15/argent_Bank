import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux';  //useSelector,

//importation des actions
import { loginSuccess, logoutSuccess, loginFailure  } from '../../_services/redux/reducers/Account.Reducer';

import {jwtDecode } from 'jwt-decode'; // Correction de l'import de jwtDecode

import { accountServices } from '../../_services/Account.services';

const Login = () => {

	const dispatch = useDispatch();

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const change = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

	//console.log('**login', login)

    const submit = (e) => {

        e.preventDefault(); // Prévenir le comportement par défaut du formulaire

        if (login.email.trim() && login.password.trim()) { // Correction de la condition de vérification du formulaire
           
			accountServices.login(login)
                .then(res => {

					//console.log('**res.data', res.data);
					//console.log('**res.data.body.', res.data.body.token);

                     //stockage du token dans le localstorage
                    accountServices.saveToken(res.data.body.token);
					//récupération du token
                    const token = accountServices.getToken("token");
					
                    if (token) {

                        try {
							
                            const decodedToken = jwtDecode(token);
                            const userId = decodedToken.id;
                            const expireToken = decodedToken.exp;
                            const timeInSecond = Math.floor(Date.now() / 1000);

							//console.log('**decodedToken', decodedToken);
							//console.log('**userId', userId);
							
                            if (userId && expireToken > timeInSecond) { // Correction de la condition de vérification du token
                             
								
								//console.log(('***userId', userId));
							
								dispatch(loginSuccess(userId));
                                
							
								navigate(`/admin/profile/${userId}`);

                            } else {

								//déconnexion de l'utilisateur entrainant la suppression du token du localstorage
                                accountServices.logout();

								//dispatch de l'action logoutSuccess entrainant la mise à jour du stateglobal
								dispatch(logoutSuccess());

                                navigate("/");
                            }

                        } catch (error) {

                            console.error('Erreur lors du décodage du token :', error);
							
							//déconnexion de l'utilisateur entrainant la suppression du token du localstorage
							accountServices.logout();

							//dispatch de l'action logoutSuccess entrainant la mise à jour du stateglobal
							dispatch(logoutSuccess());
                            navigate("/");
                        }

                    }
                })
                .catch(error => {
                    console.error(error);
                })

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
