import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {newSuit} from '../../redux/slices/suits';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ModalDelete, ModalInput, ModalTextarea, ModalSubmit } from "./ModalInput";


const StyledButton = styled.button`
        background-color: #AC25D9; 
        border-radius: 5%;
        border: none;
        color: white;
        padding: 10px 32px;
        text-align: center;
        justify-content: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        width: 140px;
        `;

const AddSuit = () => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.persistedReducer.user?.id)

    const add_suit = (user, name, description) => {
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
                name, 
                description,
            });
            try{
                axios.post(`${process.env.REACT_APP_API_URL}api/test-suits/`,body,config).then(
                    response => {
                        if(response.status === 200) {
                            const itemId = response.data.new_suit.id;
                            setLoading(false);
                            dispatch(newSuit({
                                id: itemId,
                                user: user,
                                name: name,
                                description: description
                            }))
                            console.log('success');
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

  const [editData, setEditData] = useState({
    name : '',
    description : ''
  });
  const {
    name, 
    description
  } = editData;

  const onChange = e => setEditData({...editData, [e.target.name] : e.target.value})
  const onSubmit = e => {
    e.preventDefault();
    add_suit(user, name, description); 
    setShowModal(false)
  }
  return (
    <>
      <StyledButton 
          type="button" 
          onClick={() => setShowModal(true)}> 
          Add Suit 
      </StyledButton> 
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-500 rounded-t hover:shadow-lg">
                    <h3 className="text-3xl font=semibold text-gray-600"> Add Test Suit </h3>
                    <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={() => setShowModal(false)}
                    >
                        <span className="text-black p-2 opacity-7 text-xl block bg-gray-200 py-0 rounded-full">
                        x
                        </span>
                    </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                    <form onSubmit={e=>onSubmit(e)}>
                        <ModalInput 
                          label="Suit Title"
                          name="name"
                          value={name}
                          onChange={e=>onChange(e)}
                        />   
                        <ModalTextarea 
                          label="Description"
                          rows={3}
                          name='description'
                          value={description}
                          onChange={e=>onChange(e)}
                        />     
                        <ModalSubmit className="btn p-2 px-6 bg-gray-200 bg-opacity-50 flex float-right text-black shadow-md rounded hover:bg-green-200" type="submit" onClick={() =>onSubmit()} >
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

export default AddSuit