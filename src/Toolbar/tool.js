import { ERROR_MESSAGES } from "../consts";
import { placeBlock } from "./utils";
import { Button } from "@mui/material";
const Tool = ({ toolName, setCurrentTool, tool, rotationRef, disabled }) => {
    return (
        <div>
            <Button
                key={toolName}
                onClick={() => {
                    setCurrentTool({
                        ...tool,
                        name: toolName,
                        trigger: (tiles, clickedPos, ignoredExceptions) => {
                            try {
                                return placeBlock(
                                    tiles,
                                    clickedPos,
                                    tool.dimensions,
                                    rotationRef,
                                    {
                                        ...tool,
                                        key: toolName,
                                        name: tool.name || toolName
                                    }
                                );
                            } catch (e) {
                                if (!ignoredExceptions?.includes(e.message)) {
                                    alert(ERROR_MESSAGES[e.message]);
                                }
                                return tiles;
                            }
                        }
                    });
                }}
                disabled={disabled}
                variant="outlined"
                fullWidth={true}
            >
                {tool.name || toolName}
            </Button>
        </div>
    );
};

export default Tool;
