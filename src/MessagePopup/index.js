import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from "@mui/material";

import { forwardRef } from "react";

import { Slide } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MessagePopup = ({ open, handleClose, content: { title, message } }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MessagePopup;
