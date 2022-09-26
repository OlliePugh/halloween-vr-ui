import { useCallback, useState } from "react";
import MapTile from "../MapTile";

const CELL_WIDTH = 100;

const MapCreator = ({ width, height, currentTool }) => {
    const [tiles, setTiles] = useState(
        [...Array(width)].map((_) => Array(height).fill(null))
    );

    const clickCallback = useCallback(
        (row, col) => {
            const newTiles = currentTool.trigger(tiles, { row, col });
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
                                clickCallback={clickCallback}
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
