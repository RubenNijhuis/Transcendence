import Match from "./Match";
import Profile from "./Profile";

////////////////////////////////////////////////////////////

namespace Chat {
    export namespace Message {
        export enum ContentType {
            Simple,
            Picture,
            GameInvite
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
            uid: number;
        }
    }

    export interface Member {
        id: number;
        groupId: string
        memberId: string;
        profile: Profile.Instance
        permissions: Chat.Group.Permission;
    }
    
    export namespace Group {
        export enum Type {
            DM,
            Group
        }

        export enum Permission {
            Standard,
            Admin
        }

        export interface Instance {
            uid: string;
            messages: Message.Instance[];
            name: string;
            owner: string;
            protected: boolean;
            members: Chat.Member[];
            internal_id: number;
        }
    }
}

////////////////////////////////////////////////////////////

export default Chat;
