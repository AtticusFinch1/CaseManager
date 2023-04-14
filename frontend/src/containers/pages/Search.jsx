import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSearchCase, clearSearchCase, updateCase } from '../../redux/slices/cases';
import {useParams} from 'react-router-dom';

const Search = () => {
  const params = useParams();
  const id = params.suitId;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    search: "",
  })
  const {search} = formData;
  const getSearchCases = (search, id) => {
    const config = {
        headers: {
            'Authorization':`JWT ${localStorage.getItem('access')}`,
            "Accept":"application/json",
            "Content-Type":"application/json"
        }
    };
    const body = JSON.stringify({
        search
    });
    try{
        axios.post(`${process.env.REACT_APP_API_URL}api/test-suits/search/${id}`, body, config).then(
            response => {
                if(response.status === 200){
                    setTimeout(()=> {
                        dispatch(setSearchCase(response.data))
                    }, "1000")        
                } else {
                    console.log('Search failed');
                }
            }
        )
    } catch(err){
        console.log(err);
    }
  }
  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    console.log(value);
    if (value !== ""){
        getSearchCases(search, id)
    } else {
        dispatch(clearSearchCase())
        console.log('empty');
    }    
  }
  return (
    <form className="md:order-2">
            <div className="flex items-center mt-2.5 justify-center">
                <div className="flex space-x-1">
                    <input
                        type="search"
                        name="search"
                        onChange={e=>onChange(e)}
                        value={search}
                        required
                        className="block w-96 px-8 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search..."
                    />
                </div>
            </div>
    </form>
  )
}

export default Search