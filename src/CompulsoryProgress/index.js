import {
    Button,
    Stepper,
    StepLabel,
    Step,
    StepContent,
    Box
} from "@mui/material";

const CompulsoryProgress = ({
    currentIndex,
    compulsoryPlacements,
    handleBack
}) => {
    return (
        <>
            <Stepper activeStep={currentIndex} orientation="vertical">
                {compulsoryPlacements.map((step, index) => (
                    <Step key={step.key}>
                        <StepLabel>{step.name || step.key}</StepLabel>
                        <StepContent>
                            {step?.description}
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    {index !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                            variant="contained"
                                        >
                                            Back
                                        </Button>
                                    )}
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {currentIndex === compulsoryPlacements.length && (
                <Button
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    variant="contained"
                >
                    Back
                </Button>
            )}
        </>
    );
};

export default CompulsoryProgress;
