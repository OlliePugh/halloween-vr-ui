import { useLocation } from "react-router-dom";
import InGameMap from "../InGameMap";
import { useState, useEffect } from "react";

const InGame = ({ socket }) => {
    const [isConnected, setIsConnected] = useState(socket?.connected);
    const location = useLocation();

    useEffect(() => {
        socket?.on("connect", () => {
            setIsConnected(true);
        });

        socket?.on("disconnect", () => {
            setIsConnected(false);
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
