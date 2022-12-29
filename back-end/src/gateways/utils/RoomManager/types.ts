import { Socket } from "socket.io";

////////////////////////////////////////////////////////////

// Namespace for the member
namespace Member {
    export type ID = string;

    export interface Instance {
        uid: Member.ID;
        roomID: string;
        connection: Socket;
        data: any;
    }
}

// Namespace for the room
namespace Room {
    export type ID = string;

    export interface Instance {
        id: ID;
        members: Map<Member.ID, Member.Instance>;
        data: any;
    }
}

////////////////////////////////////////////////////////////

export type { Member, Room };
