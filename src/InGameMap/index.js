import MapTile from "../MapTile";

const CELL_WIDTH = 100;

const InGameMap = ({ mapData }) => {
    return (
        <>
            <div
                style={{
                    display: "inline-grid",
                    width: mapData.length * CELL_WIDTH
                }}
            >
                {mapData.map((col, colNum) => {
                    return col.map((tile, rowNum) => {
                        return (
                            <MapTile
                                modifyCallback={() => {}}
                                cellWidth={CELL_WIDTH}
                                data={tile}
                                key={rowNum + "" + colNum}
                                row={rowNum}
                                col={colNum}
                            />
                        );
                    });
                })}
            </div>
        </>
    );
};

export default InGameMap;
