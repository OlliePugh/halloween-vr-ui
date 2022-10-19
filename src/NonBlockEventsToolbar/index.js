import { useEffect, useState } from "react";
import * as axios from "axios";
import { Button } from "@mui/material";

const NonBlockEventsToolbar = ({ selectedEvent, setSelectedEvent }) => {
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
        console.log(event);
        if (!event.requiresAssociatedTile) {
            console.log(`TRIGGERING ${event.name}`);
            return;
        }

        setSelectedEvent(event);
    };

    return (
        <>
            {events &&
                Object.entries(events).map(([key, event]) => {
                    const isSelectedEvent = selectedEvent?.key == key;
                    event = { ...event, key };
                    return (
                        <Button
                            key={key}
                            variant={isSelectedEvent ? "outlined" : "contained"}
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
                })}
        </>
    );
};

export default NonBlockEventsToolbar;
