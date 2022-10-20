import { useEffect, useState } from "react";
import MapTile from "../MapTile";
import NonBlockEventsToolbar from "../NonBlockEventsToolbar";
import SOCKET_EVENTS from "../SOCKET_EVENTS";

const CELL_WIDTH = 100;

const InGameMap = ({ mapData, socket }) => {
    const [selectedEvent, setSelectedEvent] = useState();

    const [interactiveTiles, setInteractiveTiles] = useState({});
    const [runningNonTileBlocks, setRunningNonTileBlocks] = useState({});

    const [renderMapData, setRenderedMapData] = useState(
        JSON.parse(JSON.stringify(mapData))
    );

    /* eslint-disable */
    useEffect(() => {
        const copyInteractiveTiles = { ...interactiveTiles };
        renderMapData.forEach((col, colNum) => {
            col.forEach((tile, rowNum) => {
                if (tile?.type.interaction) {
                    copyInteractiveTiles[`${colNum},${rowNum}`] = {
                        ...tile.type.interaction,
                        lastCalled: 0,
                        triggerable: true
                    };
                }
            });
        });
        setInteractiveTiles(copyInteractiveTiles);
    }, []);

    const addNonTileEvent = (propKey) => {
        if (runningNonTileBlocks[selectedEvent.key]) {
            alert("That event is on a cooldown...");
            return;
        }

        const location = propKey.split(","); // add to the list of rendered tiles
        if (renderMapData[location[0]][location[1]]) {
            alert("That position is occupied!");
            return;
        }

        const copyRunningNonTileBlocks = { ...runningNonTileBlocks }; // add to the list of currently running events
        copyRunningNonTileBlocks[selectedEvent.key] = {
            ...selectedEvent,
            location: propKey
        };

        setRunningNonTileBlocks(copyRunningNonTileBlocks);

        const copyRenderMapData = [...renderMapData];
        copyRenderMapData[location[0]][location[1]] = {
            parent: { col: location[0], row: location[1] },
            type: {
                name: selectedEvent.name || key,
                dimensions: { width: 1, height: 1 }
            },
            rotation: 0
        };

        setRenderedMapData(copyRenderMapData);

        setTimeout(() => {
            // set it back to triggerable in the future
            console.log("RUNNING EVENT CLEANUP");

            // remove from the running events
            const copyRunningNonTileBlocks = { ...runningNonTileBlocks };
            delete copyRunningNonTileBlocks[selectedEvent.key];
            setRunningNonTileBlocks(copyRunningNonTileBlocks);

            // remove from the final render map
            const copyRenderMapData = [...renderMapData];
            copyRenderMapData[location[0]][location[1]] = JSON.parse(
                JSON.stringify(mapData[location[0]][location[1]])
            ); // set back to a copy of whatever it was before
            setRenderedMapData(copyRenderMapData);
        }, selectedEvent.duration * 1000);
    };

    /* eslint-enable */
    const clickCallback = (propKey) => {
        if (selectedEvent) {
            addNonTileEvent(propKey);
            return; // do not try and trigger a tile event
        }
        const interactiveTileCopy = { ...interactiveTiles };
        const tile = interactiveTileCopy[propKey];
        if (!tile) {
            return;
        }

        if (tile.triggerable) {
            tile.triggerable = false;
            tile.lastCalled = Date.now();
            socket.emit(SOCKET_EVENTS.TRIGGER_EVENT, propKey);
            setTimeout(() => {
                // set it back to triggerable in the future
                const newCopy = { ...interactiveTiles };
                interactiveTileCopy[propKey].triggerable = true;
                setInteractiveTiles(newCopy);
            }, tile.frequency * 1000);
        }

        setInteractiveTiles(interactiveTileCopy);
    };

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
                <NonBlockEventsToolbar
                    selectedEvent={selectedEvent}
                    setSelectedEvent={setSelectedEvent}
                />
            </div>
            <div
                style={{
                    display: "inline-grid",
                    width: renderMapData.length * CELL_WIDTH,
                    margin: "50px",
                    flex: 1,
                    overflow: "scroll"
                }}
            >
                {renderMapData.map((col, colNum) => {
                    return col.map((tile, rowNum) => {
                        const interactiveTile =
                            interactiveTiles[`${colNum},${rowNum}`];
                        return (
                            <MapTile
                                modifyCallback={() => {
                                    clickCallback(`${colNum},${rowNum}`);
                                }}
                                cellWidth={CELL_WIDTH}
                                data={tile}
                                key={rowNum + "" + colNum}
                                row={rowNum}
                                col={colNum}
                                colour={!!interactiveTile?.triggerable}
                                style={{
                                    cursor: interactiveTile ? "pointer" : "auto"
                                }}
                            />
                        );
                    });
                })}
            </div>
        </div>
    );
};

export default InGameMap;
