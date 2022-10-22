import { useEffect } from "react";
import SOCKET_EVENTS from "../SOCKET_EVENTS";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import io from "socket.io-client";

const InQueue = ({ socketRef, nextModule, setIsDuplicatePage }) => {
    const [queueData, setQueueData] = useState();

    useEffect(() => {
        if (!socketRef.current) {
            // if socket has not been connected
            socketRef.current = io("http://dev.olliepugh.com:8080", {
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

        socketRef.current.emit(SOCKET_EVENTS.HANDSHAKE); // client initialisation, may be obselete
    }, [socketRef]);

    return (
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
    );
};

export default InQueue;
