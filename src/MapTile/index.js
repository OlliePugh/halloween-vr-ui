const MapTile = ({ data, row, col, clickCallback, cellWidth }) => {
    const BlockType = data?.type || (() => {});

    return (
        <div
            onClick={() => {
                clickCallback(row, col);
            }}
            style={{
                width: `${cellWidth}px`,
                height: `${cellWidth}px`,
                border: "1px solid black",
                gridArea: `${row + 1} / ${col + 1} / ${row + 2} / ${col + 2}`
            }}
        >
            <BlockType />
        </div>
    );
};

export default MapTile;
