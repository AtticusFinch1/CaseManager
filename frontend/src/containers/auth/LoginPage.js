import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import Alert from '../../components/Layout/Alert';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess, loginFail, getUserSuccess, getUserFail } from '../../redux/slices/user';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const  isAuthenticated  = useSelector((state) => state.user.isAuthenticated);
    const [htmlFormData, sethtmlFormData] = useState({
        email:"",
        password:"",
    });
    const {
        email,
        password
      } = htmlFormData;

    const load_user = () => {
        if(localStorage.getItem('access')){
            const config = {
                headers: {
                    'Authorization':`JWT ${localStorage.getItem('access')}`,
                    'Accept':'application/json'
                }
            };
        try{
            axios.get(`${process.env.REACT_APP_API_URL}auth/users/me/`, config).then(
                response => {
                    if(response.status === 200){
                        dispatch(getUserSuccess(response.data))
                        setLoading(false);                        
                    } else {
                        console.log('load user fail')
                        dispatch(getUserFail())
                    }
                }
            )
            
        } catch(err){
                console.log('user load fail');
            }
        }
    }

    
    const login_user = (email, password) => {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify({
            email, 
            password,
        });

        try{
            axios.post(`${process.env.REACT_APP_API_URL}auth/jwt/create/`, body, config).then(
                response => {
                    if(response.status === 200){
                        dispatch(loginSuccess(response.data))
                        setLoading(false);    
                        navigate('/') 
                        load_user()                               
                    } else {
                        setLoading(false);
                        dispatch(loginFail(response.data))
                        console.log("register failed")
                    }
                }
            )            
        } catch(err){
            console.log("register failed")
        }
    }

    
    useEffect(()=>{
        if(localStorage.getItem('access')){
            (navigate('/'))
        }
    },[isAuthenticated])

    const onChange = e => sethtmlFormData({...htmlFormData, [e.target.name] : e.target.value})
    const onSubmit = e => {
        e.preventDefault();        
        login_user(email, password);   
        const loggedInUser = localStorage.getItem("access");
        if (loggedInUser) {      
        navigate("/")   
        } else {
            setLoading(true)       
            setTimeout(() => {
            setLoading(false);
        }, 2000);
        } 
    };

    return (
        <>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
                <h1 className="text-2xl font-semibold text-center text-gray-700">
                   Sign in
                </h1>
                <form onSubmit={e=>onSubmit(e)} className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={e=>onChange(e)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e=>onChange(e)}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        {
                            loading ? (<Alert className="w-full px-4 py-2 tracking-wide text-black transition-colors duration-200 transhtmlForm bg-red-700 rounded-md " name="Wrong Email or Password"/>) 
                                : 
                            (<button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transhtmlForm bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Login
                            </button>) 
                        }                        
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
		</>
    )
}

export default LoginPage;