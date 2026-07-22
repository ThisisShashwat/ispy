// Fixed, click-through scanline + film-grain texture applied once at page root.
export default function ScanlineOverlay() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 bg-scanlines animate-flicker"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 grain-overlay opacity-[0.05] mix-blend-screen"
      />
    </>
  )
}
