import { IconButton } from "@mui/material";
import {
    KeyboardDoubleArrowLeft,
    KeyboardDoubleArrowRight
} from "@mui/icons-material";
import { useState } from "react";

const Sidebar = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true);
    return (
        <>
            <IconButton
                style={{
                    position: "absolute",
                    left: isVisible ? 190 : 0,
                    zIndex: 100
                }} // hard coded to be inside the width the toolbar
                color="inherit"
                onClick={() => setIsVisible(!isVisible)}
            >
                {isVisible ? (
                    <KeyboardDoubleArrowLeft />
                ) : (
                    <KeyboardDoubleArrowRight />
                )}
            </IconButton>
            <div
                style={{
                    display: isVisible ? "inline-block" : "none",
                    height: "100%",
                    width: "200px",
                    borderRight: "1px solid black",
                    backgroundColor: "grey",
                    overflowY: "auto",
                    overflowX: "hidden"
                }}
            >
                {children}
            </div>
        </>
    );
};

export default Sidebar;
