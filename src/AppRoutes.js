import React from 'react';
import Public from "./components/Public";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from './components/Register';
import Todoo from './Todoo';

const AppRoutes = [
    {
        element: <Home />
    },
    {
        path: '/public',
        element: <Public />
    },
 
    {
        index: true,

        // path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/todo',
        element: <Todoo></Todoo>
    }
];

export default AppRoutes;
