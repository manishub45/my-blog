import {configureStore} from '@reduxjs/toolkit';
import authSlice from "./authSlice"


const store = configureStore({
    reducers:{
     auth : authSlice
    }
})