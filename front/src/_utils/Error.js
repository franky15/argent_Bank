import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Error = () => {

    const navigate = useNavigate();
    
    const userStore = useSelector((state) => state.auth);

    console.log('**userStore loginStatus dans Error', userStore.loginError);

    return (
        <div className='Error'>
            <p className='titleError'>page 404</p>
            <button  className='btnError' onClick={() => navigate('/auth/login')}>Retour à la page de connexion</button>
        </div>
    );
};

export default Error;