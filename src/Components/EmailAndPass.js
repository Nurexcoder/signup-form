import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    Input,
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
    font-size: 1.9rem;
`;
const Message = styled.h5`
    font-weight: 400;
    font-size: 1.3rem;
    padding: 0;
    margin: 0;
`;
const InputComponent = styled.div`
    width: 100%;
    height: 60%;
    margin: 25px 0;

    background-color: #f9f9fa;
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
`;
const Label = styled.div`
    font-weight: 400;
    margin-top: 20px;
`;
const Bold = styled.span`
    font-weight: 500;
`;
const InputLine = styled.div`
    margin: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
`;

const InputWithIcon = styled(Input)`
    width: 100%;
    margin: 15px 0 !important;
    padding: 3px 2px;
`;

const SubmitButton = styled.button`
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
const EmailVarified = styled(CheckCircleIcon)`
    transform: scale(0.7);
`;
const EmailUnVarified = styled(CheckCircleOutlineIcon)`
    transform: scale(0.7);
`;
const HidePassword = styled(VisibilityOff)`
    transform: scale(0.7);
`;
const ShowPassword = styled(Visibility)`
    transform: scale(0.7);
`;
const IAgree = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const IAgreeMessage = styled.span`
    font-size: 0.7rem;
    font-weight: 400;
`;
const IsOkayContainer = styled.div``;
const IsOkayButton = styled(Button)`
    padding: 10px 5px !important;
    border-radius: 20px !important;
    margin: 2px 2px !important;
    font-size: 0.7rem !important;
    min-width: 100px !important;
`;

const EmailAndPass = ({ activeStep, setActiveStep }) => {
    const [values, setValues] = useState({
        password: "",

        showPassword: false,
    });

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState({
        lowerCase: null,
        upperCase: null,
        number: null,
        specialChar: null,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const validateEmail = (e) => {
        console.log(e.target.value);
        if (
            String(e.target.value)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        ) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    };
    const validatePassword = (e) => {
        // console
        if (String(e.target.value).match(`(?=.*[A-Z])`)) {
            console.log("Hi");
            setIsValidPassword((isValidPassword) => ({
                ...isValidPassword,
                upperCase: true,
            }));
        } else {
            setIsValidPassword((isValidPassword) => ({
                ...isValidPassword,
                ["upperCase"]: false,
            }));
        }
        if (String(e.target.value).match(`(?=.*[a-z])`)) {
            console.log("Hi");
            setIsValidPassword((isValidPassword) => ({
                ...isValidPassword,
                lowerCase: true,
            }));
        } else {
            setIsValidPassword((isValidPassword) => ({
                ...isValidPassword,
                lowerCase: false,
            }));
        }
        if (e.target.value.match(`(?=.*?[0-9])`)) {
            console.log("Hi");
            setIsValidPassword((isValidPassword) => ({
                ...isValidPassword,
                number: true,
            }));
        } else {
            setIsValidPassword((isValidPassword) => ({
                ...isValidPassword,
                number: false,
            }));
        }
        if (String(e.target.value).match(`(?=.*?[#?!@$%^&*-])`)) {
            console.log("Hi");
            setIsValidPassword((isValidPassword) => ({
                ...isValidPassword,
                specialChar: true,
            }));
        } else {
            setIsValidPassword((isValidPassword) => ({
                ...isValidPassword,
                specialChar: false,
            }));
        }
    };

    const handleSubmit = async (e) => {
        // console.log(e);
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.pass.value;
        let formDatas = JSON.parse(localStorage.getItem("formDatas"));
        formDatas.email = email;
        formDatas.pass = pass;
        localStorage.setItem("formDatas", JSON.stringify(formDatas));

        fetch("https://test.paplilabs.com/user/validateEmail/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.user_exist === "True") {
                    alert("Email already exists please use another");
                }
            });
        // navigate('/email')
        setActiveStep(2);
    };
    console.log(isValidPassword);
    return (
        <FormDiv onSubmit={handleSubmit}>
            <Upper>
                <Title>Welcome!</Title>
                <Message>Let’s get you started with a free Account.</Message>
            </Upper>
            <InputComponent>
                <Label>
                    We suggest using the{" "}
                    <Bold> email address that you use at work</Bold>
                </Label>
                <InputLine>
                    {/* <FlagComponent>
                        <Flag src='/india.png' />
                        <DropDown />
                    </FlagComponent> */}

                    <FormControl sx={{ width: "80%" }} variant='standard'>
                        <InputLabel htmlFor='standard-adornment-password'>
                            Email
                        </InputLabel>
                        <InputWithIcon
                            id='standard-adornment-password'
                            onChange={(e) => validateEmail(e)}
                            name='email'
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton aria-label='toggle password visibility'>
                                        {isValidEmail ? (
                                            <EmailVarified color='primary' />
                                        ) : (
                                            <EmailUnVarified />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ width: "80%" }} variant='standard'>
                        <InputLabel htmlFor='standard-adornment-password'>
                            Password
                        </InputLabel>
                        <InputWithIcon
                            id='standard-adornment-password'
                            type={values.showPassword ? "text" : "password"}
                            onChange={validatePassword}
                            name='pass'
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {values.showPassword ? (
                                            <HidePassword />
                                        ) : (
                                            <ShowPassword />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <IsOkayContainer>
                        <IsOkayButton
                            color={
                                isValidPassword.upperCase === false
                                    ? "error"
                                    : "primary"
                            }
                            variant='outlined'>
                            capital letter
                        </IsOkayButton>
                        <IsOkayButton
                            variant='outlined'
                            color={
                                isValidPassword.specialChar === false
                                    ? "error"
                                    : "primary"
                            }>
                            spacial character
                        </IsOkayButton>
                        <IsOkayButton
                            variant='outlined'
                            color={
                                isValidPassword.lowerCase === false
                                    ? "error"
                                    : "primary"
                            }>
                            lowercase letter
                        </IsOkayButton>
                        <IsOkayButton
                            variant='outlined'
                            color={
                                isValidPassword.number === false
                                    ? "error"
                                    : "primary"
                            }>
                            numbers
                        </IsOkayButton>
                    </IsOkayContainer>
                </InputLine>
                <IAgree>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label=''
                    />
                    <IAgreeMessage>
                        it’s okay to send me emails about Novae Avenue
                    </IAgreeMessage>
                </IAgree>
            </InputComponent>
            <SubmitButton>Continue</SubmitButton>
        </FormDiv>
    );
};

export default EmailAndPass;
