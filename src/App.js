import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapMaker from "./Pages/MapMaker";
import InGame from "./Pages/InGame";

axios.defaults.baseURL = "http://dev.olliepugh.com:8080/";
axios.defaults.withCredentials = true;

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/in-game" element={<InGame />} />
                    <Route path="*" element={<MapMaker />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
