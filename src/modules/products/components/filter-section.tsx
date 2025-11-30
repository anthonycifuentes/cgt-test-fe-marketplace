import { type FC } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/core/lib/utils'
import { type FilterSectionProps } from '../interfaces/filter.interface'

export const FilterSection: FC<FilterSectionProps> = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-border py-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left transition-colors hover:text-muted-foreground"
        aria-expanded={isOpen}
      >
        <h3 className="font-semibold text-sm">{title}</h3>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  )
}
