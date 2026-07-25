// Wraps the entire homepage in one piece of terminal-emulator chrome: a
// single title bar with a user@host:path identity and fake [-][□][x] window
// controls. All three controls are purely decorative and do nothing when
// clicked. The frame scrolls with the page — it is not fixed/sticky, and it
// has no internal scroll region of its own.
export default function TerminalPane({
  host = 'agent@ispy',
  path = './ispy.sh',
  className = '',
  children,
}) {
  return (
    <div className={`border border-outline ${className}`}>
      <div className="flex items-center gap-3 border-b border-outline-variant bg-surface-container px-3 py-2">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            aria-label="minimize"
            className="w-3 h-3 border border-outline-variant"
          />
          <button
            type="button"
            aria-label="maximize"
            className="w-3 h-3 border border-outline-variant"
          />
          <button
            type="button"
            aria-label="close"
            className="w-3 h-3 border border-secondary-container"
          />
        </div>
        <p className="font-mono text-[11px] sm:text-xs tracking-widest text-on-surface-variant truncate">
          {`${host}:~$ ${path}`}
        </p>
      </div>

      {children}
    </div>
  )
}
