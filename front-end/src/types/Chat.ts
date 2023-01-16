import * as Match from "./Match";
import * as Profile from "./Profile";

////////////////////////////////////////////////////////////

export namespace Message {
    export type Types = Simple | Picture | GameInvite;

    export enum ContentType {
        Simple,
        Picture,
        GameInvite
    }

    // General type

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
        groupId: string;
        id: number;
        content: Message.Types;
        content_type: Message.ContentType;
        createdDate: string;
        senderID: Profile.ID;
        sender: Profile.Instance;
    }
}

export interface Member {
    id: number;
    groupId: string;
    memberId: string;
    profile: Profile.Instance;
    permissions: Group.Permission;
}

export namespace Group {
    export enum Type {
        DM,
        Group
    }

    export enum Permission {
        Standard,
        Admin,
        Owner
    }

    export interface Instance {
        uid: string;
        messages: Message.Instance[];
        name: string;
        owner: string;
        protected: boolean;
        members: Member[];
        size: Group.Type;
    }
}
