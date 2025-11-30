import { type FC } from 'react'
import { Star } from 'lucide-react'
import { Checkbox } from '@/core/components/ui/checkbox'
import { type RatingFilterProps } from '../interfaces/filter.interface'

export const RatingFilter: FC<RatingFilterProps> = ({ rating, isSelected, onToggle }) => {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1.5 hover:opacity-80">
      <Checkbox checked={isSelected} onCheckedChange={onToggle} />
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-muted text-muted'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-foreground">& up</span>
      </div>
    </label>
  )
}
