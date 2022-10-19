import InGameMap from "../InGameMap";
import { useEffect } from "react";

const InGame = ({ socket, tiles }) => {
    useEffect(() => {
        socket?.on("connect", () => {});

        socket?.on("disconnect", () => {
            alert("Socket disconnected");
        });
    }, [socket]);

    return (
        <>
            <InGameMap mapData={tiles} socket={socket} />
        </>
    );
};

export default InGame;
