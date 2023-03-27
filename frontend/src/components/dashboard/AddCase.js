import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { newCase } from "../../redux/slices/cases";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ModalDelete, ModalInput, ModalTextarea, ModalSubmit, ModalSelect } from "./ModalInput";

const options = [
        { label: 'Not Processed', value: 'not_processed' },
        { label: 'Pass', value: 'passes' },
        { label: 'Fail', value: 'fail' },
        { label: 'Fixed', value: 'fixed' },
        { label: 'Not Issue', value: 'not_bug' },
    ];

    
const AddCase = () => {

    const params = useParams();
    const test_suit = params.suitId;
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.persistedReducer.user.id)

    const add_case = (user, title, description, steps, expected, actual, comments, test_suit, status) => {
        if(localStorage.getItem('access')){
            const config = {
                headers: {
                    'Authorization':`JWT ${localStorage.getItem('access')}`,
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                }
            };
            const body = JSON.stringify({
                user,
                title, 
                description,
                steps, 
                expected,
                actual,
                comments,
                test_suit,  
                status
            });
            try{
                axios.post(`${process.env.REACT_APP_API_URL}api/test-cases/`,body,config).then(
                    response => {
                        if(response.status === 200) {
                            const itemId = response.data.new_case.id;
                            console.log('itemId', itemId);
                            setLoading(false);
                            dispatch(newCase({
                                id: itemId,
                                user: user,
                                title: title,
                                description: description,
                                steps: steps,
                                expected: expected,
                                actual: actual,
                                comments: comments,
                                test_suit: test_suit,
                                status: status,
                            }))
                            console.log(itemId);
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

  const [formData, setformData] = useState({
    title : '',
    description : '',
    steps: '', 
    expected: '',
    actual:'',
    comments:'',
    stats: '',
  });
  const {
    title, 
    description,
    steps,
    expected,
    actual,
    comments,
    stats,
  } = formData;

  const onChange = e => setformData({...formData, [e.target.name] : e.target.value})
  const onSubmit = e => {
    e.preventDefault();
    add_case(user, title, description, steps, expected, actual, comments, test_suit, stats ); 
    setShowModal(false)
  }
  return (
    <>
      <button className="p-3 px-4 bg-gray-400 hover:bg-green-200 rounded-lg mr-4 text-white hover:text-black" 
          type="button" 
          onClick={() => setShowModal(true)}> 
          Add Case
      </button> 
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-5">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-500 rounded-t hover:shadow-lg">
                        <h3 className="text-3xl font=semibold text-gray-600"> Add Test Case </h3>
                        <button
                            className="bg-transparent border-0 text-black float-left"
                            onClick={() => setShowModal(false)}
                        >
                            <span className="text-black p-2 opacity-7 text-xl block bg-gray-200 py-0 rounded-full">
                            x
                            </span>
                        </button>
                    </div>
                    <div classtitle="relative p-6 flex-auto">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <ModalInput 
                            label="Case Title"
                            name="title"
                            value={title}
                            onChange={e=>onChange(e)}
                            />   
                            <ModalTextarea 
                            label="Description"
                            rows={3}
                            name='description'
                            value={description}
                            onChange={e=>onChange(e)}
                            />    
                            <ModalTextarea 
                            label="Reproduction steps"
                            rows={3}
                            name='steps'
                            value={steps}
                            onChange={e=>onChange(e)}
                            />
                            <ModalTextarea 
                            label="Expected Results"
                            rows={3}
                            name='expected'
                            value={expected}
                            onChange={e=>onChange(e)}
                            />
                            <ModalTextarea 
                            label="Actual Results"
                            rows={3}
                            name='actual'
                            value={actual}
                            onChange={e=>onChange(e)}
                            />
                            <ModalTextarea 
                            label="Comments"
                            rows={3}
                            name='comments'
                            value={comments}
                            onChange={e=>onChange(e)}
                            />
                            <ModalSelect label="Status" name="stats" value={stats} onChange={e=>onChange(e)} options={options}/>

                     
                            <ModalSubmit className="btn p-2 px-6 bg-gray-200 bg-opacity-50 flex float-right text-black shadow-md rounded hover:bg-green-200" type="submit" onClick={(e) =>onSubmit(e)} >
                            Submit
                            </ModalSubmit>
                        </form>
                   </div>                  
                </div>
              </div>
            </div>
        </>
      ) : null}
    </>
  );
};

export default AddCase