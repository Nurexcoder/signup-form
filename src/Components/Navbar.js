import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import StepperComponent from "./Stepper";
// import Stepper from './Stepper';

const Component = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 10px;
    background-color: #f9f9fa;
    height: 10vh;
`;
const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Logo = styled.img`
    width: 120px;
    height: 35px;
`;

const Navbar = ({ activeStep, setActiveStep }) => {
    return (
        <Component>
            <LogoContainer>
                {activeStep ? (
                    <Button
                        onClick={() => {
                            setActiveStep(activeStep - 1);
                        }}>
                        <ArrowBack />
                    </Button>
                ) : (
                    <></>
                )}
                <Logo src='/logo.png' />
            </LogoContainer>
            <StepperComponent activeStep={activeStep} />
        </Component>
    );
};

export default Navbar;
