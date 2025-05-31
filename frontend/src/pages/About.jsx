import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../util/Auth.slice.js'
import toast from 'react-hot-toast'
import { axiosInstance } from "../util/axios.js"

const About = () => {

 

    const authUser=useSelector((Store)=>Store.Auth.authUser)
  return (
    
    <div className="flex flex-col items-center justify-center h-screen">
        
  
  <h1 className='font-bold'> Hi {authUser.name}</h1>
  <h3>You are in About page</h3>
</div>

  )
}

export default About
