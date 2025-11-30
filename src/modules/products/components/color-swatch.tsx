import { type FC } from 'react'
import { cn } from '@/core/lib/utils'
import { type ColorSwatchProps } from '../interfaces/filter.interface'

const colorMap: Record<string, string> = {
  Black: 'bg-black',
  White: 'bg-white border-2 border-border',
  Red: 'bg-red-500',
  Blue: 'bg-blue-500',
  Green: 'bg-green-500',
  Yellow: 'bg-yellow-400',
  Purple: 'bg-purple-500',
  Orange: 'bg-orange-500',
}

export const ColorSwatch: FC<ColorSwatchProps> = ({ color, isSelected, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'relative h-8 w-8 rounded-full transition-all',
        colorMap[color] || 'bg-gray-500',
        isSelected && 'ring-2 ring-primary ring-offset-2'
      )}
      aria-label={`${color} color filter`}
      aria-pressed={isSelected}
    >
      {isSelected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className={cn(
              'h-4 w-4',
              color === 'White' || color === 'Yellow' ? 'text-black' : 'text-white'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </button>
  )
}
