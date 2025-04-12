import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import CreateNews from '../pages/CreateNews'
import NewsDetail from '../pages/NewsDetail';
import CategoryNews from '../pages/CategoryNews'
import CategoryPage from '../pages/CategoryPage';
import Protected from '../hooks/Protected';
const MainRoute = () => {
  return (
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/profile' element={ <Protected><Profile/></Protected>}/>
     <Route path='/news/categories/:category' element={<CategoryNews/>}/>
     <Route path='/news/create' element={<Protected><CreateNews/></Protected>}/>
     <Route path='/news/:id' element={<NewsDetail/>}/>
     <Route path='/categories' element={<Protected><CategoryPage/></Protected>}/>
    </Routes>
  )
}

export default MainRoute