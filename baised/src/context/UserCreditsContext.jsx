import { useAuth } from "@clerk/clerk-react";
import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";

export const UserCreditsContext = createContext();

export const UserCreditsProvider = ({ children }) => {

const [credits,setCredits] = useState(5);
const [loading,setLoading] = useState(false);

const { getToken, isSignedIn } = useAuth();


// fetch user credits from backend
const fetchUserCredits = useCallback(async () => {

try{

if(!isSignedIn) return;

setLoading(true);

const token = await getToken();

const res = await axios.get(
"http://localhost:8080/api/v1.0/users/credits",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setCredits(res.data.credits);

}catch(error){

console.log("Error fetching credits",error);

}finally{

setLoading(false);

}

},[getToken,isSignedIn]);


// auto fetch credits when user logs in
useEffect(()=>{

if(isSignedIn){
fetchUserCredits();
}

},[fetchUserCredits,isSignedIn]);


// function to update credits locally
const updateCredits = useCallback((newCredits)=>{

console.log("Updating credits",newCredits);

setCredits(newCredits);

},[]);


const contextValue = {

credits,
loading,
fetchUserCredits,
updateCredits

};


return(

<UserCreditsContext.Provider value={contextValue}>

{children}

</UserCreditsContext.Provider>

);

};