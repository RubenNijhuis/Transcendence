// React stuffs
import React, { createContext, useContext, useState } from "react";

// Socket Library
import { io, ManagerOptions } from "socket.io-client";

// Api
import SocketRoutes from "../../config/SocketRoutes";

// Types
import { SocketType } from "../../types";

import * as Store from "../../modules/Store";
import StoreId from "../../config/StoreId";
import { useUser } from "../UserContext";

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

    ////////////////////////////////////////////////////////////

    // DEBUG for back-end to see who is connection
    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    const createConnection = (socketType: SocketType.Type) => {
        const accessToken = Store.getItem<string>(StoreId.refreshToken);

        if (!accessToken) return;

        if (connection !== null) {
            connection.close();
        }

        const newSocket: SocketType.Instance = io(SocketRoutes.baseUrl(), {
            path: SocketRoutes.path(socketType),
            query: {
                accessToken,
                uid: user.uid
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
