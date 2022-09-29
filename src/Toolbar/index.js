import { useRef, useState } from "react";
import tools from "./tools";
import { placeBlock, getRotatedDimensions, getOccupyingCells } from "./utils";
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
                                ...tool,
                                name: toolName,
                                trigger: (
                                    tiles,
                                    clickedPos,
                                    ignoredExceptions
                                ) => {
                                    try {
                                        return placeBlock(
                                            tiles,
                                            clickedPos,
                                            tool.dimensions,
                                            rotationRef,
                                            {
                                                ...tool,
                                                key: toolName,
                                                name: tool.name || toolName
                                            }
                                        );
                                    } catch (e) {
                                        if (
                                            !ignoredExceptions?.includes(
                                                e.message
                                            )
                                        ) {
                                            alert(ERROR_MESSAGES[e.message]);
                                        }
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
                                console.log(tileToDelete);
                                console.log(clickedPos);
                            }

                            const { rotatedHeight, rotatedWidth } =
                                getRotatedDimensions(tileToDelete.rotation, {
                                    width,
                                    height
                                });

                            const occupyingCells = getOccupyingCells(
                                { col: clickedPos.col, row: clickedPos.row },
                                { rotatedHeight, rotatedWidth }
                            );

                            occupyingCells.forEach(([col, row]) => {
                                newTiles[col][row] = null;
                            });
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
