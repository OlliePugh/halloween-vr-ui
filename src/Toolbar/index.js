import { useRef, useState, useMemo } from "react";
import { deleteTiles } from "./utils";
import InspectTile from "../InspectTile";
import Category from "./category";
import { Button, Divider } from "@mui/material";

const Toolbar = ({ setCurrentTool, currentTool, tools }) => {
    const [rotation, setRotation] = useState(0);

    const categorisedTools = useMemo(() => {
        if (tools) {
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

            return categorisedTools;
        }
    }, [tools]);

    const rotationRef = useRef();

    const copyTools = { ...categorisedTools };

    // want these to be at certain positions in the list therefore take out of the general list of tools
    const interactiveCategory = copyTools?.interactive;
    delete copyTools?.interactive;
    const miscCategory = copyTools?.misc;
    delete copyTools?.misc;

    rotationRef.current = rotation;

    return (
        <>
            <div style={{ height: "200px" }}>
                <h2>{currentTool?.name}</h2>
                {currentTool?.dimensions && (
                    <InspectTile
                        height={currentTool?.dimensions.height}
                        width={currentTool?.dimensions.width}
                        rotation={rotation}
                    />
                )}
            </div>
            <Divider> Tools </Divider>
            {tools && (
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            margin: "1rem 0"
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => {
                                setRotation(rotation + Math.PI / 2);
                            }}
                        >
                            {" "}
                            Rotate
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setCurrentTool({
                                    name: "delete",
                                    trigger: (tiles, clickedPos) => {
                                        return deleteTiles(
                                            tools,
                                            tiles,
                                            clickedPos
                                        );
                                    }
                                });
                            }}
                            disabled={currentTool.name === "delete"}
                        >
                            Delete
                        </Button>
                    </div>
                    <Divider style={{ marginBottom: "1rem" }}>
                        {" "}
                        Placeables{" "}
                    </Divider>
                    {interactiveCategory && (
                        <Category
                            category={interactiveCategory}
                            name={"Interactive"}
                            setCurrentTool={setCurrentTool}
                            rotationRef={rotationRef}
                            currentTool={currentTool}
                        />
                    )}
                    {Object.entries(copyTools).map(
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
                </>
            )}
        </>
    );
};

export default Toolbar;
