import InGameMap from "../InGameMap";
import { useEffect, useState } from "react";
import axios from "axios";
import GameNotReady from "../GameNotReady";
import SOCKET_EVENTS from "../SOCKET_EVENTS";
const InGame = ({ socketRef, tiles }) => {
    const [isGameReady, setIsGameReady] = useState(false); // TODO MAKE SURE THIS IS SET BACK TO FALSE WHEN YOU LEAVE THIS PAGE

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

        socketRef.current
            ?.off(SOCKET_EVENTS.GAME_READY)
            .on(SOCKET_EVENTS.GAME_READY, () => {
                setIsGameReady(true);
            });
    }, [socketRef]);

    return (
        <>
            {!isGameReady && <GameNotReady />}
            <InGameMap
                mapData={tiles}
                socketRef={socketRef}
                isReady={isGameReady}
            />
        </>
    );
};

export default InGame;
