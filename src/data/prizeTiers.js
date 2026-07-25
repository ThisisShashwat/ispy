import flipperPlaceholder from '../assets/prizes/flipper_zero_img.webp'
import goproPlaceholder from '../assets/prizes/gopro-placeholder.svg'
import monitorPlaceholder from '../assets/prizes/minotor_pic.avif'
import casioWatch from "../assets/prizes/casio_image.jpg"
import laptopImage from "../assets/prizes/thinkpad_laptop_img.jpg"
import porkbun from "../assets/prizes/porkbun.png"
import keychain from "../assets/prizes/keychain_image.jpg"
import macropad from "../assets/prizes/macropad_image.jpg"
import gopro from "../assets/prizes/gopro.jpg"
import grant from "../assets/prizes/grant_image.jpg"
import hardwareGrantPlaceholder from "../assets/prizes/hardware-grant-placeholder.svg"
// Placeholder tier data — swap items/hours/codenames for real reward-tier
// content later. Structure (hours, codename, items[]) is stable.
// `hours` is each item's flat hour cost (spendable currency), not a minimum
// unlock threshold — every item in a tier costs that tier's `hours` value.
export const prizeTiers = [
  {
    hours: 1,
    codename: 'LVL 1 CLEARANCE',
    items: [
      { id: 'keychain', name: 'One Key Keychain', image: keychain, desc: 'A tiny macropad keychain for shortcut energy.' },
      { id: 'hardware-grant', name: '$6.5/hr Hardware Grant', image: grant, desc: '$6.50 for every hour you log, straight to hardware.' },
      { id: 'general-grant', name: '$5.75/hr Upgrade Grant', image: grant, desc: "grant to upgrade your prize given you've already earned another one; read rules at ispy.hackclub.com/general_rules" },
    ],
  },
  {
    hours: 3,
    codename: 'LVL 2 CLEARANCE',
    items: [
      { id: 'domain-grant', name: '$20 Domain Grant', image: porkbun, desc: 'domains are cool' },
      { id: 'macropad', name: 'Four Key Macropad', image: macropad, desc: 'A satisfying four-button macro pad.' },
    ],
  },
  {
    hours: 15,
    codename: 'LVL 3 CLEARANCE',
    items: [
      { id: 'watch', name: 'Casio Watch', image: casioWatch, desc: 'sick watch to flex on people with (can switch for any watch that is 100 or less)' },
    ],
  },
  {
    hours: 25,
    codename: 'LVL 4 CLEARANCE',
    items: [
      { id: 'monitor', name: '144Hz Curved Monitor', image: monitorPlaceholder, desc: '144 hertz 27 inch curved monitor for whatever you do on your computer.' },
      { id: 'flipper-zero', name: 'Flipper Zero', image: flipperPlaceholder, desc: 'can do cool stuff.' },
    ],
  },
  {
    hours: 50,
    codename: 'LVL 5 CLEARANCE',
    items: [
      { id: 'gopro', name: 'GoPro HERO12 Black', image: gopro, desc: 'Nice mini-camera to document all your adventures. ' },
      { id: 'laptop', name: 'Thinkpad T14 (Gen 2)', image: laptopImage, desc: 'Laptop with decent specs. Core i5-1145G7, 16GB RAM, 256GB SSD' },
    ],
  },
]

// Homepage teaser highlights: one item each from the lowest, a middle, and
// the highest tier, so the preview reflects the full range without showing
// everything (full breakdown lives on /prizes).
export const highlightedPrizes = [
  {
    id: prizeTiers[0].items[0].id,
    name: prizeTiers[0].items[0].name,
    image: prizeTiers[0].items[0].image,
    codename: prizeTiers[0].codename,
  },
  {
    id: prizeTiers[2].items[0].id,
    name: prizeTiers[2].items[0].name,
    image: prizeTiers[2].items[0].image,
    codename: prizeTiers[2].codename,
  },
  {
    id: prizeTiers[4].items[0].id,
    name: prizeTiers[4].items[0].name,
    image: prizeTiers[4].items[0].image,
    codename: prizeTiers[4].codename,
  },
]

// Shared cost lookup used by both the dashboard cart UI and the submit
// endpoint — an item's cost is always its tier's `hours` value.
export function findPrize(prizeId) {
  for (const tier of prizeTiers) {
    const item = tier.items.find((i) => i.id === prizeId)
    if (item) return { item, tier, cost: tier.hours }
  }
  return null
}
