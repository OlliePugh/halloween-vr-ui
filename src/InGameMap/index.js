import { useEffect, useState } from "react";
import MapTile from "../MapTile";
import NonBlockEventsToolbar from "../NonBlockEventsToolbar";
import SOCKET_EVENTS from "../SOCKET_EVENTS";

const CELL_WIDTH = 100;

const InGameMap = ({ mapData, socket }) => {
    const [interactiveTiles, setInteractiveTiles] = useState({});
    const [selectedEvent, setSelectedEvent] = useState();

    /* eslint-disable */
    useEffect(() => {
        const copyInteractiveTiles = { ...interactiveTiles };
        mapData.forEach((col, colNum) => {
            col.forEach((tile, rowNum) => {
                if (tile?.type.interaction) {
                    console.log(tile);
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
    /* eslint-enable */

    const clickCallback = (propKey) => {
        if (selectedEvent) {
            console.log(`CLICKED ${propKey} WITH EVENT ${selectedEvent.key}`);
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
            console.log("emitting");
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
                    width: mapData.length * CELL_WIDTH,
                    margin: "50px",
                    flex: 1,
                    overflow: "scroll"
                }}
            >
                {mapData.map((col, colNum) => {
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
