'use client'

import { prizeTiers } from '../../data/prizeTiers'

export default function PrizePicker({ hoursTracked, selectedPrize, onSelect }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {prizeTiers.map((tier) => {
        const eligible = hoursTracked >= tier.hours
        return (
          <div
            key={tier.hours}
            className={`border ${eligible ? 'border-outline' : 'border-outline-variant opacity-50'} bg-surface-container-low`}
          >
            <div className="border-b border-dashed border-outline-variant px-3 py-2 text-center">
              <p className="font-mono text-lg font-bold text-on-background">{tier.hours}</p>
              <p className="font-mono text-[9px] tracking-widest text-primary-container uppercase">
                Hours — {tier.codename}
              </p>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {tier.items.map((item) => {
                const selected = selectedPrize?.id === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={!eligible}
                    onClick={() => onSelect(item)}
                    title={eligible ? undefined : `Requires ${tier.hours}+ tracked hours on the selected project`}
                    className={`text-left border px-2 py-2 text-xs font-mono uppercase tracking-wide transition-colors ${
                      selected
                        ? 'border-primary-container bg-surface-container-high text-on-background'
                        : 'border-outline-variant text-on-surface-variant'
                    } ${eligible ? 'hover:border-primary-container cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
