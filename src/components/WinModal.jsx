import { useEffect } from "react";
import { ArrowRight, Clock3, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { formatTime } from "./GameBoard.jsx";

export default function WinModal({ moves, seconds, bestScore, stars, onReplay, onChangeLevel }) {
  const displayStars = Math.min(3, Math.max(1, stars));

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onChangeLevel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onChangeLevel]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-ink/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="win-title">
      <div className="confetti-field" aria-hidden="true">
        {Array.from({ length: 28 }, (_, index) => (
          <i key={index} style={{ "--i": index, left: `${(index * 37 + 5) % 100}%` }} />
        ))}
      </div>
      <section className="glass-panel relative z-10 w-full max-w-md animate-modal-in rounded-[30px] p-7 text-center shadow-2xl sm:p-9">
        <div className="mx-auto grid size-16 place-items-center rounded-[22px] border border-mint/20 bg-mint/[0.08] text-mint">
          <Trophy size={29} />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-mint/75">Bien joué !</p>
        <h2 id="win-title" className="mt-2 text-3xl font-semibold tracking-tight text-white">Toutes les paires.</h2>
        <p className="mt-2 text-sm text-white/45">Votre mémoire était au rendez-vous.</p>
        <div className="my-6 flex justify-center gap-2" aria-label={`${displayStars} étoiles sur 3`}>
          {[1, 2, 3].map((star) => (
            <Sparkles key={star} size={25} className={star <= displayStars ? "text-mint" : "text-white/15"} fill={star <= displayStars ? "currentColor" : "none"} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-3 py-4">
            <p className="text-[10px] uppercase tracking-[0.14em] text-white/35">Coups joués</p>
            <p className="mt-1.5 text-2xl font-semibold tabular-nums text-white">{moves}</p>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-3 py-4">
            <p className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/35"><Clock3 size={12} /> Temps</p>
            <p className="mt-1.5 text-2xl font-semibold tabular-nums text-white">{formatTime(seconds)}</p>
          </div>
        </div>
        {bestScore === moves && <p className="mt-4 text-xs font-medium text-mint">Record personnel égalé ou battu !</p>}
        <button type="button" onClick={onReplay} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-mint px-5 py-3.5 text-sm font-semibold text-ink transition hover:bg-[#d0f9df]">
          <RotateCcw size={16} /> Rejouer
        </button>
        <button type="button" onClick={onChangeLevel} className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3.5 text-sm font-medium text-white/65 transition hover:border-white/20 hover:text-white">
          Changer de niveau <ArrowRight size={15} />
        </button>
      </section>
    </div>
  );
}
