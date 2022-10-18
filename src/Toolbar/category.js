import Tool from "./tool";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Category = ({
    name,
    category,
    setCurrentTool,
    currentTool,
    rotationRef
}) => {
    const toolComponents = [];

    Object.entries(category).forEach(([toolName, tool]) => {
        toolComponents.push(
            <Tool
                key={toolName}
                toolName={toolName}
                tool={tool}
                setCurrentTool={setCurrentTool}
                disabled={currentTool.name === toolName}
                rotationRef={rotationRef}
            />
        );
    });
    return (
        <>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {name}
                </AccordionSummary>
                <AccordionDetails>{toolComponents}</AccordionDetails>
            </Accordion>
        </>
    );
};

export default Category;
