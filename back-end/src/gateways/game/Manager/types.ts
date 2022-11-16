enum GameStatus {
  Initial,
  Setup,
  Running,
  Finished
}

type Position = {
  posX: number;
  posY: number;
};

export { GameStatus, Position };
