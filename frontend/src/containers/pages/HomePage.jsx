import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import SingleSuit from "../../components/home/SingleSuit";
import { resetState } from "../../redux/slices/suits";
import Banner from "../../components/home/Banner";
import Layout from "../../components/Layout/Layout";


import '../../styles/index.css';
import image1 from '../../images/banner2.png';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const suits = useSelector(state=>state.suits.suits);
    const [loading, setLoading] = useState(false);
    const [backSuits, setBackSuits] = useState([]);
    const get_suits = () => {
        if(localStorage.getItem('access')){
            const config = {
                headers: {
                    'Authorization':`JWT ${localStorage.getItem('access')}`,
                    'Accept':'application/json'
                }
            };
            try{
                axios.get(`${process.env.REACT_APP_API_URL}api/test-suits`, config).then(
                    response => {
                        if(response.status === 200) {
                            setBackSuits(response.data);
                            setLoading(false);
                        } else {
                            console.log('Suits get fail')
                        }
                    }
                )
            } catch(err){
                console.log('Suits get fail')
            }
        }
    }

    useEffect(()=>{
        get_suits();
    }, [dispatch])
    useEffect(()=>{
        return () => {
            dispatch(resetState());
        }
    }, [dispatch])
    const combinedSuits = suits.length > 0 ? [...backSuits.test_suits,...suits] : backSuits.test_suits    
    return <>
        <Layout>
            <Banner image={image1}/>
            <SingleSuit param={ combinedSuits } />
        </Layout>
    </>
}

export default Home