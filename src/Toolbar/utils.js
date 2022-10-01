import { ERRORS } from "../consts";

export const placeBlock = (
    tiles,
    { row, col },
    { width, height },
    rotationRef,
    type
) => {
    const rotation = rotationRef.current;
    const { rotatedWidth, rotatedHeight } = getRotatedDimensions(rotation, {
        width,
        height
    });

    const newTiles = [...tiles];

    const amount = getAmountOfTile(newTiles, type);

    if (amount >= type.max) {
        // cannot add anymore as already too many
        throw Error(ERRORS.MAX_BLOCK_REACHED);
    }

    const occupyingCells = getOccupyingCells(
        { col, row },
        { rotatedWidth, rotatedHeight }
    );

    occupyingCells.forEach(([col, row]) => {
        if (
            col >= newTiles.length ||
            col < 0 ||
            row < 0 ||
            row >= newTiles[col].length ||
            newTiles[col][row]?.type
        ) {
            // if the block has a type
            throw Error(ERRORS.OVERLAPPING_BLOCK);
        }
    });

    // check if the space is already occupied

    occupyingCells.forEach(([placeCol, placeRow]) => {
        newTiles[placeCol][placeRow] = {
            type,
            parent: { col, row },
            rotation
        };
    });

    return newTiles;
};

const getAmountOfTile = (tiles, type) => {
    let counter = 0;
    tiles.forEach((columns) => {
        columns.forEach((cell) => {
            if (cell?.type?.key === type.key) {
                counter++;
            }
        });
    });

    return counter;
};

export const getRotatedDimensions = (rotation, { width, height }) => {
    const rotationMatrix = [
        [Math.round(Math.cos(rotation)), Math.round(Math.sin(rotation))],
        [-Math.round(Math.sin(rotation)), Math.round(Math.cos(rotation))]
    ];

    const rotatedDimensions = {
        rotatedWidth:
            rotationMatrix[0][0] * width + rotationMatrix[0][1] * height,
        rotatedHeight:
            rotationMatrix[1][0] * width + rotationMatrix[1][1] * height
    };

    return rotatedDimensions;
};

export const getOccupyingCells = (
    { col, row },
    { rotatedWidth, rotatedHeight }
) => {
    const cells = [];
    for (let i = col; i !== col + rotatedWidth; rotatedWidth > 0 ? i++ : i--) {
        // modify the array (when done in loop a pointer is midified somewhere and funky behaviour occurs)
        for (
            let j = row;
            j !== row + rotatedHeight;
            rotatedHeight > 0 ? j++ : j--
        ) {
            cells.push([i, j]);
        }
    }

    return cells;
};
