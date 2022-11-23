const amountGames = 100;
const deltaTime = 16;
const runTime = 60;

let runningGames = [];

////////////////////////////////////////////////////////////

for (let i = 0; i < 10; i++) {
  runningGames.push({ id: i + 1, amountHits: 0, finished: false });
}

////////////////////////////////////////////////////////////

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const removeGameFromRunning = (id) => {
  runningGames = runningGames.filter((game) => game.id !== id);
  // update data in database
  // emit (finished game)
};

const updateGameStats = async (game) => {
  await timer(60);
  game.amountHits++;

  if (game.amountHits === runTime * game.id) {
    game.finished = true;
    removeGameFromRunning(game.id);
  }
};

////////////////////////////////////////////////////////////

(async () => {
  console.time("Game running 1 sec");

  while (runningGames.length !== 0) {
    for (let i = 0; i < runningGames.length; i++) {
      updateGameStats(runningGames[i]);
    }
    await timer(16);
  }

  console.timeLog("Game running 1 sec");
})();
