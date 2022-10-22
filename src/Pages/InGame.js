import InGameMap from "../InGameMap";
import { useEffect } from "react";
import axios from "axios";
const InGame = ({ socketRef, tiles }) => {
    useEffect(() => {
        (async () => {
            try {
                // send the users map
                await axios.post("/submit", tiles); // send the map
            } catch (e) {
                // not sending the map is a fatal error meaning this user can not play and will therefore close the socket
                alert(`Something went wrong: ${e.message}`);
                socketRef.current.disconnect();
            }
        })();
    }, [tiles, socketRef]);

    useEffect(() => {
        socketRef.current?.on("connect", () => {});

        socketRef.current?.on("disconnect", () => {
            alert("Socket disconnected");
        });
    }, [socketRef]);

    return (
        <>
            <InGameMap mapData={tiles} socketRef={socketRef} />
        </>
    );
};

export default InGame;
