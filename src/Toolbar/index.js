import { useRef, useState } from "react";
import tools from "./tools";
import { placeBlock, getRotatedDimensions } from "./utils";
import { ERROR_MESSAGES } from "../consts";

const Toolbar = ({ setCurrentTool, currentTool }) => {
    const [rotation, setRotation] = useState(0);
    const rotationRef = useRef();

    rotationRef.current = rotation;

    return (
        <div
            style={{
                display: "inline-block",
                height: "100%",
                width: "100px",
                backgroundColor: "grey"
            }}
        >
            <button
                onClick={() => {
                    setRotation(rotation + Math.PI / 2);
                }}
            >
                Rotate
            </button>

            {Object.keys(tools).map((toolName) => {
                const tool = tools[toolName];
                return (
                    <button
                        key={toolName}
                        onClick={() => {
                            setCurrentTool({
                                name: toolName,
                                trigger: (tiles, clickedPos) => {
                                    try {
                                        return placeBlock(
                                            tiles,
                                            clickedPos,
                                            tool.dimensions,
                                            rotationRef,
                                            { ...tool, key: toolName }
                                        );
                                    } catch (e) {
                                        alert(ERROR_MESSAGES[e.message]);
                                        return tiles;
                                    }
                                }
                            });
                        }}
                        disabled={currentTool.name === toolName}
                    >
                        {tool.name || toolName}
                    </button>
                );
            })}

            <button
                onClick={() => {
                    setCurrentTool({
                        name: "delete",
                        trigger: (tiles, clickedPos) => {
                            const newTiles = [...tiles];
                            const tileToDelete =
                                newTiles[clickedPos.col][clickedPos.row];

                            if (!tileToDelete?.type) {
                                // is there anything on that tile
                                return newTiles;
                            }
                            // loop through and delete each child
                            const { width, height } =
                                tools[tileToDelete.type.key].dimensions;

                            if (tileToDelete?.parent) {
                                // if it has a parent delete from the parents position
                                clickedPos = tileToDelete?.parent;
                            }
                            const { rotatedHeight, rotatedWidth } =
                                getRotatedDimensions(tileToDelete.rotation, {
                                    width,
                                    height
                                });

                            for (
                                let i = clickedPos.col;
                                rotatedWidth > 0
                                    ? i < clickedPos.col + +rotatedWidth
                                    : i > clickedPos.col + +rotatedWidth;
                                rotatedWidth > 0 ? i++ : i--
                            ) {
                                for (
                                    let j = clickedPos.row;
                                    rotatedHeight > 0
                                        ? j < clickedPos.row + rotatedHeight
                                        : j > clickedPos.row + rotatedHeight;
                                    rotatedHeight > 0 ? j++ : j--
                                ) {
                                    newTiles[i][j] = null;
                                }
                            }
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
