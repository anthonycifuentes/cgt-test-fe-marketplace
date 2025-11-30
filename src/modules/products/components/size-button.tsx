import { type FC } from 'react'
import { cn } from '@/core/lib/utils'
import { type SizeButtonProps } from '../interfaces/filter.interface'

export const SizeButton: FC<SizeButtonProps> = ({ size, isSelected, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'rounded-md border px-3 py-1.5 text-sm font-medium transition-all',
        isSelected
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-background text-foreground hover:border-primary/50'
      )}
      aria-label={`Size ${size} filter`}
      aria-pressed={isSelected}
    >
      {size}
    </button>
  )
}
