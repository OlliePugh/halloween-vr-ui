const tools = {
    Wall: {
        tileStyle: {
            colour: "grey"
        },
        dimensions: { width: 1, height: 1 },
        draggable: true
    },
    Table: {
        tileStyle: {
            colour: "green"
        },
        dimensions: { width: 2, height: 1 }
    },
    WallWithPainting: {
        name: "Wall With Painting",
        tileStyle: {
            colour: "red"
        },
        dimensions: { width: 1, height: 1 },
        draggable: true
    },
    Bed: {
        tileStyle: {
            colour: "blue"
        },
        dimensions: { width: 2, height: 1 }
    },
    SpawnPoint: {
        tileStyle: {
            colour: "black",
            textColour: "white"
        },
        name: "Spawn Point",
        dimensions: { width: 1, height: 1 },
        max: 1,
        min: 1
    }
};

export default tools;
