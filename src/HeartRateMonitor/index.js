import { useEffect, useState } from "react";
import * as axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HeartRateMonitor = () => {
    const [currentHeartRate, setCurrentHeartRate] = useState();

    useEffect(() => {
        setInterval(async () => {
            try {
                const bpm = (await axios.get("/bpm"))?.data;
                setCurrentHeartRate(bpm);
            } catch (e) {
                console.log("Failed to get heart rate");
                console.log(e.message);
            }
        }, 1000);
    }, []);

    return (
        <div style={{ position: "fixed", right: 10, top: 10 }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap"
                }}
            >
                <FavoriteIcon sx={{ color: "red" }} />
                <span>{currentHeartRate} BPM</span>
            </div>
        </div>
    );
};

export default HeartRateMonitor;
