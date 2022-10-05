import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapMaker from "./Pages/MapMaker";
import InGame from "./Pages/InGame";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import SOCKET_EVENTS from "./SOCKET_EVENTS";
import DuplicateTab from "./DuplicateTab";

axios.defaults.baseURL = "http://dev.olliepugh.com:8080/";
axios.defaults.withCredentials = true;

const socket = io("http://dev.olliepugh.com:8080", {
    withCredentials: true
});

function App() {
    const [isDuplicatePage, setIsDuplicatePage] = useState(false);

    useEffect(() => {
        (async () => {
            await axios.get("/start-session");

            socket.on(SOCKET_EVENTS.MULTIPLE_SOCKETS, () => {
                setIsDuplicatePage(true);
            });

            socket.on("disconnect", () => {
                alert("Lost connection to server!");
            });

            socket.emit(SOCKET_EVENTS.HANDSHAKE);
        })();
    }, []);

    return (
        <div className="App">
            {isDuplicatePage && (
                <DuplicateTab
                    setAsMain={() => {
                        setIsDuplicatePage(false);
                        socket.emit(SOCKET_EVENTS.SET_PRIMARY);
                    }}
                />
            )}
            <Router>
                <Routes>
                    <Route
                        path="/in-game"
                        element={<InGame socket={socket} />}
                    />
                    <Route path="*" element={<MapMaker />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
