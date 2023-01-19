// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Game {
  export interface FriendlyMatch {
    friendId: string;
  }

  export interface BatPositionUpdate {
    posX: number;
  }

  export interface JoinQueue {
    gameType: number;
  }

  export interface MatchStatus {
    status: string;
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Chat {
  export interface NewMessage {
    content: string;

    // TODO: copy enum from front-end
    content_type: number;
  }

  export interface JoinRoom {
    roomID: string;
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Event {
  export interface GameStatus {
    memberId: string;
    status: boolean;
    requester: string;
    gameId: null | string;
  }
}
