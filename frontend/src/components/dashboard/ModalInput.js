import React from 'react';
import styled from 'styled-components';

export const ModalInput = (props) => {
    return (
        <>
            <label className="block text-black text-sm font-bold mb-1">
                {props.label}
            </label>
            <input 
                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                type="text"
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                required
            />
        </>
    );
}

export const ModalTextarea = (props) => {
    return (
        <>
            <label className="block text-black text-sm font-bold mb-1">
                {props.label}
            </label>
            <textarea
                className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                rows={props.rows}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </>
    )
}

export const ModalSelect = (props) => {
    return (
        <>
            <label className="block text-black text-sm font-bold mb-1">
                {props.label}
            </label>
            <select className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                name={props.name} 
                value={props.value} 
                onChange={props.onChange}
            >
                {props.options?.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    )
}

export const ModalSubmit = (props) => {
    return (
    <button
        className={props.className}
        type={props.type}
        onClick={props.onClick}
    >
        {props.children}
    </button>
    )
}

export const ModalDelete = (props) => {
    const StyledButton = styled.button`
        background-color: #C10015; 
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
        `;
    return (
        <StyledButton 
            type="button" 
            onClick={props.onClick}> 
            Delete 
        </StyledButton>   
    )
}