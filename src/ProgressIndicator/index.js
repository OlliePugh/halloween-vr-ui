import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { CHAIN } from "../consts";

const ProgressIndicator = ({ currentModule }) => {
    return (
        <Box sx={{ width: "30%", margin: "0 auto" }}>
            <Stepper activeStep={currentModule}>
                {CHAIN.map((module, index) => {
                    return (
                        <Step key={module.name}>
                            <StepLabel>{module.description}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
};

export default ProgressIndicator;
