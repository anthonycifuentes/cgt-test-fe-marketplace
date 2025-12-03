import { type ProductBrand, type ProductCategory } from './product.interface'

export interface ProductFilters {
  categories: ProductCategory[]
  brands: ProductBrand[]
  minRating: number
}

export interface FilterSectionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

export interface RatingFilterProps {
  rating: number
  isSelected: boolean
  onToggle: () => void
}

export interface FilterSidebarProps {
  className?: string
}
