import Wall from "../TyleTypes/Wall";
import Table from "../TyleTypes/Table";
import WallWithPainting from "../TyleTypes/WallWithPainting";

const tools = {
    Wall: {
        type: Wall,
        width: 1,
        height: 1
    },
    Table: {
        type: Table,
        width: 2,
        hight: 1
    },
    WallWithPainting: {
        name: "Wall With Painting",
        type: WallWithPainting
    }
};

export default tools;
