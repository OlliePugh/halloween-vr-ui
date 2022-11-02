import MessagePopup from "../MessagePopup";
import { useState } from "react";

const OfflinePopup = () => {
    const [modalOpen, setModalOpen] = useState(true);

    const handleClose = () => {
        setModalOpen(false);
    };
    console.log("offline");
    return (
        <MessagePopup
            handleClose={handleClose}
            open={modalOpen}
            content={{
                title: "Game Offline!",
                message:
                    "Ollie is not currently playing! But you can create a map and save it to use when he is playing! Be sure to join the discord so that you can see when the next game/event is!"
            }}
        />
    );
};

export default OfflinePopup;
