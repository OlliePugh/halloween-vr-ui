import Draggable from "react-draggable";
import { useState } from "react";

export default ({ data, row, col, moveTileCallback, cellWidth }) => {
    const [startDragPos, setStartDragPos] = useState({});

    return (
        <Draggable
            onStop={(event) => {
                moveTileCallback(row, col, {
                    x: event.clientX - startDragPos.x,
                    y: event.clientY - startDragPos.y
                });
            }}
            onStart={(event) => {
                setStartDragPos({ x: event.clientX, y: event.clientY });
            }}
            disabled={data == undefined}
            position={{ x: 0, y: 0 }}
        >
            <div
                style={{
                    width: `${cellWidth}px`,
                    height: `${cellWidth}px`,
                    border: "1px solid black",
                    gridArea: `${row + 1} / ${col + 1} / ${row + 2} / ${
                        col + 2
                    }`,
                    backgroundColor: data?.backgroundColor
                }}
            ></div>
        </Draggable>
    );
};
