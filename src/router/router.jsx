import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        element : <RootLayout />,
        children: [
            {
                index: true,
                element : <Home></Home>
            }
        ]
    },
    {
        path:'/',
        element: <AuthLayout></AuthLayout>,
        children:[
            {
                path:'/login',
                element : <Login></Login>
            },
            {
                path:'/register',
                element: <Register></Register>
            }
        ]
    }
])