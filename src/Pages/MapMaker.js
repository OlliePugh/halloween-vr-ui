import { useState } from "react";
import MapCreator from "../MapCreator";
import Toolbar from "../Toolbar";

const MapMaker = () => {
    const [currentTool, setCurrentTool] = useState({
        trigger: (tiles) => tiles
    });

    return (
        <>
            <Toolbar
                setCurrentTool={setCurrentTool}
                currentTool={currentTool}
            />
            <MapCreator width={25} height={25} currentTool={currentTool} />
        </>
    );
};

export default MapMaker;
