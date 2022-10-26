import { CELL_WIDTH } from "../consts";
import { useState, useEffect } from "react";

const EntityLocation = ({ name, color, _key, socketRef }) => {
    const [entityLocation, setEntityLocation] = useState();
    useEffect(() => {
        socketRef.current
            ?.off(`${_key}_location`)
            .on(`${_key}_location`, (location) => {
                setEntityLocation(location);
            });
    }, [socketRef, _key]);
    return (
        <>
            {entityLocation && (
                <div
                    style={{
                        width: CELL_WIDTH / 2,
                        height: CELL_WIDTH / 2,
                        backgroundColor: color,
                        position: "absolute",
                        top: entityLocation.row * CELL_WIDTH + CELL_WIDTH / 4, // THIS MIGHT NOT BE NEEDED!
                        left: entityLocation.col * CELL_WIDTH + CELL_WIDTH / 4,
                        margin: 0,
                        padding: 0,
                        zIndex: 100,
                        transition: "all 0.2s linear"
                    }}
                >
                    {name}
                </div>
            )}
        </>
    );
};

export default EntityLocation;
