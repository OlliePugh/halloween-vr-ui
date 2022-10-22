import { useEffect, useState } from "react";
import * as axios from "axios";
import { Button, CircularProgress } from "@mui/material";

const NonBlockEventsToolbar = ({
    selectedEvent,
    setSelectedEvent,
    dispatchNonBlockEvent,
    runningNonTileBlocks
}) => {
    const [events, setEvents] = useState();
    useEffect(() => {
        const getEvents = async () => {
            try {
                const events = (await axios.get("/events"))?.data;
                setEvents(events);
            } catch (e) {
                console.log(e);
                alert("Could not fetch events from server!");
            }
        };

        getEvents();
    }, []);

    const chooseEvent = (event) => {
        if (!event.requiresAssociatedTile) {
            setSelectedEvent();
            dispatchNonBlockEvent(event);
            return;
        }

        setSelectedEvent(event);
    };

    return (
        <>
            {events ? (
                Object.entries(events).map(([key, event]) => {
                    const isSelectedEvent = selectedEvent?.key === key;
                    event = { ...event, key };
                    return (
                        <Button
                            key={key}
                            variant={isSelectedEvent ? "outlined" : "contained"}
                            disabled={!!runningNonTileBlocks?.[key]}
                            fullWidth={true}
                            onClick={() => {
                                isSelectedEvent
                                    ? setSelectedEvent()
                                    : chooseEvent(event);
                            }}
                        >
                            {event.name || key}
                        </Button>
                    );
                })
            ) : (
                <div style={{ textAlign: "center" }}>
                    <CircularProgress />
                </div>
            )}
        </>
    );
};

export default NonBlockEventsToolbar;
