export const ERRORS = {
    OVERLAPPING_BLOCK: "overlapping_block",
    MAX_BLOCK_REACHED: "max_block_reached",
    NOT_A_SHELF: "not_a_shelf"
};

export const ERROR_MESSAGES = {
    [ERRORS.OVERLAPPING_BLOCK]: "Something is in the way!",
    [ERRORS.MAX_BLOCK_REACHED]:
        "You have placed the maximum amount of this item!",
    [ERRORS.NOT_A_SHELF]: "You cannot place things on top of that block!"
};

export const MODULES = {
    MAP_MAKER: {
        name: "map_maker",
        description: "Create a map"
    },
    PLACE_REQUIRED: {
        name: "place_required",
        description: "Place the important stuff"
    },
    IN_QUEUE: {
        name: "in_queue",
        description: "Wait for your turn"
    },
    IN_GAME: {
        name: "in_game",
        description: "Play!"
    }
};

export const CHAIN = [
    MODULES.MAP_MAKER,
    MODULES.PLACE_REQUIRED,
    MODULES.IN_QUEUE,
    MODULES.IN_GAME
];

export const INVALID_MAP_MESSAGES = {
    key_not_accessable: "The key is not accessible from the spawn point!",
    min_not_satisfied: "This map is corrupted, please create another map!",
    max_not_satisfied: "This map is corrupted, please create another map!",
    missing_compulsory: "You are missing a compulsory block!"
};

const DEV_ORCH_URL = "localhost:5001";
const PROD_ORCH_URL = `api.${window.location.hostname.replace(/www./g, "")}`;

export const ORCH_URL =
    process.env.NODE_ENV === "development" ? DEV_ORCH_URL : PROD_ORCH_URL;

export const MAP_WIDTH = 25;
export const MAP_HEIGHT = 25;
export const CELL_WIDTH = 100;
