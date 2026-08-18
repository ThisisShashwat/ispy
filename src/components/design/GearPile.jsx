'use client'

import { useState } from 'react'
import PriceTag from './PriceTag'

import flipper from '../../assets/prizes/cutout/flipper_zero_img.png'
import thinkpad from '../../assets/prizes/cutout/thinkpad_laptop_img.png'
import gopro from '../../assets/prizes/cutout/gopro.png'
import headphones from '../../assets/prizes/cutout/headphones.png'
import casio from '../../assets/prizes/cutout/casio_image.png'
import keychain from '../../assets/prizes/cutout/keychain_image.png'

const GEAR = [
  { id: 'thinkpad', src: thinkpad, alt: 'ThinkPad T14', label: 'Laptop', hours: 50, x: 34, y: 4, w: 66, rot: -5, tag: { x: 52, y: 34 }, leader: 30, box: { x: 38, y: 8, w: 58, h: 40 } },
  { id: 'headphones', src: headphones, alt: 'Sony WH-1000XM5', label: 'Audio', hours: 50, x: 74, y: 26, w: 28, rot: 7, tag: { x: 74, y: 58 }, leader: 26, box: { x: 76, y: 30, w: 24, h: 30 } },
  { id: 'flipper', src: flipper, alt: 'Flipper Zero', label: 'RF tool', hours: 25, x: 2, y: 26, w: 38, rot: 8, tag: { x: 10, y: 60 }, leader: 34, box: { x: 5, y: 31, w: 34, h: 26 } },
  { id: 'gopro', src: gopro, alt: 'GoPro HERO12 Black', label: 'Camera', hours: 50, x: 44, y: 56, w: 26, rot: -3, tag: { x: 52, y: 88 }, leader: 24, box: { x: 46, y: 59, w: 23, h: 22 } },
  { id: 'casio', src: casio, alt: 'Casio watch', label: 'Wearable', hours: 15, x: 20, y: 66, w: 20, rot: -9, tag: { x: 24, y: 95 }, leader: 22, box: { x: 21, y: 68, w: 18, h: 26 } },
  { id: 'keychain', src: keychain, alt: 'One Key Keychain', label: 'Input', hours: 1, x: 1, y: 1, w: 22, rot: 5, tag: { x: 5, y: 22 }, leader: 20, box: { x: 2, y: 3, w: 20, h: 18 } },
]

function Detection({ item }) {
  const arm = 'absolute h-3 w-3 border-signal'
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-10 animate-lock"
      style={{
        left: `${item.box.x}%`,
        top: `${item.box.y}%`,
        width: `${item.box.w}%`,
        height: `${item.box.h}%`,
      }}
    >
      <span className={`${arm} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${arm} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${arm} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${arm} bottom-0 right-0 border-b-2 border-r-2`} />
      <span className="absolute -top-[18px] left-0 bg-signal px-1.5 py-0.5 font-data text-[8px] font-bold uppercase leading-none tracking-[0.1em] text-plate">
        {item.label} · {item.hours}h
      </span>
    </div>
  )
}

function Gear({ item, onEnter, onLeave, active }) {
  return (
    <div
      className="absolute cursor-crosshair"
      style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.w}%` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-[8%] bottom-[2%] h-[18%]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(15,17,20,0.30), transparent 70%)',
          filter: 'blur(12px)',
          transform: 'translateY(8px) scaleY(0.4)',
        }}
      />
      <img
        src={item.src.src}
        alt={item.alt}
        className="relative w-full transition-transform duration-200 motion-reduce:transition-none"
        style={{
          transform: `rotate(${item.rot}deg) scale(${active ? 1.03 : 1})`,
          filter:
            'drop-shadow(0 1px 0 rgba(15,17,20,0.45)) drop-shadow(0 6px 10px rgba(15,17,20,0.18))',
        }}
      />
    </div>
  )
}

export default function GearPile() {
  const [locked, setLocked] = useState(null)

  return (
    <div className="relative aspect-[5/4] w-full">
      {GEAR.map((item) => (
        <Gear
          key={item.id}
          item={item}
          active={locked === item.id}
          onEnter={() => setLocked(item.id)}
          onLeave={() => setLocked((cur) => (cur === item.id ? null : cur))}
        />
      ))}
      {GEAR.filter((item) => item.id === locked).map((item) => (
        <Detection key={`${item.id}-lock`} item={item} />
      ))}
      {GEAR.map((item) => (
        <PriceTag
          key={`${item.id}-tag`}
          hours={item.hours}
          leader={item.leader}
          style={{ left: `${item.tag.x}%`, top: `${item.tag.y}%` }}
        />
      ))}
    </div>
  )
}
