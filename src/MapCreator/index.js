import { useCallback } from "react";
import MapTile from "../MapTile";
import { ERRORS } from "../consts";
import axios from "axios";
import { Button } from "@mui/material";

const CELL_WIDTH = 100;

const MapCreator = ({ width, currentTool, nextModule, tiles, setTiles }) => {
    const modifyCallback = useCallback(
        (row, col, isDrag) => {
            let newTiles = tiles;
            if (isDrag && currentTool.draggable) {
                newTiles = currentTool.trigger(tiles, { row, col }, [
                    ERRORS.OVERLAPPING_BLOCK
                ]); // ignore overlapping block messages
            }

            if (!isDrag) {
                newTiles = currentTool.trigger(tiles, { row, col }, []); // display spot taken messages
            }

            setTiles(newTiles);
        },
        [currentTool, tiles, setTiles]
    );

    return (
        <>
            <Button
                variant="contained"
                onClick={async () => {
                    try {
                        await axios.post("/submit", tiles);
                        nextModule(); // TODO do some checking to make sure everything seems valid
                    } catch (e) {
                        alert(`Something went wrong: ${e.message}`);
                    }
                }}
            >
                Submit
            </Button>
            <div style={{ display: "inline-grid", width: width * CELL_WIDTH }}>
                {tiles.map((col, colNum) => {
                    return col.map((tile, rowNum) => {
                        return (
                            <MapTile
                                modifyCallback={modifyCallback}
                                cellWidth={CELL_WIDTH}
                                data={tile}
                                key={rowNum + "" + colNum}
                                row={rowNum}
                                col={colNum}
                            />
                        );
                    });
                })}
            </div>
        </>
    );
};

export default MapCreator;
