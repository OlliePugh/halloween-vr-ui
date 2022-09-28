import { ERRORS } from "../consts";

const MapTile = ({ data, row, col, modifyCallback, cellWidth }) => {
    const BlockType = data?.type.type || (() => {});

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
                gridArea: `${row + 1} / ${col + 1} / ${row + 2} / ${col + 2}`
            }}
        >
            <BlockType />
        </div>
    );
};

export default MapTile;
