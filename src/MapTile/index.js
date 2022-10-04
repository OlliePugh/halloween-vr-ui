const MapTile = ({
    data,
    row,
    col,
    modifyCallback,
    cellWidth,
    colour = true,
    style = {}
}) => {
    const tileStyle = {
        textColour: "black",
        colour: "white",
        ...data?.type.tileStyle
    };

    return (
        <div
            onClick={() => {
                modifyCallback(row, col, false);
            }}
            onDragOver={() => {
                modifyCallback(row, col, true);
            }}
            style={{
                position: "relative",
                width: `${cellWidth}px`,
                height: `${cellWidth}px`,
                border: "1px solid black",
                gridArea: `${row + 1} / ${col + 1} / ${row + 2} / ${col + 2}`,
                backgroundColor: colour && tileStyle.colour,
                ...style
            }}
        >
            <div
                style={{
                    position: "absolute",
                    margin: 0,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
            >
                <p
                    style={{
                        margin: 0,
                        textAlign: "center",
                        color: tileStyle.textColour,
                        transform: `rotate(${
                            data?.rotation * (180 / Math.PI)
                        }deg)`
                    }}
                >
                    {data?.type.name}
                </p>
            </div>
        </div>
    );
};

export default MapTile;
