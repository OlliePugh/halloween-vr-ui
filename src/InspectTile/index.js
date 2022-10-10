const CELL_WIDTH = "25";

const InspectTile = ({ width, height, rotation }) => {
    const tiles = [];

    const degreeRotation = rotation * (180 / Math.PI);

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            tiles.push(
                <div
                    key={`${i},${j}`}
                    style={{
                        border: "5px black solid",
                        height: CELL_WIDTH + "px",
                        width: CELL_WIDTH + "px",
                        gridArea: `${i + 1} / ${j + 1} / ${i + 2} / ${j + 2}`,
                        backgroundColor:
                            i === 0 && j === 0 ? "red" : "transparent" // is parent
                    }}
                ></div>
            );
        }
    }

    return (
        <div
            style={{
                display: "grid",
                width: width * CELL_WIDTH,
                transform: `rotate(-${degreeRotation}deg)`,
                margin: "0 auto"
            }}
        >
            {tiles}
        </div>
    );
};

export default InspectTile;
