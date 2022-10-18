import { useEffect, useRef, useState } from "react";
import { getRotatedDimensions, getOccupyingCells } from "./utils";
import InspectTile from "../InspectTile";
import Category from "./category";

import axios from "axios";

const Toolbar = ({ setCurrentTool, currentTool }) => {
    const [rotation, setRotation] = useState(0);
    const [tools, setTools] = useState();

    const rotationRef = useRef();

    useEffect(() => {
        const getTools = async () => {
            try {
                const tools = (await axios.get("/tools"))?.data;
                const categorisedTools = { misc: {} };

                Object.entries(tools).forEach(([key, tool]) => {
                    const category = tool.interaction
                        ? "interactive"
                        : tool.category || "misc";

                    if (!categorisedTools[category]) {
                        // if this is a new category
                        categorisedTools[category] = {};
                    }

                    categorisedTools[category][key] = tool;
                });
                setTools(categorisedTools);
            } catch (e) {
                console.log(e);
                alert("Could not fetch tools from server!");
            }
        };

        getTools();
    }, []);
    rotationRef.current = rotation;

    const interactiveCategory = tools?.interactive;
    delete tools?.interactive;
    const miscCategory = tools?.misc;
    delete tools?.misc;

    return (
        <>
            <div style={{ height: "200px", borderBottom: "1px solid black" }}>
                <h2>{currentTool?.name}</h2>
                {currentTool?.dimensions && (
                    <InspectTile
                        height={currentTool?.dimensions.height}
                        width={currentTool?.dimensions.width}
                        rotation={rotation}
                    />
                )}
            </div>
            {tools && (
                <>
                    <button
                        onClick={() => {
                            setRotation(rotation + Math.PI / 2);
                        }}
                    >
                        Rotate
                    </button>
                    {interactiveCategory && (
                        <Category
                            category={interactiveCategory}
                            name={"Interactive"}
                            setCurrentTool={setCurrentTool}
                            rotationRef={rotationRef}
                            currentTool={currentTool}
                        />
                    )}
                    {Object.entries(tools).map(
                        ([categoryName, categoryTools]) => {
                            return (
                                <Category
                                    key={categoryName}
                                    category={categoryTools}
                                    name={categoryName}
                                    setCurrentTool={setCurrentTool}
                                    rotationRef={rotationRef}
                                    currentTool={currentTool}
                                />
                            );
                        }
                    )}
                    {miscCategory && (
                        <Category
                            category={miscCategory}
                            name={"Misc"}
                            setCurrentTool={setCurrentTool}
                            rotationRef={rotationRef}
                            currentTool={currentTool}
                        />
                    )}
                    <button
                        onClick={() => {
                            setCurrentTool({
                                name: "delete",
                                trigger: (tiles, clickedPos) => {
                                    const newTiles = [...tiles];
                                    const tileToDelete =
                                        newTiles[clickedPos.col][
                                            clickedPos.row
                                        ];

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
                                        getRotatedDimensions(
                                            tileToDelete.rotation,
                                            {
                                                width,
                                                height
                                            }
                                        );

                                    const occupyingCells = getOccupyingCells(
                                        {
                                            col: clickedPos.col,
                                            row: clickedPos.row
                                        },
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
                </>
            )}
        </>
    );
};

export default Toolbar;
