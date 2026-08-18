export default function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-ground px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-center gap-x-6 gap-y-2 font-data text-[10px] uppercase tracking-[0.12em] text-ink/55">
        <a
          className="transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          href="https://hackclub.com/privacy-and-terms#hack-club-standard-terms-and-conditions"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        <a
          className="transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          href="https://hackclub.com/privacy-and-terms#hack-club-privacy-notice"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        <a
          className="transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          href="https://forms.hackclub.com/bounty"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fulfillment Bounty
        </a>
      </div>
    </footer>
  )
}
