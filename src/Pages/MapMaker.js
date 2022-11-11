import { useState } from "react";
import MapCreator from "../MapCreator";
import Sidebar from "../Sidebar";
import Toolbar from "../Toolbar";

const MapMaker = ({
    nextModule,
    backModule,
    tiles,
    setTiles,
    width,
    height,
    tools
}) => {
    const [currentTool, setCurrentTool] = useState({
        trigger: (tiles) => tiles
    });

    return (
        <div
            style={{
                display: "flex",
                height: "100%"
            }}
        >
            <Sidebar>
                <Toolbar
                    setCurrentTool={setCurrentTool}
                    currentTool={currentTool}
                    tools={tools}
                />
            </Sidebar>
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
                        width={width}
                        height={height}
                        currentTool={currentTool}
                        nextModule={nextModule}
                        backModule={backModule}
                        setTiles={setTiles}
                        tiles={tiles}
                    />
                </div>
            </div>
        </div>
    );
};

export default MapMaker;
