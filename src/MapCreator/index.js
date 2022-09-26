import { useCallback, useEffect, useState } from "react";
import MapTile from "../MapTile";

const CELL_WIDTH = 100;

export default ({ width, height }) => {
    const [tiles, setTiles] = useState(
        [...Array(width)].map((e) => Array(height).fill(null))
    );

    const changeTile = useCallback(
        (row, col, data) => {
            const newTiles = [...tiles];
            newTiles[col][row] = data;
            setTiles(newTiles);
        },
        [tiles]
    );

    const moveTile = (row, col, dropPos) => {
        const dropX = Math.abs(Math.round(col + dropPos.x / CELL_WIDTH));
        const dropY = Math.abs(Math.round(row + dropPos.y / CELL_WIDTH));
        if (
            (dropX == col && dropY == row) ||
            dropX > tiles.length - 1 ||
            dropY > tiles[dropX].length - 1
        ) {
            return;
        }

        const newTiles = [...tiles];
        newTiles[dropX][dropY] = { ...newTiles[col][row] };
        newTiles[col][row] = null;
        setTiles(newTiles);
    };

    useEffect(() => {
        changeTile(0, 1, { backgroundColor: "red" });
    }, []);

    return (
        <div style={{ display: "grid", width: width * CELL_WIDTH }}>
            {tiles.map((col, colNum) => {
                return col.map((tile, rowNum) => {
                    return (
                        <MapTile
                            cellWidth={CELL_WIDTH}
                            data={tile}
                            key={rowNum + "" + colNum}
                            row={rowNum}
                            col={colNum}
                            moveTileCallback={moveTile}
                        />
                    );
                });
            })}
        </div>
    );
};
