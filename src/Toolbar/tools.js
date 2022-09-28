import Wall from "../TyleTypes/Wall";
import Table from "../TyleTypes/Table";
import WallWithPainting from "../TyleTypes/WallWithPainting";
import Bed from "../TyleTypes/Bed";
import SpawnPoint from "../TyleTypes/SpawnPoint";

const tools = {
    Wall: {
        type: Wall,
        dimensions: { width: 1, height: 1 },
        draggable: true
    },
    Table: {
        type: Table,
        dimensions: { width: 2, height: 1 }
    },
    WallWithPainting: {
        name: "Wall With Painting",
        type: WallWithPainting,
        dimensions: { wdth: 1, height: 1 },
        draggable: true
    },
    Bed: {
        type: Bed,
        dimensions: { width: 2, height: 1 }
    },
    SpawnPoint: {
        type: SpawnPoint,
        dimensions: { width: 1, height: 1 },
        max: 1,
        min: 1
    }
};

export default tools;
