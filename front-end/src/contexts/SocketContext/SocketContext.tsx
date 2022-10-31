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
}

const SocketContext = createContext<SocketContextType>(null!);

const useSocket = () => useContext(SocketContext);

///////////////////////////////////////////////////////////

interface ISocketProvider {
    children: React.ReactNode;
}

const SocketProvider = ({ children }: ISocketProvider): JSX.Element => {
    const [connection, setConnection] = useState<any>(null!);
    const [socketType, setSocketType] = useState<Socket.SocketType>(null!);

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        setSocketType(Socket.SocketType.Game);

        const path = SocketRoutes.path(socketType);
        const newSocket = io(SocketRoutes.baseUrl(), { path });

        setConnection(newSocket);
    }, []);

    ////////////////////////////////////////////////////////////

    const value: SocketContextType = {
        connection,

        setSocketType
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
