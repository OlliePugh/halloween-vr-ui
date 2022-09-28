import { useCallback, useState } from "react";
import MapTile from "../MapTile";
import { ERRORS } from "../consts";

const CELL_WIDTH = 100;

const MapCreator = ({ width, height, currentTool }) => {
    const [tiles, setTiles] = useState(
        [...Array(width)].map((_) => Array(height).fill(null))
    );

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
                    console.log(JSON.stringify(tiles));
                }}
            >
                Export to JSON
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
