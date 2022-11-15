// React stuffs
import React, { createContext, useContext, useState } from "react";

// Socket Library
import { io } from "socket.io-client";

// Api
import SocketRoutes from "../../config/SocketRoutes";

// Types
import { SocketType } from "../../types";

///////////////////////////////////////////////////////////

interface SocketContextType {
    connection: SocketType.Instance;
    createConnection: (socketType: SocketType.SocketType) => void;
    destroyConnectionInstance: () => void;
}

const SocketContext = createContext<SocketContextType>(null!);

const useSocket = () => useContext(SocketContext);

///////////////////////////////////////////////////////////

interface ISocketProvider {
    children: React.ReactNode;
}

const SocketProvider = ({ children }: ISocketProvider): JSX.Element => {
    const [connection, setConnection] = useState<SocketType.Instance>(null!);

    ////////////////////////////////////////////////////////////

    const createConnection = (socketType: SocketType.SocketType) => {
        if (connection !== null) {
            connection.close();
        }

        const options = { path: SocketRoutes.path(socketType) };
        const newSocket: SocketType.Instance = io(
            SocketRoutes.baseUrl(),
            options
        );

        setConnection(newSocket);
    };

    const destroyConnectionInstance = () => {
        connection.close();
    };

    ////////////////////////////////////////////////////////////

    const value: SocketContextType = {
        connection,
        createConnection,
        destroyConnectionInstance
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
