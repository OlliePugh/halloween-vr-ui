import { useCallback } from "react";
import MapTile from "../MapTile";
import { ERRORS } from "../consts";
import { Button } from "@mui/material";
import { CELL_WIDTH } from "../consts";

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

    const downloadMap = () => {
        // create file in browser
        const json = JSON.stringify(tiles, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);
        // create "a" HTLM element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = "map.json";
        document.body.appendChild(link);
        link.click();
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    const uploadMap = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            try {
                setTiles(JSON.parse(e.target.result));
            } catch (e) {
                alert("Couldnt load map file!");
            }
        };
    };

    return (
        <>
            <Button variant="contained" onClick={downloadMap}>
                Save Map
            </Button>
            <Button variant="contained" component="label" onChange={uploadMap}>
                Load Map
                <input type="file" hidden />
            </Button>
            <Button
                style={{ float: "right" }}
                variant="contained"
                onClick={nextModule}
            >
                Next
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
