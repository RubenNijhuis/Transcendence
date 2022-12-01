namespace Profile {
  export type ProfileID = string;

  export interface Instance {
    uid: ProfileID;

    username: string;
    description: string;

    img_url: string;
    banner_url: string;

    color: string;

    isTfaEnabled: boolean;

    rank: number;
    wins: number;
    losses: number;
  }
}

////////////////////////////////////////////////////////////

export default Profile;
