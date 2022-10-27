const SOCKET_EVENTS = {
    HANDSHAKE: "handshake",
    SET_PRIMARY: "set_primary",
    TRIGGER_EVENT: "trigger_event",
    NONBLOCK_EVENT: "non_block_event",
    MISSING_CLIENT_ID: "missing_client_id",
    MULTIPLE_SOCKETS: "multiple_sockets",
    QUEUE_POSITION_UPDATE: "queue_position_update",
    GAME_STARTING: "game_starting",
    GAME_READY: "game_ready",
    END_GAME: "end_game",
    VALIDATE_MAP: "validate_map",
    JOIN_QUEUE: "join_queue",
    HANDSHAKE_COMPLETE: "handshake_complete",
    MAP_VALIDITY: "map_validity"
};

export default SOCKET_EVENTS;
