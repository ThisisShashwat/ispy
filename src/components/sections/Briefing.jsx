import Redacted from '../Redacted'

export default function Briefing() {
  return (
    <section id="briefing">
      <div className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-primary-container tracking-[0.3em] text-sm mb-4">
            CASE FILE 001 — BRIEFING
          </p>
          <h2
            data-text="What is ISpy?"
            className="glitch-title text-3xl sm:text-4xl font-bold text-on-background mb-6"
          >
            What is ISpy?
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-4">
            ISpy is a <Redacted>Hack Club</Redacted> program where you get rewarded for building surveillance tech. The mission is simple: design and build a real,
            working piece of surveillance tech, ship it publicly, and get
            rewarded in cool sh*t.
          </p>
          <p className="text-on-surface-variant text-lg leading-relaxed">

          </p>
        </div>
      </div>
    </section>
  )
}
