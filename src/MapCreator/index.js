import { useCallback, useState } from "react";
import MapTile from "../MapTile";
import { ERRORS } from "../consts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CELL_WIDTH = 100;

const MapCreator = ({ width, height, currentTool }) => {
    const [tiles, setTiles] = useState(
        [...Array(width)].map((_) => Array(height).fill(null))
    );
    const navigate = useNavigate();

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
        [currentTool, tiles]
    );

    return (
        <>
            <button
                onClick={() => {
                    axios.post("/submit", tiles);
                    navigate("/in-game", {
                        // TODO make this happen only when you are at the front of the queue
                        state: {
                            map: tiles
                        }
                    });
                }}
            >
                Submit
            </button>
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
