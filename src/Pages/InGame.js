import { useLocation } from "react-router-dom";
import InGameMap from "../InGameMap";
import { useEffect } from "react";

const InGame = ({ socket }) => {
    const location = useLocation();

    useEffect(() => {
        socket?.on("connect", () => {});

        socket?.on("disconnect", () => {
            alert("Socket disconnected");
        });
    }, [socket]);
    return (
        <>
            <InGameMap mapData={location.state.map} socket={socket} />
        </>
    );
};

export default InGame;
