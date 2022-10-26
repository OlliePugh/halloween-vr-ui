import InGameMap from "../InGameMap";
import { useEffect, useState } from "react";
import axios from "axios";
import GameNotReady from "../GameNotReady";
import SOCKET_EVENTS from "../SOCKET_EVENTS";
import MessagePopup from "../MessagePopup";
import EntityLocation from "../EntityLocation";

const InGame = ({ socketRef, tiles }) => {
    const [isGameReady, setIsGameReady] = useState(false); // TODO MAKE SURE THIS IS SET BACK TO FALSE WHEN YOU LEAVE THIS PAGE
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState({
        title: "",
        content: ""
    });

    const handleClose = () => {
        setModalOpen(false);
        window.location.reload(false); // refresh the page (cheat and easy way to reset all of the state)
    };

    useEffect(() => {
        (async () => {
            try {
                // send the users map
                console.log(tiles);
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

        socketRef.current
            ?.off(SOCKET_EVENTS.END_GAME)
            .on(SOCKET_EVENTS.END_GAME, (message) => {
                console.log("GOT END GAME MESSAGE");
                setModalOpen(true);
                setModalMessage({ title: "Game Over", message: message });
            });
    }, [socketRef]);

    return (
        <>
            {!isGameReady && <GameNotReady />}
            <MessagePopup
                handleClose={handleClose}
                open={modalOpen}
                content={modalMessage}
            />
            <InGameMap
                mapData={tiles}
                socketRef={socketRef}
                isReady={isGameReady}
            >
                <EntityLocation
                    name="Ollie"
                    _key="player"
                    color="teal"
                    socketRef={socketRef}
                />
                <EntityLocation
                    name="Monster"
                    _key="monster"
                    color="orange"
                    socketRef={socketRef}
                />
            </InGameMap>
        </>
    );
};

export default InGame;
