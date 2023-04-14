import { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import SingleSuitDetail from '../../components/home/SingleSuitDetail';
import AddCase from "../../components/dashboard/AddCase";
import { getCases } from "../../redux/slices/cases";

import Layout from "../../components/Layout/Layout";


const SuitDetail = () => {
    const dispatch = useDispatch();
    const [backCases, setBackCases] = useState([]);
    const params = useParams();
    const suitId = params.suitId;
    const cases = useSelector(state => state.cases.cases)
    const searchCases = useSelector(state => state.cases.searchCase?.search_cases)
    const total_pages = useSelector(state => state.cases.totalPages)
    const current_page = useSelector(state => state.cases.currentPage)
    
    console.log(searchCases)
    useEffect(() => {
        async function fetchData(){
            getCases(suitId, dispatch, 1);
        }
        fetchData();
    },[])
    const showCases = searchCases?.length > 0 ? searchCases : cases
    return (
        <>
            <Layout> 
                <div className="text-right">
                    <AddCase />
                    
                    <SingleSuitDetail param={showCases}/>    
                    { total_pages > 1 ? 
                        <ul className="inline-flex -space-x-px">
                            <button className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" disabled={current_page===1} onClick={() => getCases(suitId, dispatch, current_page-1)}>Previous</button>
                            <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{current_page}/{total_pages}</button>
                            <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" disabled={current_page===total_pages} onClick={() => getCases(suitId, dispatch, current_page+1)}>Next</button>
                        </ul> : null
                    }   
                </div>         
            </Layout>
        </>
    )
}

export default SuitDetail;