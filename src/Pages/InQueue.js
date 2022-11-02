import { useEffect } from "react";
import SOCKET_EVENTS from "../SOCKET_EVENTS";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import io from "socket.io-client";
import { INVALID_MAP_MESSAGES, ORCH_URL } from "../consts";
import MessagePopup from "../MessagePopup";

const InQueue = ({
    socketRef,
    backModule,
    nextModule,
    setIsDuplicatePage,
    tiles,
    setValidatedMapToken
}) => {
    const [queueData, setQueueData] = useState();
    const [validationErrorMessage, setValidationErrorMessage] = useState();

    useEffect(() => {
        if (!socketRef.current) {
            // if socket has not been connected
            socketRef.current = io(ORCH_URL, {
                withCredentials: true
            });

            socketRef.current.onAny((m) => {
                console.log(m);
            });

            socketRef.current.on(SOCKET_EVENTS.MULTIPLE_SOCKETS, () => {
                // TODO can this be replaced with when joining the queue will disconnect the socket currently in the queue?
                setIsDuplicatePage(true);
            });

            socketRef.current.on("disconnect", () => {
                alert("Lost connection to server!");
            });
        }

        socketRef.current
            .off(SOCKET_EVENTS.QUEUE_POSITION_UPDATE) // cheaty way to stop duplicate event handlers (react tings)
            .on(
                SOCKET_EVENTS.QUEUE_POSITION_UPDATE,
                ({ position, queueSize }) => {
                    setQueueData({ position, queueSize });
                }
            );

        socketRef.current
            .off(SOCKET_EVENTS.GAME_STARTING)
            .on(SOCKET_EVENTS.GAME_STARTING, () => {
                console.log("lets gooo");
                nextModule();
            });

        socketRef.current
            .off(SOCKET_EVENTS.HANDSHAKE_COMPLETE)
            .on(SOCKET_EVENTS.HANDSHAKE_COMPLETE, () => {
                // once handshake is complete the map needs validatin g
                socketRef.current.emit(SOCKET_EVENTS.VALIDATE_MAP, tiles);
            });

        socketRef.current
            .off(SOCKET_EVENTS.MAP_VALIDITY)
            .on(SOCKET_EVENTS.MAP_VALIDITY, ({ result, message, body }) => {
                // once handshake is complete the map needs validatin g
                if (result) {
                    setValidatedMapToken(body);
                    socketRef.current.emit(SOCKET_EVENTS.JOIN_QUEUE);
                } else {
                    setValidationErrorMessage(message);
                    console.log("message", message); // TODO HANDLE THIS
                }
            });

        socketRef.current.emit(SOCKET_EVENTS.HANDSHAKE); // client initialisation, may be obselete
    }, [socketRef]);

    return (
        <>
            <MessagePopup
                open={!!validationErrorMessage}
                handleClose={backModule}
                content={{
                    title: "Invalid Map",
                    message: INVALID_MAP_MESSAGES[validationErrorMessage]
                }}
            />
            <div
                style={{
                    margin: 0,
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: "0",
                    right: "0"
                }}
            >
                {queueData ? (
                    <h1 style={{ textAlign: "center" }}>
                        You are in position {queueData.position} out of{" "}
                        {queueData.queueSize} in the queue
                    </h1>
                ) : (
                    <div
                        style={{
                            textAlign: "center"
                        }}
                    >
                        <CircularProgress />
                    </div>
                )}
            </div>
        </>
    );
};

export default InQueue;
