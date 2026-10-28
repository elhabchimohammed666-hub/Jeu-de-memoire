import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import SetupScreen from "./components/SetupScreen.jsx";
import GameBoard from "./components/GameBoard.jsx";
import WinModal from "./components/WinModal.jsx";
import { DIFFICULTIES, THEMES } from "./data/gameOptions.js";
import { useMemoryGame } from "./hooks/useMemoryGame.js";

const BEST_SCORES_KEY = "memo-best-scores";

function readBestScores() {
  const savedScores = window.localStorage.getItem(BEST_SCORES_KEY);
  if (!savedScores) return {};
  const parsedScores = JSON.parse(savedScores);
  if (!parsedScores || typeof parsedScores !== "object" || Array.isArray(parsedScores)) {
    throw new Error("Les meilleurs scores enregistrés sont invalides.");
  }
  return parsedScores;
}

export default function App() {
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);
  const [theme, setTheme] = useState(THEMES[0]);
  const [bestScores, setBestScores] = useState(readBestScores);
  const game = useMemoryGame(theme, difficulty.pairs);
  const bestScore = bestScores[difficulty.id] ?? null;

  const stars = useMemo(() => {
    if (game.moves <= difficulty.pairs * 1.5) return 3;
    if (game.moves <= difficulty.pairs * 2.25) return 2;
    return 1;
  }, [difficulty.pairs, game.moves]);

  useEffect(() => {
    if (game.status !== "won") return;
    const currentBest = bestScores[difficulty.id];
    if (currentBest && currentBest <= game.moves) return;
    const nextScores = { ...bestScores, [difficulty.id]: game.moves };
    window.localStorage.setItem(BEST_SCORES_KEY, JSON.stringify(nextScores));
    setBestScores(nextScores);
  }, [bestScores, difficulty.id, game.moves, game.status]);

  useEffect(() => {
    document.title = game.status === "playing" ? "À vous de jouer — Memo" : "Memo — Le jeu de mémoire";
    return () => {
      document.title = "Memo — Le jeu de mémoire";
    };
  }, [game.status]);

  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="relative z-10">
        <Header />
        {game.status === "setup" ? (
          <SetupScreen
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            theme={theme}
            setTheme={setTheme}
            bestScore={bestScore}
            onStart={game.startGame}
          />
        ) : (
          <GameBoard
            game={game}
            difficulty={difficulty}
            theme={theme}
            bestScore={bestScore}
            onBack={game.showSetup}
            onRestart={game.startGame}
          />
        )}
      </div>
      {game.status === "won" && (
        <WinModal
          moves={game.moves}
          seconds={game.seconds}
          bestScore={bestScores[difficulty.id]}
          stars={stars}
          onReplay={game.startGame}
          onChangeLevel={game.showSetup}
        />
      )}
    </div>
  );
}
