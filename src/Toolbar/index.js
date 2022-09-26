import { useState } from "react";
import tools from "./tools";
import { placeBlock } from "./utils";

const Toolbar = ({ setCurrentTool, currentTool }) => {
    const [rotation, setRotation] = useState(0);

    return (
        <div
            style={{
                display: "inline-block",
                height: "100%",
                width: "100px",
                backgroundColor: "grey"
            }}
        >
            {Object.keys(tools).map((toolName) => {
                const tool = tools[toolName];
                return (
                    <button
                        key={toolName}
                        onClick={() => {
                            setCurrentTool({
                                name: toolName,
                                trigger: (tiles, clickedPos) => {
                                    return placeBlock(
                                        tiles,
                                        clickedPos,
                                        {
                                            width: tool.width || 1,
                                            height: tool.height || 1
                                        },
                                        rotation,
                                        tool.type
                                    );
                                }
                            });
                        }}
                        disabled={currentTool.name === toolName}
                    >
                        {toolName}
                    </button>
                );
            })}

            <button
                onClick={() => {
                    setCurrentTool({
                        name: "delete",
                        trigger: (tiles, clickedPos) => {
                            const newTiles = [...tiles];
                            newTiles[clickedPos.col][clickedPos.row] = null;
                            return newTiles;
                        }
                    });
                }}
                disabled={currentTool.name === "delete"}
            >
                Delete
            </button>
        </div>
    );
};

export default Toolbar;
