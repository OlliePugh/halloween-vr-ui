import "./App.css";
import axios from "axios";
import MapMaker from "./Pages/MapMaker";
import InGame from "./Pages/InGame";
import { useEffect, useState, useRef } from "react";
import SOCKET_EVENTS from "./SOCKET_EVENTS";
import DuplicateTab from "./DuplicateTab";
import {
    MODULES,
    CHAIN,
    MAP_WIDTH as width,
    MAP_HEIGHT as height
} from "./consts";
import ProgressIndicator from "./ProgressIndicator";
import PlaceCompulsory from "./Pages/PlaceCompulsory";
import InQueue from "./Pages/InQueue";

axios.defaults.baseURL = "http://dev.olliepugh.com:8080/";
axios.defaults.withCredentials = true;

function App() {
    const [isDuplicatePage, setIsDuplicatePage] = useState(false);
    const [currentModule, setCurrentModule] = useState(0);
    const [tiles, setTiles] = useState(
        [...Array(width)].map((_) => Array(height).fill(null))
    );
    const [tools, setTools] = useState();
    const [compulsoryTools, setCompulsoryTools] = useState();

    const socketRef = useRef();

    const nextModule = () => {
        const newModule = currentModule + 1;
        setCurrentModule(newModule);
    };

    const backModule = () => {
        const newModule = currentModule - 1;
        setCurrentModule(newModule);
    };

    const fetchTools = async () => {
        try {
            const tools = (await axios.get("/tools"))?.data;
            const newCompulsoryTools = { ...tools };
            Object.entries(newCompulsoryTools).forEach(([key, tool]) => {
                if (tool?.category === "compulsory") {
                    delete tools[key];
                } else {
                    delete newCompulsoryTools[key];
                }
            });
            setTools(tools);
            setCompulsoryTools(newCompulsoryTools);
        } catch (e) {
            console.log(e);
            alert("Could not fetch tools from server!");
        }
    };

    useEffect(() => {
        (async () => {
            await axios.get("/start-session");
            await fetchTools();
        })();
    }, []);

    return (
        <div className="App">
            {isDuplicatePage && (
                <DuplicateTab
                    setAsMain={() => {
                        setIsDuplicatePage(false);
                        socketRef.current.emit(SOCKET_EVENTS.SET_PRIMARY);
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
                    tools={tools}
                    setTools={setTools}
                />
            ) : CHAIN[currentModule] === MODULES.IN_GAME ? (
                <InGame socketRef={socketRef} tiles={tiles} />
            ) : CHAIN[currentModule] === MODULES.IN_QUEUE ? (
                <InQueue
                    socketRef={socketRef}
                    nextModule={nextModule}
                    setIsDuplicatePage={setIsDuplicatePage}
                />
            ) : CHAIN[currentModule] === MODULES.PLACE_REQUIRED ? (
                <PlaceCompulsory
                    tiles={tiles}
                    compulsoryTools={compulsoryTools}
                    nextModule={nextModule}
                    backModule={backModule}
                    setTiles={setTiles}
                    socketRef={socketRef}
                />
            ) : (
                <></>
            )}
        </div>
    );
}

export default App;
