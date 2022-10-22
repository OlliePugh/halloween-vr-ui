export const ERRORS = {
    OVERLAPPING_BLOCK: "overlapping_block",
    MAX_BLOCK_REACHED: "max_block_reached"
};

export const ERROR_MESSAGES = {
    [ERRORS.OVERLAPPING_BLOCK]: "Something is in the way!",
    [ERRORS.MAX_BLOCK_REACHED]:
        "You have placed the maximum amount of this item!"
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
    IN_GAME: {
        name: "in_game",
        description: "Play!"
    }
};

export const CHAIN = [
    MODULES.MAP_MAKER,
    MODULES.PLACE_REQUIRED,
    MODULES.IN_GAME
];

export const MAP_WIDTH = 25;
export const MAP_HEIGHT = 25;
export const CELL_WIDTH = 100;
