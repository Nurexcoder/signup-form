import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    Alert,
    Autocomplete,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    Radio,
    Snackbar,
    TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CheckBox, Visibility, VisibilityOff } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useGeolocated } from "react-geolocated";
import MobileDetect from "mobile-detect";
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
    align-items: center;
    justify-content: space-between;
    width: 80%;
    height: 100%;
`;

const Input = styled(TextField)`
    width: 100%;
    margin: 10 0 !important;
    padding: 3px 2px;
`;

const Button = styled.button`
    margin: 10px 0;
    padding: 8px;
    border-radius: 6px;
    outline: none;
    border: none;
    background-color: #efd97b;
    :hover {
        background-color: rgba(239, 217, 123, 0.9);
    }
`;

const Location = ({ activeStep, setActiveStep }) => {
    const [countries, setCountries] = useState([]);
    const [currentCountry, setCurrentCountry] = useState([]);
    const [states, setStates] = useState([]);
    const [currentState, setCurrentState] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });
    console.log(coords);
    useEffect(() => {
        // setActiveStep(0);
        const getCountries = async () => {
            fetch(
                "https://test.paplilabs.com/login_api/country/?limit=230&offset=0"
            )
                .then((res) => res.json())
                .then((res) => {
                    console.log(res.count);
                    const countriesData = [];
                    res.results.map((country) => {
                        countriesData.push({
                            label: country.name,
                            value: country.code,
                        });
                    });
                    setCountries(countriesData);
                });
        };
        getCountries();
    }, []);
    const getStates = (code) => {
        fetch(`https://test.paplilabs.com/login_api/state/${code}/`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                const stateDatas = [];

                res.map((state) => {
                    stateDatas.push({
                        label: state.region,
                        value: state.region,
                    });
                });
                setStates(stateDatas);
                console.log(stateDatas);
            });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem("formDatas"));
        const data = {
            email: userData.email,
            password: userData.pass,
            profile: {
                first_name: userData.firstName,
                last_name: userData.lastName,
                phone_number: userData.number,
                user_type: "G",
                country: currentCountry.label,
                state: currentState.label,
                pin_code: e.target.pincode.value,
                cordinate_X: coords.latitude,
                cordinate_Y: coords.longitude,
            },
            device: {
                platform: "ANR",
                dev_id: "fOJF2n04Q62MHy2i9rAGLs:APA91bHBUYJVPMk8_eKOSm15xcN6Istx4WenBTB1g_fFZ4qnC50VSTds4-a0R3ThGnqBlqTtDcsqdXCydxLGT-PJowMZ8Me3O1-NtzCNKiYmwJrEYliWsPv_RpG-ExcZpycKW9xUlXAB",
            },
        };
        fetch("https://test.paplilabs.com/login_api/signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.status === 400) {
                    Swal.fire("Already exist", "User already exist", "warning");
                } else {
                    Swal.fire(
                        "Account Created",
                        "Account successfully created",
                        "success"
                    );
                }
                return res.json();
            })

            .catch((err) => {
                console.log("Hi");
                Swal.fire("Went wrong", "Something went wrong", "error");
            });

        console.log(data);
    };
    return (
        <FormDiv onSubmit={handleSubmit}>
            <Upper>
                <Title>
                    Allow us, to get your location so <br /> we can set up map
                    for you.
                </Title>
            </Upper>
            <InputComponent>
                <InputLine>
                    <Autocomplete
                        id='disable-close-on-select'
                        options={countries}
                        style={{ width: "100%" }}
                        onChange={(e, val) => {
                            setCurrentCountry(val);
                            getStates(val.value);
                        }}
                        // inputValue={currentCountry}
                        renderInput={(params) => (
                            <Input
                                {...params}
                                label='Country'
                                variant='standard'
                                name='country'
                                onChange={(e) => console.log(e.target.value)}
                            />
                        )}
                    />
                    <Autocomplete
                        id='disable-close-on-select'
                        options={states}
                        style={{ width: "100%" }}
                        onChange={(e, val) => {
                            setCurrentState(val);
                            console.log(val);
                        }}
                        renderInput={(params) => (
                            <Input
                                {...params}
                                label='State'
                                variant='standard'
                                name='state'
                            />
                        )}
                    />
                    <Input variant='standard' name='pincode' label='Pin Code' />
                </InputLine>
            </InputComponent>
            <Button>Continue</Button>
        </FormDiv>
    );
};

export default Location;
