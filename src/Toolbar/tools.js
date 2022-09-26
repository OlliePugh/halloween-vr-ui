import Wall from "../TyleTypes/Wall";
import Table from "../TyleTypes/Table";
import WallWithPainting from "../TyleTypes/WallWithPainting";

const tools = {
    Wall: {
        type: Wall,
        dimensions: { width: 1, height: 1 }
    },
    Table: {
        type: Table,
        dimensions: { width: 2, height: 1 }
    },
    WallWithPainting: {
        name: "Wall With Painting",
        type: WallWithPainting,
        dimensions: { width: 1, height: 1 }
    }
};

export default tools;
