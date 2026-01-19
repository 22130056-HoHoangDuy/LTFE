// utils/constants.ts
export const SOCKET_ACTIONS = {
    ON_CHAT: "onchat",
};

export const CHAT_EVENTS = {
    // room
    CREATE_ROOM: "CREATE_ROOM",
    JOIN_ROOM: "JOIN_ROOM",
    GET_ROOM_MESSAGES: "GET_ROOM_CHAT_MESS",

    // people
    GET_PEOPLE_MESSAGES: "GET_PEOPLE_CHAT_MESS",
    SEND_CHAT: "SEND_CHAT",

    // user
    GET_USER_LIST: "GET_USER_LIST",
    CHECK_USER_ONLINE: "CHECK_USER_ONLINE",
    CHECK_USER_EXIST: "CHECK_USER_EXIST",
};
