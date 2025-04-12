import { createContext, useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode' 
const loginContext = createContext();


const AuthProvider = ({children}) => {
    const [loginUser, setLoginUser] = useState(false)
  
   async function getAuth(){
        const token = JSON.parse(localStorage.getItem("AccessToken"))
        if(!token) return setLoginUser(false)
        try{
         const decoded = jwtDecode(token)
         setLoginUser(decoded)
        }
        catch(err){
            console.log(err);
            localStorage.removeItem("AccessToken")
            setLoginUser(false)
        }
    }
    
    function setToken(token){
        localStorage.setItem("AccessToken", JSON.stringify(token))
    }

     useEffect(() =>{
      getAuth()
     },[setLoginUser])
    

  return (
    <loginContext.Provider value={{getAuth, setToken, loginUser, setLoginUser}}>
        {children}
    </loginContext.Provider>
  );
};

export default AuthProvider
export { loginContext }