import React,{useEffect,useState} from 'react';

import { useNavigate } from 'react-router-dom'; 

import { useSelector, useDispatch } from 'react-redux';

//importation des actions
import { userUpdateSuccess } from '../../../_services/redux/reducers/User.Reducer';

import { userServices } from '../../../_services/User.services';
import { accountServices } from '../../../_services/Account.services';

//importation des selectors qui permettent de récupérer les données du store
import {  getuserSelector } from '../../../_services/redux/selectors/selectors';

//importation de l'action assynchrone (thunk creator) qui permet de gérer les actions asynchrones
import { getUserThunk} from '../../../_services/redux/reducers/User.Reducer';



const Profile = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

     //récupération de l'url de la page
     const url = window.location.href;

    //NB: useSelector est rechargé à chaque fois que le store est mis à jour on ne peut pas non plus le mettre dans useEffect car le dispatch est asynchrone ainsi il y a un décalage entre le moment où le store est mis à jour et le moment où le useSelector est rechargé
  
    
    //state des données de l'utilisateur
    const [data, setData] = useState({
        firstName: "First Name",
        lastName: "Last Name",
    });

    //gestion du state des alertes
    const [alerteInput, setAlerteInput] = useState({

        alerteInput: false,
        alerteInputFirstName: false,
        alerteInputLastName: false
    });

    useEffect(() => {

        //dispatch de l'action getUserThunk qui permet de récupérer l'utilisateur à chaque fois que dispatch est appelé
        dispatch(getUserThunk);

        ///////////////////////////
        

        //fonction de gestion de la redirection de l'utilisateur qui n'est pas connecté quand il veut accéder à la page admin
        const redirect = () => {


            const token = localStorage.getItem('token');

            console.log("****token",token);

            if(  (token === "undefined"  || token === null ) && url.includes("admin") ){

                navigate('/auth/login');

                console.log("***redirect");
            }
            
        }

        //redirect()


        //////////////////////////

    }, [dispatch, url, navigate]);
   
    //fonction de gestion des changements des champs et mise à jour du state
    const change = (e) => {

        setData({ ...data, [e.target.name]: e.target.value });

         //récupération des éléments
         const fisrtNameElement = document.querySelector('.firstName');
         const lastNameElement = document.querySelector('.lastName');
         const alertElement = document.querySelector('.alert');

        if(e.target.name === 'firstName' ){
            
            fisrtNameElement.style.borderColor = "#b8c4ce";


        }
         if(e.target.name === 'lastName'){
        

            lastNameElement.style.borderColor = "#b8c4ce";

        }
       
         if( fisrtNameElement.value.trim()   !== ""  && lastNameElement.value.trim() !== ""){
            
           
            alertElement.style.display = 'none';

        }

    }


    //gestion du state de l'affichage des boutton
    const [isOpen, setIsOpen] = useState({
        editBtn: true,
        blockBtn: false
    });

    

    // Fonction pour basculer l'état du bouton d'édition
   
    // Fonction pour basculer l'état du formulaire d'édition
    const toggleBlockBtn = () => {
        setIsOpen({ ...isOpen, blockBtn: !isOpen.blockBtn });

        //reinitialisation des champs car on ne réinitialise pas la page
        setData({
            firstName: "",//"First Name",
            lastName: "",//"Last Name",
        });
    };

    const [isButtonVisible, setIsButtonVisible] = useState(true);

    const toggleButtonVisibility = () => {
        setIsButtonVisible(!isButtonVisible);
    };

    const submit = () => {

        const regexpName = /^[a-zA-Z]+$/;
        
        //récupération des éléments
        const fisrtNameElement = document.querySelector('.firstName');
        const lastNameElement = document.querySelector('.lastName');
        const alertElement = document.querySelector('.alert');

        if (data && data.firstName.trim() !== "" && data.lastName.trim() !== ""
             && regexpName.test(data.firstName) && regexpName.test(data.lastName) ) {
           
            
            

            //requet de mise à jour de l'utilisateur
            userServices.updateUser(data)
                .then(res => {

                    //console.log('**res.data.body', res.data);

                   dispatch(userUpdateSuccess(res.data.body));

                   //reinitialisation des champs car on ne réinitialise pas la page
                    setData({
                        firstName: "",//"First Name",
                        lastName: "",//"Last Name",
                    });

                    setAlerteInput({...alerteInput, alerteInput: false, alerteInputFirstName: false, alerteInputLastName: false});
                   
                    toggleBlockBtn()
                    toggleButtonVisibility()
                    

                })
                .catch(error => {
                    console.error(error);
                })

        }else{

            if (!regexpName.test(data.firstName) ) {

                //setAlerteInput({...alerteInput, alerteInputFirstName: true, alerteInput: true});
                fisrtNameElement.style.borderColor = "red";
                alertElement.style.display = 'block';
                
            } 
            if ( !regexpName.test(data.lastName)) {

                //setAlerteInput({...alerteInput, alerteInputLastName: true, alerteInput: true});
                lastNameElement.style.borderColor = "red";
                alertElement.style.display = 'block';
              
            }
        
        }

    }

    //récupération du token du localstorage stocker lors de la connexion
    const token = accountServices.getToken("token");

    //récupération du user dans le store stocker lors du dispatch de l'action getUserThunk
    const user = useSelector(getuserSelector);

    let userSelect = null;

    if(user !== null && user !== undefined){

        //gestion de la valeur lorsqu'on modifie les données de l'utilisateur
        let userSelect1 = user;

         // Stockage des données dans le localStorage
         localStorage.setItem('user', JSON.stringify(userSelect1)); 

        //récupération du user dans localstorage et non du store car il faut que la donnée persiste même si on recharge la page
        userSelect = JSON.parse(localStorage.getItem('user'));

    
    }else{

         //récupération du user dans localstorage et non du store car il faut que la donnée persiste même si on recharge la page
         userSelect = JSON.parse(localStorage.getItem('user'));

    }

   
    return (
        <main className="main bg-dark">

            { token && userSelect !== null  && 
            <>
                <div className="header">
                    <h1>Welcome back<br />{  userSelect.firstName + " " + userSelect.lastName}</h1>
                   
                    
                     
                    {
                       isOpen.blockBtn && 
                       <div className='containerInput'>
                            <p className='alert' style={{color: "red", display: "none"}}>Veillez correctement remplir les champs en rouge</p>
                            <div className='formUpdate'>
                                <input  name='firstName' type="text" className="edit-input inputLeft firstName" 

                                    value={data.firstName} placeholder='First Name' onChange={change}
                                />
                               
                                <input name='lastName' type="text" className="edit-input lastName" 
                                    
                                    value={data.lastName} placeholder='Last Name' onChange={change}
                                />
                            </div>
                            
                            <div className='btnEdit'>
                                <button className="edit-button btnleft btnUpdate" onClick={() => { submit()}}>Save</button>
                                <button className="edit-button btnUpdate" onClick={() => {  toggleButtonVisibility(); toggleBlockBtn();}}>Cancel</button>
                            </div>
                            

                       </div>
                    }
                    {
                        isOpen.editBtn &&  <button className="edit-button editbtn"  style={{ display: isButtonVisible ? 'block' : 'none' }}
                        onClick={() => {  toggleButtonVisibility(); toggleBlockBtn();}}>Edit Name</button>
                    
                    }
                  
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account account3">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </>

            }
    </main>

    );
};

export default Profile;