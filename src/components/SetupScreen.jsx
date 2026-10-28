import { ArrowRight, Check, Clock3, Layers3, RotateCcw, Sparkles } from "lucide-react";
import { DIFFICULTIES, THEMES } from "../data/gameOptions.js";

export default function SetupScreen({
  difficulty,
  setDifficulty,
  theme,
  setTheme,
  bestScore,
  onStart,
}) {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-81px)] w-full max-w-6xl items-center gap-14 px-5 py-12 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-16">
      <section className="animate-fade-up">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/15 bg-mint/[0.06] px-3.5 py-2 text-xs font-medium text-mint">
          <Sparkles size={14} /> Un moment pour soi
        </div>
        <h1 className="max-w-xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
          Faites une pause.
          <span className="mt-2 block text-mint">Trouvez les paires.</span>
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-white/50">
          Retournez les cartes, faites confiance à votre mémoire et savourez
          chaque petite victoire.
        </p>
        <div className="mt-9 flex flex-wrap gap-5 text-sm text-white/45">
          <span className="flex items-center gap-2"><Clock3 size={15} /> À votre rythme</span>
          <span className="flex items-center gap-2"><RotateCcw size={15} /> Partie toujours renouvelée</span>
        </div>
      </section>

      <section className="glass-panel animate-fade-up rounded-[28px] p-5 sm:p-7" style={{ animationDelay: "100ms" }}>
        <div>
          <h2 className="text-sm font-semibold text-white">Choisissez votre niveau</h2>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {DIFFICULTIES.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => setDifficulty(option)}
                aria-pressed={difficulty.id === option.id}
                className={`rounded-2xl border px-3 py-3.5 text-left transition duration-200 ${
                  difficulty.id === option.id
                    ? "border-mint/55 bg-mint/[0.09] text-mint shadow-glow"
                    : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                <span className="block text-sm font-semibold">{option.name}</span>
                <span className="mt-1 block text-xs opacity-60">{option.size} · {option.pairs} paires</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <h2 className="text-sm font-semibold text-white">Choisissez un univers</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {THEMES.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => setTheme(option)}
                aria-pressed={theme.id === option.id}
                className={`flex items-center gap-3 rounded-2xl border px-3.5 py-3 transition duration-200 ${
                  theme.id === option.id
                    ? "border-mint/50 bg-mint/[0.08] text-white"
                    : "border-white/[0.08] bg-white/[0.02] text-white/65 hover:border-white/20"
                }`}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-xl">{option.icon}</span>
                <span className="flex-1 text-left text-sm font-medium">{option.name}</span>
                {theme.id === option.id && <Check size={15} className="text-mint" />}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-mint px-5 py-4 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#d0f9df] active:translate-y-0"
        >
          Lancer une partie <ArrowRight size={17} />
        </button>
        <div className="mt-4 flex items-center justify-between text-xs text-white/40">
          <span className="flex items-center gap-2"><Layers3 size={14} /> {difficulty.pairs * 2} cartes à découvrir</span>
          <span>Record {bestScore ? `${bestScore} coups` : "—"}</span>
        </div>
      </section>
    </main>
  );
}
