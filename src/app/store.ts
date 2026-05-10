import { configureStore } from '@reduxjs/toolkit';
import heroReducer from '../store/heroSlice';
import servicesReducer from '../store/servicesSlice';
import projectsReducer from '../store/projectsSlice';
import aboutReducer from '../store/aboutSlice';
import contactReducer from '../store/contactSlice';
import authReducer from '../store/authSlice';
import adminReducer from '../store/adminSlice';
import companyInfoReducer from '../store/companyInfoSlice';
import postReducer from '../store/postSlice';

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    services: servicesReducer,
    projects: projectsReducer,
    about: aboutReducer,
    contact: contactReducer,
    auth: authReducer,
    admin: adminReducer,
    companyInfo: companyInfoReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
