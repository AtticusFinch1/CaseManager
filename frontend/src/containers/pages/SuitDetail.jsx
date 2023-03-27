import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import SingleSuitDetail from '../../components/home/SingleSuitDetail';
import AddCase from "../../components/dashboard/AddCase";

import Layout from "../../components/Layout/Layout";

const SuitDetail = () => {
    const [backCases, setBackCases] = useState([]);
    const params = useParams();
    const suitId = params.suitId;
    const cases = useSelector(state => state.cases.cases)
    const get_cases = (suitId) => {
        const config = {
            headers: {
                'Accept':'application/json',
                'Authorization':`JWT ${localStorage.getItem('access')}`,
                'Content-Type':'application/json',
            }
        };
        try {
            axios.get(`${process.env.REACT_APP_API_URL}api/test-suits/${suitId}`, config).then(
                response => {
                    if(response.status === 200){
                        setBackCases(response.data.test_suit_cases)
                    } else {
                        console.log('Case get fail')
                    }
                }
            )
        } catch(err){
            console.log('case get fail')
        }
    };
    useEffect(()=>{
        get_cases(suitId);       
    }, [suitId])
    const combinedCases = cases.length > 0 ? [...backCases, ...cases] : backCases
    return (
        <>
            <Layout> 
                <div className="text-right">
                    <AddCase />
                    <SingleSuitDetail param={combinedCases}/>       
                </div>         
            </Layout>
        </>
    )
}

export default SuitDetail;