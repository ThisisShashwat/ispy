export default function CtaFooter() {
  return (
    <section id="cta" className="bg-surface-container-lowest">
      <div className="px-6 py-24 text-on-background text-center">
        <p className="font-mono text-secondary-container tracking-[0.3em] text-sm mb-4">
          EYES ONLY
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold mb-8 text-glow hover:tracking-wide transition-all duration-300">
          Ready for your first assignment?
        </h2>
        <a
          href="/api/auth/login"
          className="font-mono uppercase tracking-widest border border-primary-container text-primary-container px-8 py-4 hover:bg-primary-container hover:text-on-primary-container transition-colors inline-block"
        >
          Accept Mission
        </a>
        <p className="mt-16 text-xs font-mono text-on-surface-variant tracking-widest">
          ISPY - made with love by <a className="link" href="https://plastuchino.xyz">seba (plastuchino)</a>
        </p>
      </div>
    </section>
  )
}
