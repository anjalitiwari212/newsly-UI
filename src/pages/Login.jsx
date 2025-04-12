import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from '../api/axios'
import { loginContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {

  const {setToken, getAuth, setLoginUser} = useContext(loginContext)
  const {register,handleSubmit,reset}  = useForm()
  const navigate = useNavigate()

  async function getLogin(data){
    try{
     const res =  await axios.post('/users/login', data)
     if(res.status === 200) {
      setToken(res.data.token)
      getAuth() 
      reset() 
      navigate("/")

      Swal.fire({
        title: 'Success!',
        text: 'loggedIn  successful.',
        icon: 'success',
        confirmButtonText: 'OK'
      })

    }
    }catch(err){
      console.log(err)
      reset()
       Swal.fire({
        title: 'Login Failed!',
        text: 'Invalid username or password.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
      setLoginUser(false)
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit(getLogin)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-900 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
            {...register("password")}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-900 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-700 text-white font-semibold rounded-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-900"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <NavLink to="/signup" className="text-green-800 hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
