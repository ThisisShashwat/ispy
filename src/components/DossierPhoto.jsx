'use client'

import { useState } from 'react'

// Wraps an image in a bracketed "secured file" treatment: filename-style
// header, [SECURED] tag, and sharp-cornered bordered frame.
export default function DossierPhoto({
  src,
  alt,
  label,
  filename,
  width = 'w-64 sm:w-80',
}) {
  const [imageFailed, setImageFailed] = useState(false)

  const displayName =
    filename || `${(alt || 'FILE').toUpperCase().replace(/\s+/g, '_')}.DAT`

  // Next.js static image imports resolve to a { src, width, height } object,
  // not a URL string — unwrap it so <img src> gets an actual path either way.
  const resolvedSrc = typeof src === 'string' ? src : src?.src

  return (
    <div className={`bg-surface-container-low border border-outline ${width}`}>
      <div className="flex items-center justify-between gap-2 border-b border-dashed border-outline-variant px-3 py-2">
        <span className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase truncate">
          [ {displayName} ]
        </span>
        <span className="font-mono text-[10px] tracking-widest text-primary-container border border-primary-container px-1.5 py-0.5 uppercase shrink-0">
          [SECURED]
        </span>
      </div>
      <div className="p-3">
        {imageFailed ? (
          <div className="w-full aspect-[4/3] border border-outline-variant flex items-center justify-center font-mono text-xs text-on-surface-variant text-center px-2">
            IMAGE UNAVAILABLE
          </div>
        ) : (
          <img
            src={resolvedSrc}
            alt={alt}
            onError={() => setImageFailed(true)}
            className="w-full h-auto border border-outline-variant"
          />
        )}
      </div>
      {label && (
        <div className="border-t border-dashed border-outline-variant px-3 py-1.5">
          {/* <span className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase">
            CLEARANCE: {label}
          </span> */}
        </div>
      )}
    </div>
  )
}
