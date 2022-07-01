import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    Radio,
    TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CheckBox, Visibility, VisibilityOff } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const FormDiv = styled.form`
    margin: 20px 0;
    width: 40%;
    height: 80%;
    display: flex;
    flex-direction: column;
    text-align: center;
    /* align-items: center; */
    /* justify-content: space-between; */
    font-family: "Roboto", sans-serif;
    /* background-color: #000; */
`;
const Upper = styled.div``;
const Title = styled.h2`
    font-weight: 500;
    margin: 10px;
    font-size: 1.5rem;
`;

const InputComponent = styled.div`
    width: 100%;
    height: 100%;
    margin: 25px 0;

    background-color: #f9f9fa;
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: space-between;
`;

const InputLine = styled.div`
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-between;
    width: 80%;
    height: 100%;
`;

const Input = styled(TextField)`
    width: 100%;
    margin: 0 0 !important;
    padding: 3px 2px;
`;

const Button = styled.button`
    margin: 20px 0;
    padding: 8px;
    border-radius: 6px;
    outline: none;
    border: none;
    background-color: #efd97b;
    :hover {
        background-color: rgba(239, 217, 123, 0.9);
    }
`;


const Name = ({activeStep,setActiveStep}) => {
   
     const handleSubmit = async (e) => {
        // console.log(e);
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        let formDatas = JSON.parse(localStorage.getItem("formDatas"));
        formDatas.firstName = firstName;
        formDatas.lastName = lastName;
        localStorage.setItem("formDatas", JSON.stringify(formDatas));
       
        setActiveStep(3);
    };
    return (
        <FormDiv onSubmit={handleSubmit}>
            <Upper>
                <Title>
                    Alright, let’s set this up! Tell us a bit about youself.
                </Title>
            </Upper>
            <InputComponent>
                <InputLine>
                    <Input variant="standard" name="firstName"  label="First Name" required/>
                    <Input variant="standard" name="lastName"  label="Last Name" required/>
                </InputLine>
            </InputComponent>
            <Button>Continue</Button>
        </FormDiv>
    );
};

export default Name;
