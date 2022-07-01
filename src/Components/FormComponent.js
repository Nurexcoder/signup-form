import { ArrowDropDown } from "@mui/icons-material";

import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import EmailAndPass from "./EmailAndPass";
import Location from "./Location";
import Name from "./Name";
import NumberComponent from "./Number";

const Component = styled.div`
    display: flex;
    /* flex-direction: row; */
    /* align-items: center; */
    justify-content: center;
    width: 100%;
    height: 100%;
`;
const FormComponent = ({ activeStep, setActiveStep }) => {
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <NumberComponent
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                    />
                );
            case 1:
                return (
                    <EmailAndPass
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                    />
                );
            case 2:
                return (
                    <Name
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                    />
                );
            case 3:
                return (
                    <Location
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                    />
                );
            default:
                return "Unknown step";
        }
    };
    return (
        <Component>
            {/* <Routes> */}
            {/* {/* <Route
                    path='/number'
                    element={
                        <NumberComponent
                            activeStep={activeStep}
                            setActiveStep={setActiveStep}
                        />
                    }
                />
                <Route
                    path='/email'
                    element={
                        <EmailAndPass
                            activeStep={activeStep}
                            setActiveStep={setActiveStep}
                        />
                    }
                />
                <Route
                    path='/name'
                    element={
                        <Name
                            activeStep={activeStep}
                            setActiveStep={setActiveStep}
                        />
                    }
                />
                <Route
                    path='/location'
                    element={
                        <Location
                            activeStep={activeStep}
                            setActiveStep={setActiveStep}
                        />
                    }
                /> */}
            {/* </Routes> } */}
            {getStepContent(activeStep)}
        </Component>
    );
};

export default FormComponent;
