export default function StatCard({ icon: Icon, label, value, detail }) {
  return (
    <div className="glass-panel flex min-w-0 items-center gap-3 rounded-2xl px-3.5 py-3 sm:gap-3.5 sm:px-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/[0.055] text-mint">
        <Icon size={17} />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-[0.13em] text-white/35 sm:text-[11px]">{label}</p>
        <p className="mt-0.5 truncate text-base font-semibold tabular-nums text-white sm:text-lg">{value}
          {detail && <span className="ml-1 text-xs font-normal text-white/35">{detail}</span>}
        </p>
      </div>
    </div>
  );
}
