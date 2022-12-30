// React stuffs
import React, { createContext, useContext, useState } from "react";

// Socket Library
import { io } from "socket.io-client";

// Api
import * as SocketRoutes from "../../config/SocketRoutes";

// Types
import * as SocketType from "../../types/Socket";

// Store
import * as Store from "../../modules/Store";
import StoreId from "../../config/StoreId";

///////////////////////////////////////////////////////////

interface SocketContextType {
    connection: SocketType.Instance;
    createConnection: (socketType: SocketType.Type) => void;
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

    ////////////////////////////////////////////////////////

    const createConnection = (socketType: SocketType.Type) => {
        const accessToken = Store.getItem<string>(StoreId.refreshToken);

        if (!accessToken) return;

        if (connection !== null) {
            connection.close();
        }

        const newSocket: SocketType.Instance = io(SocketRoutes.base.url(), {
            path: SocketRoutes.base.path(socketType),
            query: {
                accessToken
            }
        });

        /**
         * DEBUG console error if any failure happens,
         * setup a more decentralizes system where
         * components can hook into errors
         */
        newSocket.on("failure", console.error);

        setConnection(newSocket);
    };

    const destroyConnectionInstance = () => {
        connection.removeAllListeners();
        connection.close();
    };

    ////////////////////////////////////////////////////////

    const value: SocketContextType = {
        connection,
        createConnection,
        destroyConnectionInstance
    };

    ////////////////////////////////////////////////////////

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

////////////////////////////////////////////////////////////

export { useSocket };
export default SocketProvider;
