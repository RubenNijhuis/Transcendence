import Match from "./Match";
import Profile from "./Profile";

////////////////////////////////////////////////////////////

namespace Chat {
    export namespace Message {
        export enum ContentType {
            Simple,
            Picture,
            InvitePlay
        }

        // General type
        export type MessageTypes = Simple | Picture | GameInvite;

        // How we define a simple message
        export interface Simple {
            content: string;
        }

        // How we define a picture message
        export interface Picture {
            url: string;
            alt: string;
        }

        // Game invite
        export interface GameInvite {
            opponent: Profile.Instance;
            user: Profile.Instance;
            game_type: Match.GameType;
            accepted: boolean;
        }

        // Message interface
        export interface Instance {
            content: MessageTypes;
            content_type: Message.ContentType;
            timestamp: string;
            senderID: Profile.ProfileID;
            sender: Profile.Instance;
            id: number;
            group_id: number;
            read_by: Profile.Instance[];
        }
    }

    export namespace Group {
        export enum Type {
            DM,
            Group
        }

        export interface Instance {
            group_id: number;
            name: string | null;
            owner: Profile.Instance;
            administrators: Profile.Instance[];
            members: Profile.Instance[];
            messages: Message.Instance[];
            protected: boolean;
            internal_id: number;
        }
    }
}

////////////////////////////////////////////////////////////

export default Chat;
