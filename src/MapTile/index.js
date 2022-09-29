const MapTile = ({ data, row, col, modifyCallback, cellWidth }) => {
    const tileStyle = {
        textColour: "black",
        colour: "white",
        ...data?.type.tileStyle
    };

    if (data) {
        console.log(tileStyle);
    }

    return (
        <div
            onClick={() => {
                modifyCallback(row, col, false);
            }}
            onDragOver={() => {
                modifyCallback(row, col, true);
            }}
            style={{
                width: `${cellWidth}px`,
                height: `${cellWidth}px`,
                border: "1px solid black",
                gridArea: `${row + 1} / ${col + 1} / ${row + 2} / ${col + 2}`,
                backgroundColor: tileStyle.colour
            }}
        >
            <p style={{ color: tileStyle.textColour }}>{data?.type.name}</p>
        </div>
    );
};

export default MapTile;
