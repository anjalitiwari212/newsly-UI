import React, { useContext, useEffect } from 'react'
import { loginContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Protected = ({children}) => {

 const navigate = useNavigate()

 const { loginUser } = useContext(loginContext); // Assuming loginUser is stored in context
 useEffect(() => {
    if(!loginUser){
        navigate("/")
    }
},[loginUser])

  return (
    <>
    {children}
    </>
  )
}

export default Protected
