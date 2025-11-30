import { type ProductCategory, type ProductColor, type ProductSize } from './product.interface'

export interface ProductFilters {
  categories: ProductCategory[]
  brands: string[]
  colors: ProductColor[]
  sizes: ProductSize[]
  minRating: number
}

export interface FilterSectionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

export interface ColorSwatchProps {
  color: ProductColor
  isSelected: boolean
  onToggle: () => void
}

export interface SizeButtonProps {
  size: ProductSize
  isSelected: boolean
  onToggle: () => void
}

export interface RatingFilterProps {
  rating: number
  isSelected: boolean
  onToggle: () => void
}

export interface FilterSidebarProps {
  className?: string
}
