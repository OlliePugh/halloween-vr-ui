import MapTile from "../MapTile";
import { CELL_WIDTH } from "../consts";
import { Button, Divider } from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import CompulsoryProgress from "../CompulsoryProgress";
import { placeBlock, deleteTiles } from "../Toolbar/utils";

const PlaceCompulsory = ({
    compulsoryTools,
    tiles,
    nextModule,
    backModule,
    setTiles
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [blockPlacements, setBlockPlacements] = useState([]);
    const compulsoryPlacements = useMemo(() => {
        const toReturn = [];
        for (const [key, value] of Object.entries(compulsoryTools)) {
            toReturn.push({ ...value, key });
        }
        return toReturn;
    }, [compulsoryTools]);

    const currentPlacement = compulsoryPlacements[currentIndex];

    const modifyCallback = useCallback(
        (stringCoords) => {
            let copyTiles = [...tiles];
            const coords = stringCoords.split(",");
            const location = {
                row: parseInt(coords[1]),
                col: parseInt(coords[0])
            };

            const newTiles = placeBlock(
                copyTiles,
                location,
                { width: 1, height: 1 },
                null,
                {
                    ...currentPlacement,
                    key: currentPlacement.key,
                    name: currentPlacement.name || currentPlacement.key
                }
            );
            setTiles(newTiles);
        },
        [tiles, setTiles, currentPlacement]
    );

    const handleBack = () => {
        setTiles(deleteTiles(compulsoryTools, tiles, blockPlacements.pop())); // remove the last placed tile
        setCurrentIndex(currentIndex - 1); // go back a stage
    };

    const clickCallback = (location) => {
        modifyCallback(location);
        const copyBlockPlacements = [...blockPlacements];
        const splitLocation = location.split(",");
        const coords = { col: splitLocation[0], row: splitLocation[1] };
        copyBlockPlacements.push(coords);
        setBlockPlacements(copyBlockPlacements);
        setCurrentIndex(currentIndex + 1);
    };

    const clearAllPlaced = () => {
        blockPlacements.forEach((coords) => {
            deleteTiles(compulsoryTools, tiles, coords);
        });
        setBlockPlacements([]);
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
                <div style={{ marginLeft: "10px" }}>
                    <CompulsoryProgress
                        handleBack={handleBack}
                        compulsoryPlacements={compulsoryPlacements}
                        currentIndex={currentIndex}
                    />
                </div>
                <Divider style={{ marginBottom: "20px" }} />
                <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                >
                    <Button
                        variant="contained"
                        onClick={() => {
                            clearAllPlaced();
                            backModule();
                        }}
                    >
                        Back to Map Creator
                    </Button>
                    <Button
                        variant="contained"
                        onClick={nextModule}
                        disabled={currentIndex !== compulsoryPlacements.length}
                    >
                        Submit
                    </Button>
                </div>
            </div>
            <div
                style={{
                    display: "inline-grid",
                    width: tiles.length * CELL_WIDTH,
                    margin: "50px",
                    flex: 1,
                    overflow: "scroll"
                }}
            >
                {tiles.map((col, colNum) => {
                    return col.map((tile, rowNum) => {
                        return (
                            <MapTile
                                modifyCallback={() => {
                                    !tile &&
                                        currentPlacement &&
                                        clickCallback(`${colNum},${rowNum}`);
                                }}
                                cellWidth={CELL_WIDTH}
                                data={tile}
                                key={rowNum + "" + colNum}
                                row={rowNum}
                                col={colNum}
                                colour={Object.keys(compulsoryTools).includes(
                                    tile?.type.key
                                )}
                                hoverData={
                                    !tile &&
                                    currentPlacement && {
                                        name:
                                            currentPlacement?.name ||
                                            currentPlacement?.key,
                                        style: { backgroundColor: "teal" }
                                    }
                                }
                            />
                        );
                    });
                })}
            </div>
        </div>
    );
};

export default PlaceCompulsory;
