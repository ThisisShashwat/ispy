export default function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-lowest px-6 py-6">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
        <a
          className="link hover:text-primary-container transition-colors"
          href="https://hackclub.com/privacy-and-terms#hack-club-standard-terms-and-conditions"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        <a
          className="link hover:text-primary-container transition-colors"
          href="https://hackclub.com/privacy-and-terms#hack-club-privacy-notice"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        <a
          className="link hover:text-primary-container transition-colors"
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
