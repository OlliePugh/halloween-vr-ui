import { useState } from "react";
import "./App.css";
import MapCreator from "./MapCreator";
import Toolbar from "./Toolbar";

function App() {
    const [currentTool, setCurrentTool] = useState({ trigger: () => {} });
    return (
        <div className="App">
            <Toolbar
                setCurrentTool={setCurrentTool}
                currentTool={currentTool}
            />
            <MapCreator width={2} height={2} currentTool={currentTool} />
        </div>
    );
}

export default App;
