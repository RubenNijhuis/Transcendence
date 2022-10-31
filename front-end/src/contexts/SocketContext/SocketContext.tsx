// React stuffs
import React, { createContext, useContext, useEffect, useState } from "react";

// Socket Library
import { io } from "socket.io-client";

// Api
import SocketRoutes from "../../config/SocketRoutes";

// Types
import { Socket } from "../../types";

///////////////////////////////////////////////////////////

interface SocketContextType {
    connection: any;

    setSocketType: React.Dispatch<React.SetStateAction<Socket.SocketType>>;

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
    const [connection, setConnection] = useState<any>(
        io(SocketRoutes.baseUrl(), {
            path: SocketRoutes.path(Socket.SocketType.Chat)
        })
    );
    const [socketType, setSocketType] = useState<Socket.SocketType>(null!);
    const [roomId, setRoomId] = useState<string>(null!);

    ////////////////////////////////////////////////////////////

    // useEffect(() => {
    //     setSocketType(Socket.SocketType.Game);

    //     const path = SocketRoutes.path(socketType);
    //     const newSocket = io(SocketRoutes.baseUrl(), { path: "/game" });

    //     setConnection(newSocket);
    // }, []);

    ////////////////////////////////////////////////////////////

    const value: SocketContextType = {
        connection,

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
