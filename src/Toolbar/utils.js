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
        return newTiles;
    }

    for (let i = col; i < col + Math.abs(rotatedWidth); i++) {
        for (let j = row; j < row + Math.abs(rotatedHeight); j++) {
            // check all required slots are free and valid
            if (
                i >= newTiles.length ||
                j >= newTiles[i].length ||
                newTiles[i][j]?.type
            ) {
                // if the block has a type
                return tiles;
            }
        }
    }

    // check if the space is already occupied
    for (let i = col; i < col + Math.abs(rotatedWidth); i++) {
        // modify the array (when done in loop a pointer is midified somewhere and funky behaviour occurs)
        for (let j = row; j < row + Math.abs(rotatedHeight); j++) {
            newTiles[i][j] = { type, parent: { col, row }, rotation };
        }
    }
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
