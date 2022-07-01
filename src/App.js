import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import Navbar from "./Components/Navbar";
import FormComponent from "./Components/FormComponent";
import Footer from "./Components/Footer";
import { useState } from "react";

const Component = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center;
  justify-content: center; */
    width: 100%;
    height: 100vh;
`;
function App() {
    const [activeStep, setActiveStep] = useState(0);
    return (
        <Component>
            <Navbar activeStep={activeStep} setActiveStep={setActiveStep} />
            <FormComponent
                activeStep={activeStep}
                setActiveStep={setActiveStep}
            />
            <Footer activeStep={activeStep} setActiveStep={setActiveStep} />
        </Component>
    );
}

export default App;
