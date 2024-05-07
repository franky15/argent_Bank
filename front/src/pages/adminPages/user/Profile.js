import React,{useEffect,useState} from 'react';

import { useNavigate, useLocation } from 'react-router-dom'; 

import { useSelector, useDispatch } from 'react-redux';

//importation des actions

import { getUser, updateUser } from '../../../features/_slices/userSlice';
import { accountServices } from '../../../_services/Account.services';


const Profile = () => {

    const dispatch = useDispatch();

    const userStore = useSelector((state) => state.user);

    const location = useLocation();
    const url = location;

    console.log('**url', url.pathname);
     //récupération de l'url de la page
     //const url = window.location.href;

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
        dispatch(getUser());

    }, [dispatch]);
   
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
             && regexpName.test(data.firstName) && regexpName.test(data.lastName) 
) {
           
            
            

            //requet de mise à jour de l'utilisateur
            dispatch(updateUser(data));

            //récupération du user dans le store stocker lors du dispatch de l'action getUserThunk
            const userUpdateSuccess = userStore.userUpdateSuccess;
                
            if(userUpdateSuccess){

                //dispatch de l'action getUserThunk qui permet de récupérer l'utilisateur à chaque fois que dispatch est appelé
                dispatch(getUser());

                //reinitialisation des champs car on ne réinitialise pas la page
                setData({
                    firstName: "",//"First Name",
                    lastName: "",//"Last Name",
                });

                setAlerteInput({...alerteInput, alerteInput: false, alerteInputFirstName: false, alerteInputLastName: false});
               
                toggleBlockBtn()
                toggleButtonVisibility()

            }
            
            console.log(data.firstName.length)

        }else{

            console.log('****error')

            if (!regexpName.test(data.firstName)|| data.firstName.trim().length < 3 ) {

                //setAlerteInput({...alerteInput, alerteInputFirstName: true, alerteInput: true});
                fisrtNameElement.style.borderColor = "red";
                alertElement.style.display = 'block';
                
            } 
            /*if ( data.firstName.trim().length < 3 ) {

                //setAlerteInput({...alerteInput, alerteInputFirstName: true, alerteInput: true});
                fisrtNameElement.style.borderColor = "red";
                alertElement.style.display = 'block';
                
            } */
            if ( !regexpName.test(data.lastName) || data.lastName.trim().length < 3 ) {

                //setAlerteInput({...alerteInput, alerteInputLastName: true, alerteInput: true});
                lastNameElement.style.borderColor = "red";
                alertElement.style.display = 'block';
                alertElement.innerHTML = "minimum 3 caractères";
              
            }
            /*if (data.lastName.trim().length < 3 ) {

                //setAlerteInput({...alerteInput, alerteInputFirstName: true, alerteInput: true});
                fisrtNameElement.style.borderColor = "red";
                alertElement.style.display = 'block';
                alertElement.innerHTML = "minimum 3 caractères";
                
            } */
        
        }

    }

    //récupération du token du localstorage stocker lors de la connexion
    const token = accountServices.getToken("token");

    //récupération du user dans le store stocker lors du dispatch de l'action getUserThunk
    const user = userStore.user;

    let userSelect = user;


   
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