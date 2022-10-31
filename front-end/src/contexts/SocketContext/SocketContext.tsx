// React stuffs
import React, { createContext, useContext, useState } from "react";

// Socket Library
import { io } from "socket.io-client";

// Api
import SocketRoutes from "../../config/SocketRoutes";

// Types
import { Socket } from "../../types";

///////////////////////////////////////////////////////////

interface SocketContextType {
    socket: any;

    socketType: Socket.SocketType;
    setSocketType: any;

    roomId: string;
    setRoomId: React.Dispatch<React.SetStateAction<string>>;
}

const SocketContext = createContext<SocketContextType>(null!);

const useSocket = () => useContext(SocketContext);

///////////////////////////////////////////////////////////

const SocketProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [socketType, setSocketType] = useState<Socket.SocketType>(null!);
    const [roomId, setRoomId] = useState<string>(null!);
    const socket = io(SocketRoutes.baseUrl());

    ////////////////////////////////////////////////////////////

    const value: SocketContextType = {
        socket,

        socketType,
        setSocketType,

        roomId,
        setRoomId
    };

    ////////////////////////////////////////////////////////////

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

////////////////////////////////////////////////////////////

export { useSocket };
export default SocketProvider;
