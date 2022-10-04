import { useLocation } from "react-router-dom";
import InGameMap from "../InGameMap";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://dev.olliepugh.com:8080", {
    withCredentials: true
});

const InGame = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const location = useLocation();

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });
    }, []);
    return (
        <>
            <InGameMap mapData={location.state.map} socket={socket} />
        </>
    );
};

export default InGame;
