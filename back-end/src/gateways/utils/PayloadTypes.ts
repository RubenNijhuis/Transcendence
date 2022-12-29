export interface NewMessage {
  content: string;
  content_type: number; // TODO: copy enum from front-end
}

export interface JoinRoom {
  roomID: string;
}
