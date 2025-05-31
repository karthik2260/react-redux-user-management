import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './Auth.slice.js'
import AdminReducer from './Admin.js'
const Appstore = configureStore({
    
    
  reducer:{
    Auth:AuthReducer,
    Admin:AdminReducer,
   },
  
})
 


export default Appstore