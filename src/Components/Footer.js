import { Button } from "@mui/material";
import React from "react";
import { Component, Lower, Upper } from "./FooterStyle";

const Footer = ({ activeStep, setActiveStep }) => {
    return (
        <Component>
            {!activeStep ? (
                <Upper>
                    By conitnuing you’re agreeing to out customers terms of
                    service, privacy policy and cookie policy.
                </Upper>
            ) : (
                <></>
            )}

            <Lower>
                <span>Contact Us</span>
                <span>Like Us</span>
            </Lower>
        </Component>
    );
};

export default Footer;
