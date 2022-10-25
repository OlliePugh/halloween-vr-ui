import MapTile from "../MapTile";
import { CELL_WIDTH } from "../consts";
import { Button, Divider } from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import CompulsoryProgress from "../CompulsoryProgress";
import {
    placeBlock,
    deleteTiles,
    addToShelf,
    removeFromShelf
} from "../Toolbar/utils";

const PlaceCompulsory = ({
    compulsoryTools,
    tiles,
    nextModule,
    backModule,
    setTiles,
    socket
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

    const finishPlacement = useCallback(
        (location) => {
            const copyBlockPlacements = [...blockPlacements];
            copyBlockPlacements.push(location);
            setBlockPlacements(copyBlockPlacements);
            setCurrentIndex(currentIndex + 1);
        },
        [blockPlacements, setBlockPlacements, setCurrentIndex, currentIndex]
    );

    const placeOnEmpty = useCallback(
        ({ row, col }) => {
            let copyTiles = [...tiles];

            const newTiles = placeBlock(
                copyTiles,
                { row, col },
                { width: 1, height: 1 },
                null,
                {
                    ...currentPlacement,
                    key: currentPlacement.key,
                    name: currentPlacement.name || currentPlacement.key
                }
            );
            setTiles(newTiles);
            finishPlacement({ row, col });
        },
        [tiles, setTiles, currentPlacement, finishPlacement]
    );

    const placeOnShelf = useCallback(
        ({ row, col }) => {
            let copyTiles = [...tiles];

            const newTiles = addToShelf(
                copyTiles,
                { row, col },
                {
                    ...currentPlacement,
                    key: currentPlacement.key,
                    name: currentPlacement.name || currentPlacement.key
                }
            );
            setTiles(newTiles);
            finishPlacement({ row, col });
        },
        [tiles, setTiles, currentPlacement, finishPlacement]
    );

    const handleBack = () => {
        const newTiles = cleanUpTile(
            compulsoryPlacements[currentIndex - 1],
            blockPlacements.pop()
        );
        setTiles(newTiles); // remove the last placed tile
        setCurrentIndex(currentIndex - 1); // go back a stage
    };

    const cleanUpTile = (currentTool, { col, row }) => {
        let newTiles = [...tiles];
        const blockAtTile = newTiles[col][row];

        if (blockAtTile.type.key === currentTool.key) {
            newTiles = deleteTiles(compulsoryTools, newTiles, {
                row,
                col
            });
        } else {
            newTiles = removeFromShelf(newTiles, { row, col }, currentTool.key);
            // must be on a shelf
        }

        return newTiles;
    };

    const clearAllPlaced = () => {
        let newTiles = [...tiles];
        blockPlacements.forEach(({ row, col }, index) => {
            const currentPlacement = compulsoryPlacements[index];
            newTiles = cleanUpTile(currentPlacement, { col, row });
        });
        setTiles(newTiles);
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
                        const isShelfPlaceable =
                            tile?.type.hasShelf &&
                            currentPlacement?.shelfPlaced;
                        const canModify =
                            (!tile || isShelfPlaceable) && currentPlacement;

                        const displayName =
                            currentPlacement?.name || currentPlacement?.key;
                        return (
                            <MapTile
                                modifyCallback={() => {
                                    const callback = isShelfPlaceable
                                        ? placeOnShelf
                                        : placeOnEmpty;

                                    canModify &&
                                        callback({
                                            col: colNum,
                                            row: rowNum
                                        });
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
                                    canModify && {
                                        name: isShelfPlaceable
                                            ? `Place ${displayName} on top of ${tile?.type.key}`
                                            : displayName,
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
