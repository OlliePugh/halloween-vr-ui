import { useState } from "react";
import MapCreator from "../MapCreator";
import Toolbar from "../Toolbar";

const MapMaker = () => {
    const [currentTool, setCurrentTool] = useState({
        trigger: (tiles) => tiles
    });

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <div
                style={{
                    display: "inline-block",
                    height: "100%",
                    width: "200px",
                    backgroundColor: "grey"
                }}
            >
                <Toolbar
                    setCurrentTool={setCurrentTool}
                    currentTool={currentTool}
                />
            </div>
            <div
                style={{
                    flex: 1,
                    height: "100%",
                    overflow: "scroll"
                }}
            >
                <div
                    style={{
                        margin: "50px"
                    }}
                >
                    <MapCreator
                        width={25}
                        height={25}
                        currentTool={currentTool}
                    />
                </div>
            </div>
        </div>
    );
};

export default MapMaker;
