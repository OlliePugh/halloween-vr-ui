import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapMaker from "./Pages/MapMaker";
import InGame from "./Pages/InGame";
import io from "socket.io-client";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://dev.olliepugh.com:8080/";
axios.defaults.withCredentials = true;

function App() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        (async () => {
            await axios.get("/start-session");
            const newSocket = io("http://dev.olliepugh.com:8080", {
                withCredentials: true
            });
            setSocket(newSocket);
        })();
    }, []);

    return (
        <div className="App">
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
