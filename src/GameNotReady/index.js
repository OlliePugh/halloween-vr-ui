import { CircularProgress } from "@mui/material";

const GameNotReady = () => {
    return (
        <div
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                margin: 0,

                textAlign: "center",
                zIndex: 100
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: "0",
                    right: "0"
                }}
            >
                <CircularProgress size={56} />
            </div>
        </div>
    );
};

export default GameNotReady;
