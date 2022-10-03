import { useLocation } from "react-router-dom";
import InGameMap from "../InGameMap";

const InGame = () => {
    const location = useLocation();
    return <InGameMap mapData={location.state.map} />;
};

export default InGame;
