// React stuffs
import React, { createContext, useContext, useEffect, useState } from "react";

// Socket Library
import { io } from "socket.io-client";

// Api
import * as SocketRoutes from "../../config/SocketRoutes";

// Types
import * as SocketType from "../../types/Socket";

// Store
import * as Store from "../../modules/Store";
import StoreId from "../../config/StoreId";

// Context
import { useUser } from "../UserContext";

///////////////////////////////////////////////////////////

interface SocketContextType {
    eventConnection: SocketType.Instance;
    chatConnection: SocketType.Instance;
    gameConnection: SocketType.Instance;
}

const SocketContext = createContext<SocketContextType>(null!);

const useSocket = () => useContext(SocketContext);

///////////////////////////////////////////////////////////

interface ISocketProvider {
    children: React.ReactNode;
}

const SocketProvider = ({ children }: ISocketProvider): JSX.Element => {
    const [gameConnection, setGameConnection] = useState<SocketType.Instance>(
        null!
    );
    const [eventConnection, setEventConnection] = useState<SocketType.Instance>(
        null!
    );
    const [chatConnection, setChatConnection] = useState<SocketType.Instance>(
        null!
    );

    ////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////

    useEffect(() => {
        const accessToken = Store.getItem<string>(StoreId.refreshToken);
        if (!user || !accessToken) return;

        createConnection(SocketType.Type.Chat, setChatConnection);
        createConnection(SocketType.Type.Game, setGameConnection);
        createConnection(SocketType.Type.Event, setEventConnection);

        // return () => {
        //     destroyConnection(chatConnection);
        //     destroyConnection(gameConnection);
        //     destroyConnection(eventConnection);
        // };
    }, [user]);

    const createConnection = (
        socketType: SocketType.Type,
        socketSetter: React.Dispatch<React.SetStateAction<SocketType.Instance>>
    ) => {
        const accessToken = Store.getItem<string>(StoreId.refreshToken);
        if (!accessToken) return;

        const newSocket: SocketType.Instance = io(SocketRoutes.base.url, {
            path: SocketRoutes.base.path(socketType),
            query: {
                accessToken
            }
        });

        /**
         * DEBUG console error if any failure happens,
         * setup a more decentralized system where
         * components can hook into errors
         */
        newSocket.on("failure", console.error);
        socketSetter(newSocket);
    };

    const destroyConnection = (socket: SocketType.Instance) => {
        socket.disconnect();
    };

    ////////////////////////////////////////////////////////

    const value: SocketContextType = {
        gameConnection,
        chatConnection,
        eventConnection
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
