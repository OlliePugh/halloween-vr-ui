import { useState } from "react";
import "./App.css";
import MapCreator from "./MapCreator";
import Toolbar from "./Toolbar";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
    const [currentTool, setCurrentTool] = useState({
        trigger: (tiles) => tiles
    });
    return (
        <div className="App">
            <Toolbar
                setCurrentTool={setCurrentTool}
                currentTool={currentTool}
            />
            <MapCreator width={25} height={25} currentTool={currentTool} />
        </div>
    );
}

export default App;
