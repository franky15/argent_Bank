
import Axios from "./Caller.services";

let getUser = () =>{
    return Axios.post("/api/v1/user/profile")  //routes du back
}




let updateUser = (userObject) => {
    return Axios.put("/api/v1/user/profile",  userObject)  //on envoie user 
}

/*
let getUser = (id) =>{
    return Axios.get("/users/" +id)  //routes du back
}

let deleteUser = (id) => {
    return Axios.delete("/users/" +id)  //on envoie user 
}

let addUser = (userObject) => {
    return Axios.post("/users/signum", userObject)  //on envoie user 
}
*/
export const userServices = {
    getUser, updateUser
}