import { useMemo } from "react";
import { ArrowLeft, Clock3, RotateCcw, Target } from "lucide-react";
import Card from "./Card.jsx";
import StatCard from "./StatCard.jsx";

export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function GameBoard({
  game,
  difficulty,
  theme,
  bestScore,
  onBack,
  onRestart,
}) {
  const matchedCount = game.matchedIds.length;
  const progress = useMemo(
    () => (matchedCount / difficulty.pairs) * 100,
    [difficulty.pairs, matchedCount],
  );

  return (
    <main className="mx-auto min-h-[calc(100vh-81px)] w-full max-w-6xl px-4 py-7 sm:px-8 sm:py-10">
      <div className="mb-7 flex items-center justify-between">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white">
          <ArrowLeft size={16} /> Changer de partie
        </button>
        <button type="button" onClick={onRestart} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition hover:border-mint/40 hover:text-mint">
          <RotateCcw size={14} /> Recommencer
        </button>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-mint/70">{theme.name} <span className="mx-1.5 text-white/20">/</span> {difficulty.name}</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">À vous de jouer<span className="text-mint">.</span></h1>
        </div>

        <div className="mb-3 grid grid-cols-3 gap-2 sm:gap-3">
          <StatCard icon={RotateCcw} label="Coups" value={game.moves} />
          <StatCard icon={Clock3} label="Temps" value={formatTime(game.seconds)} />
          <StatCard icon={Target} label="Paires" value={`${matchedCount} / ${difficulty.pairs}`} />
        </div>
        <div className="mb-6 h-1 overflow-hidden rounded-full bg-white/[0.07]" role="progressbar" aria-label="Progression des paires trouvées" aria-valuenow={matchedCount} aria-valuemin={0} aria-valuemax={difficulty.pairs}>
          <div className="h-full rounded-full bg-mint transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        <div
          className={`mx-auto grid w-full gap-2.5 sm:gap-3 ${difficulty.columns === 4 ? "max-w-[530px]" : difficulty.columns === 6 ? "max-w-[680px]" : "max-w-[850px]"}`}
          style={{ gridTemplateColumns: `repeat(${difficulty.columns}, minmax(0, 1fr))` }}
        >
          {game.cards.map((card, index) => {
            const isFlipped = game.flippedIds.includes(card.id);
            const isMatched = game.matchedIds.includes(card.pairId);
            return (
              <div key={card.id} className="animate-card-in" style={{ animationDelay: `${Math.min(index, 20) * 18}ms` }}>
                <Card
                  card={card}
                  isFlipped={isFlipped}
                  isMatched={isMatched}
                  disabled={game.isChecking}
                  onClick={() => game.flipCard(card)}
                />
              </div>
            );
          })}
        </div>
        <p className="mt-5 text-center text-xs text-white/35">
          {bestScore ? `Votre record pour ce niveau : ${bestScore} coups` : "Chaque partie est une nouvelle occasion de battre votre record"}
        </p>
      </div>
    </main>
  );
}
