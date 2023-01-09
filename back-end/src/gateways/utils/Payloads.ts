/**
 * We'd still to prefer to use namespaces as the
 * file isn't big so far and gives a good preview
 * on all the data that the gateways send over
 */

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