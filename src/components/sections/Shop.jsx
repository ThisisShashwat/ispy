import PhotoCell from '../design/PhotoCell'
import { cutouts } from '../../data/cutouts'

import { prizeTiers } from '../../data/prizeTiers'

const hoursFor = (id) => {
  for (const tier of prizeTiers) {
    if (tier.items.some((i) => i.id === id)) return tier.hours
  }
  return null
}

const STOCK = [
  { id: 'keychain', name: 'One Key Keychain' },
  { id: 'watch', name: 'Casio Watch' },
  { id: 'flipper-zero', name: 'Flipper Zero' },
  { id: 'gopro', name: 'GoPro HERO12 Black' },
  { id: 'laptop', name: 'ThinkPad T14' },
  { id: 'headphones', name: 'Sony WH-1000XM5' },
]

export default function Shop() {
  return (
    <>
      <ul className="grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
        {STOCK.map((item) => (
          <li key={item.id} className="relative bg-plate p-6">
            <PhotoCell src={cutouts[item.id]} alt={item.name} hours={hoursFor(item.id)} />
            <h3 className="mt-5 font-data text-[11px] uppercase tracking-[0.1em] text-ink">
              {item.name}
            </h3>
          </li>
        ))}
      </ul>

      <a
        href="/prizes"
        className="mt-10 inline-block border border-ink px-7 py-3.5 font-data text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-plate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        See all 18
      </a>
    </>
  )
}
