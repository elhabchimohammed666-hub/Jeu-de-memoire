import { Sparkles } from "lucide-react";

export default function Card({ card, isFlipped, isMatched, disabled, onClick }) {
  const isRevealed = isFlipped || isMatched;

  return (
    <button
      type="button"
      aria-label={isRevealed ? `Carte ${card.value}${isMatched ? ", paire trouvée" : ""}` : "Retourner la carte"}
      aria-pressed={isRevealed}
      disabled={disabled || isMatched}
      onClick={onClick}
      className={`memory-card group aspect-square w-full rounded-[15px] sm:rounded-[19px] ${isRevealed ? "is-flipped" : ""} ${isMatched ? "is-matched" : ""}`}
    >
      <span className="memory-card-inner">
        <span className="memory-card-face memory-card-back">
          <Sparkles size={19} className="text-mint/55 transition duration-300 group-hover:scale-110 group-hover:text-mint sm:size-5" />
        </span>
        <span className="memory-card-face memory-card-front">
          <span className="text-3xl sm:text-4xl md:text-[2.75rem]" aria-hidden="true">{card.value}</span>
        </span>
      </span>
    </button>
  );
}
