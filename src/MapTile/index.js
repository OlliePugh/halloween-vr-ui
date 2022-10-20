import { useState } from "react";

const MapTile = ({
    data,
    row,
    col,
    modifyCallback,
    cellWidth,
    colour = true,
    style = {},
    hoverData = {}
}) => {
    const [isHoveringOver, setIsHoveringOver] = useState(false);
    const tileStyle = {
        textColour: "black",
        colour: "white",
        ...data?.type.tileStyle
    };

    const isParent = data?.parent.col === col && data?.parent.row === row;

    return (
        <div
            onClick={() => {
                modifyCallback(row, col, false);
            }}
            onDragOver={() => {
                modifyCallback(row, col, true);
            }}
            onMouseEnter={() => setIsHoveringOver(true)}
            onMouseLeave={() => setIsHoveringOver(false)}
            style={{
                position: "relative",
                width: `${cellWidth}px`,
                height: `${cellWidth}px`,
                border: `1px solid black`,
                gridArea: `${row + 1} / ${col + 1} / ${row + 2} / ${col + 2}`,
                backgroundColor: colour && tileStyle.colour,
                ...style,
                ...(isHoveringOver && hoverData.style)
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
                            data?.rotation * (-180 / Math.PI)
                        }deg)`,
                        textDecoration: isParent ? "underline" : "none"
                    }}
                >
                    {isHoveringOver && hoverData.name
                        ? hoverData.name
                        : data?.type.name}
                </p>
            </div>
        </div>
    );
};

export default MapTile;
