'use client'

import { prizeTiers } from '../../data/prizeTiers'

export default function PrizePicker({ hoursTracked, cart, onChangeQuantity }) {
  const totalCost = prizeTiers.reduce(
    (sum, tier) => sum + tier.items.reduce((tierSum, item) => tierSum + tier.hours * (cart[item.id] ?? 0), 0),
    0,
  )
  const overBudget = totalCost > hoursTracked

  return (
    <div className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {prizeTiers.map((tier) => (
          <div key={tier.hours} className="border border-outline bg-surface-container-low">
            <div className="border-b border-dashed border-outline-variant px-3 py-2 text-center">
              <p className="font-mono text-lg font-bold text-on-background">{tier.hours}</p>
              <p className="font-mono text-[9px] tracking-widest text-primary-container uppercase">
                Hours — {tier.codename}
              </p>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {tier.items.map((item) => {
                const quantity = cart[item.id] ?? 0
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between gap-2 border px-2 py-2 text-xs font-mono uppercase tracking-wide ${
                      quantity > 0
                        ? 'border-primary-container bg-surface-container-high text-on-background'
                        : 'border-outline-variant text-on-surface-variant'
                    }`}
                  >
                    <span className="truncate">{item.name}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onChangeQuantity(item.id, Math.max(0, quantity - 1))}
                        disabled={quantity === 0}
                        className="border border-outline-variant w-6 h-6 flex items-center justify-center hover:border-primary-container disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        −
                      </button>
                      <span className="w-4 text-center">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => onChangeQuantity(item.id, quantity + 1)}
                        className="border border-outline-variant w-6 h-6 flex items-center justify-center hover:border-primary-container"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <p className={`font-mono text-xs ${overBudget ? 'text-error' : 'text-on-surface-variant'}`}>
        Cart total: {totalCost.toFixed(1)} / {hoursTracked.toFixed(1)} hours
        {overBudget ? ' — over budget' : ''}
      </p>
    </div>
  )
}
