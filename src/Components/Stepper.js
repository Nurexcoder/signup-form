import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const steps = ["Phone Number", "Email", "Name", "Location"];
const Common = styled.span`
    font-size: 0.8rem;
`;
const Label = styled.div`
    font-size: 1.2rem;
`;
const Circle = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color:${props=>props.active?'black':'transparent'} ;
    border:1px solid ${props=>props.active?'black':'rgba(0,0,0,0.5)'};
    color:${props=>props.active?'white':'rbga(0,0,0,0.9)'} ;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
`;

export default function StepperComponent({activeStep}) {
   
    return (
        <Box sx={{ width: "40%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    return (
                        <Step
                            style={{ backgroundColor: "black !important" }}
                            color='standard'
                            key={label}>
                            {index === activeStep ? (
                                <StepLabel icon={<Circle active={1}>{index + 1}</Circle>}>
                                    <Common>user</Common>
                                    <Label>{label}</Label>
                                </StepLabel>
                            ) : (
                                <StepLabel
                                    icon={
                                        <Circle active={0}>{index + 1}</Circle>
                                    }></StepLabel>
                            )}
                        </Step>
                    );
                })}
            </Stepper>
         
        </Box>
    );
}
