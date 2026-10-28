import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-white/[0.07] px-5 py-5 sm:px-8">
      <a href="#" className="flex items-center gap-2.5" aria-label="Memo, accueil">
        <span className="grid size-9 place-items-center rounded-xl bg-mint text-ink">
          <Sparkles size={18} strokeWidth={2.2} />
        </span>
        <span className="text-lg font-semibold tracking-tight text-white">memo<span className="text-mint">.</span></span>
      </a>
      <span className="hidden text-xs font-medium tracking-[0.18em] text-white/35 sm:block">
        UN PETIT DÉFI POUR VOTRE MÉMOIRE
      </span>
      <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50">
        Édition détente
      </span>
    </header>
  );
}
