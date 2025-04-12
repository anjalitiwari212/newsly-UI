import axios from '../api/axios'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { loginContext } from '../context/AuthProvider'
import Swal from 'sweetalert2';

const Signup = () => {
  const {register,handleSubmit,reset} = useForm()
  const {setToken, getAuth, setLoginUser} = useContext(loginContext)
  const navigate = useNavigate()

  async function getSignup(data){
    try{
     const res = await axios.post('/users/signup', data)
       if(res.status === 201) {
           setToken(res.data.token)
           getAuth()  
           reset()
           navigate("/")

           Swal.fire({
             title: 'Success!',
             text: 'SignUp  successful.',
             icon: 'success',
             confirmButtonText: 'OK'
           })
         }
    }
    catch(err){
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: `${err.response.data}`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(getSignup)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              {...register('name')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
       
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-800 text-white font-semibold rounded-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <NavLink to="/login" className="text-green-700 hover:underline">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
