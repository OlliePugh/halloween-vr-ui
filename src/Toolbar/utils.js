export const placeBlock = (
    tiles,
    { row, col },
    { width, height },
    rotation,
    type
) => {
    const newTiles = [...tiles];

    // check if the space is already occupied
    if (newTiles[col][row]) {
        return tiles;
    }
    newTiles[col][row] = { type };
    return newTiles;
};
