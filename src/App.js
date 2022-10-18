import "./App.css";
import axios from "axios";
import MapMaker from "./Pages/MapMaker";
import InGame from "./Pages/InGame";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import SOCKET_EVENTS from "./SOCKET_EVENTS";
import DuplicateTab from "./DuplicateTab";
import {
    MODULES,
    CHAIN,
    MAP_WIDTH as width,
    MAP_HEIGHT as height
} from "./consts";
import ProgressIndicator from "./ProgressIndicator";

axios.defaults.baseURL = "http://dev.olliepugh.com:8080/";
axios.defaults.withCredentials = true;

const socket = io("http://dev.olliepugh.com:8080", {
    withCredentials: true
});

function App() {
    const [isDuplicatePage, setIsDuplicatePage] = useState(false);
    const [currentModule, setCurrentModule] = useState(0);
    const [tiles, setTiles] = useState(
        [...Array(width)].map((_) => Array(height).fill(null))
    );

    const nextModule = () => {
        const newModule = currentModule + 1;
        setCurrentModule(newModule);
    };

    const backModule = () => {
        const newModule = currentModule - 1;
        setCurrentModule(newModule);
    };

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
            <ProgressIndicator currentModule={currentModule} />
            {CHAIN[currentModule] === MODULES.MAP_MAKER ? (
                <MapMaker
                    nextModule={nextModule}
                    backModule={backModule}
                    tiles={tiles}
                    setTiles={setTiles}
                    width={width}
                />
            ) : CHAIN[currentModule] === MODULES.IN_GAME ? (
                <InGame socket={socket} tiles={tiles} />
            ) : (
                <></>
            )}
        </div>
    );
}

export default App;
