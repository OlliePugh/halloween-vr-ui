const Table = () => {
    return (
        <div
            style={{ backgroundColor: "green", width: "100%", height: "100%" }}
        ></div>
    );
};

export const TableTool = (tiles, { row, col }) => {
    const newTiles = [...tiles];
    newTiles[col][row].type = Table;
    return newTiles;
};

export default Table;
