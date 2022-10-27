// React stuffs
import React, { createContext, useContext, useState } from "react";

// Socket Library
import { io } from "socket.io-client";

// Api
import ApiRoutes from "../../config/ApiRoutes";

// Types
import { SocketType } from "../../types/socket";

///////////////////////////////////////////////////////////

interface SocketContextType {
    socket: any;
    socketType: SocketType;

    setSocketType: any;
}

const SocketContext = createContext<SocketContextType>(null!);

const useSocket = () => useContext(SocketContext);

///////////////////////////////////////////////////////////

const SocketProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [socketType, setSocketType] = useState<SocketType>(null!);
    const socket = io(ApiRoutes.socketRoute());

    ////////////////////////////////////////////////////////////

    const value: SocketContextType = {
        socket,
        socketType,
        setSocketType
    };

    ////////////////////////////////////////////////////////////

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export { useSocket };
export default SocketProvider;
