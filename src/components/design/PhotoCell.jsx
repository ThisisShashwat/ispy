import PriceTag from './PriceTag'
import { imgSrc } from '../../data/copy'

export default function PhotoCell({ src, alt, hours, leader = 20 }) {
  return (
    <div className="relative flex aspect-[4/3] items-center justify-center">
      <img
        src={imgSrc(src)}
        alt={alt}
        className="max-h-full max-w-full object-contain"
        style={{
          filter:
            'drop-shadow(0 1px 0 rgba(15,17,20,0.35)) drop-shadow(0 8px 12px rgba(15,17,20,0.16))',
        }}
      />
      {hours != null && (
        <PriceTag hours={hours} leader={leader} style={{ right: '4%', bottom: '2%' }} />
      )}
    </div>
  )
}
