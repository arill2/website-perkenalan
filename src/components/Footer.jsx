export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-panel/40 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 font-mono text-[11px] text-dim sm:flex-row">
        <span>
          <span className="text-mint">$</span> exit 0 · dibuat oleh{' '}
          <span className="text-ice">Muh Syahrir Hamdani</span>
        </span>
        <span className="tracking-widest uppercase">
          Amartha Foundation Awardee · {year}
        </span>
      </div>
    </footer>
  )
}
