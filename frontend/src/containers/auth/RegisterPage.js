import { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerSuccess } from '../../redux/slices/user';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const registered = useSelector((state) => state.user.registered);

     const [formData, setFormData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        re_password:'',
    })

    const {
        first_name,
        last_name,
        email,
        password,
        re_password
    } = formData;

  const onChange = e => setFormData({...formData, [e.target.name] : e.target.value })
  const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify({
            first_name, 
            last_name,
            email, 
            password,
            re_password
        });

        try{
            axios.post(`${process.env.REACT_APP_API_URL}auth/users/`, body, config).then(
                response => {
                    console.log(response.status)
                    if(response.status === 201){
                        setLoading(false);    
                        navigate('/signin')               
                    } else {
                        setLoading(false);
                        console.log("register failed")
                    }
                }
            )
            
        } catch(err){
            console.log("register failed")
        }
    }
    return (
        <>
			<div className="relative flex flex-col justify-center h-screen">
                <div className="lg:flex lg:gap-x-4 justify-center items-center mx-4">
                    <div className="lg:max-w-xl w-full">
                    <img
                        className="w-full h-full object-cover rounded-md"
                        src="https://cdn.pixabay.com/photo/2022/09/07/17/26/vintage-pocket-watch-7439233__340.jpg"
                        alt="sign up with image"
                    />
                    </div>
                    <div className="w-full bg-white rounded-md lg:max-w-xl">
                        <h1 className="text-2xl font-semibold text-center text-gray-700">
                            Create an account
                        </h1>
                        <form onSubmit={e=>onSubmit(e)} className="mt-6">
                            <div className="mb-2">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    name="first_name"
                                    value={first_name}
                                    onChange={e=>onChange(e)}
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    name="last_name"
                                    value={last_name}
                                    onChange={e=>onChange(e)}
                                />
                            </div>
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
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                                    name="re_password"
                                    value={re_password}
                                    onChange={e=>onChange(e)}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mt-6">
                            {
                                loading ?   <div className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600">
                                                ...Loading
                                            </div> : 
                                            <button type="submit" className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:bg-gray-600">
                                                Sign up
                                            </button>
                            }

                            </div>
                        </form>

                        <p className="mt-2 text-xs text-center text-gray-700">
                            {" "}
                            Already a member?{" "}
                            <a href="/signin" className="font-medium text-gray-600 hover:underline">
                            Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
		</>
    )
}

export default RegisterPage;