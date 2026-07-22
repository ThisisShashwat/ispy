import flipperZero from "../assets/prizes/flipper_zero_img.webp"
import monitor from '../assets/prizes/minotor_pic.avif'
import gopro from '../assets/prizes/gopro_pic.webp'

// Swap a prize's photo by replacing the file at its `image` import path
// (or pointing `image` at a new file) — no other code changes needed.
export const prizes = [
  {
    id: 'flipper-zero',
    name: 'Flipper Zero',
    image: flipperZero,
    clearanceLevel: 'LVL 2',
  },
  {
    id: 'monitor',
    name: '144 Hertz curved monitor',
    image: monitor,
    clearanceLevel: 'LVL 1',
  },
  {
    id: 'gopro',
    name: 'GoPro',
    image: gopro,
    clearanceLevel: 'LVL 3',
  },
]
