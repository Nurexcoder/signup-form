import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Swal from "sweetalert2";

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
    height: 50%;
    margin: 30px 0;

    background-color: #f9f9fa;
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
`;
const Label = styled.div`
    font-weight: 400;
    margin: 10px 0;
`;
const Bold = styled.span`
    font-weight: 700;
`;
const InputLine = styled.div`
    margin: 30px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 80%;
`;
const FlagComponent = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
`;
const Flag = styled.img`
    width: 35px;
    height: auto;
`;
const DropDown = styled(KeyboardArrowDownIcon)`
    font-weight: 100;
`;
const Number = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 3;
    margin-left: 20px;
`;
const Code = styled.input`
    margin-right: 5px;
    font-size: 1rem;
    width: 10%;
    height: 32px;
    border: ${(props) =>
        props.currentCountry
            ? "0.001px solid rgba(0, 0, 0, 0.05)"
            : "0.001px solid red"};
    outline: none;
    background-color: transparent;
    color: black;
    font-weight: 600;
    padding: 0;
`;
const Input = styled(TextField)`
    width: 80%;
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

const NumberComponent = ({ activeStep, setActiveStep }) => {
    const [countries, setCountries] = useState([]);

    const [currentCountry, setCurrentCountry] = useState({});
    const [countryCode, setCountryCode] = useState(91);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        // console.log(e);
        e.preventDefault();
        const number = e.target.number.value;
        let isExist = false;
        if (!currentCountry) {
            Swal.fire("Invalid Code", "Invalid country code", "error");
            return;
        }
        if (number.length !== 10) {
            alert("Please enter a valid 10 digit number");
            return;
        }
        localStorage.setItem(
            "formDatas",
            JSON.stringify({
                number: "+91" + number,
            })
        );
        fetch("https://test.paplilabs.com/login_api/validatePhNum/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone_number: "+91" + number }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.user_exist === "True") {
                    Swal.fire(
                        "Already exist",
                        "Number already exist",
                        "warning"
                    );
                    isExist = true;
                } else {
                    setActiveStep(1);
                }
            });
        // navigate('/email')
    };
    useEffect(() => {
        // setActiveStep(0);
        const getCountries = async () => {
            fetch(
                "https://test.paplilabs.com/login_api/callingCode/?limit=249&offset=0"
            )
                .then((res) => res.json())
                .then((res) => {
                    console.log(res.count);
                    setCountries(res.results);
                    const selectedCountry = res.results.filter(
                        (country) => country.calling_code === 91
                    );
                    setCurrentCountry(...selectedCountry);
                    setCountryCode(91)
                });
        };
        getCountries();
    }, []);

    console.log(currentCountry);
    const handleChange = (e) => {
        setCountryCode(e.target.value.split('+')[1]||'');
        const selectedCountry = countries.filter(
            (country) => country.calling_code == e.target.value.split('+')[1]
        );

        setCurrentCountry(...selectedCountry);
    };
    return (
        <FormDiv onSubmit={(e) => handleSubmit(e)}>
            <Upper>
                <Title>Welcome!</Title>
                <Message>Let’s get you started with a free Account.</Message>
            </Upper>
            <InputComponent>
                <Label>
                    Lets get started by entering your <Bold>phone number</Bold>
                </Label>
                <InputLine>
                    <FlagComponent>
                        <Flag
                            src={
                                (currentCountry && currentCountry.flag) ||
                                "/india.png"
                            }
                        />
                        <DropDown />
                    </FlagComponent>
                    <Number>
                        <Code
                            defaultValue='+91'
                            currentCountry={currentCountry}
                            value={'+'+countryCode}
                            onChange={(e) => handleChange(e)}
                        />
                        <Input
                            variant='standard'
                            placeholder='9854601xxx'
                            type='number'
                            name='number'
                        />
                    </Number>
                </InputLine>
            </InputComponent>
            <Button>Continue</Button>
        </FormDiv>
    );
};

export default NumberComponent;
