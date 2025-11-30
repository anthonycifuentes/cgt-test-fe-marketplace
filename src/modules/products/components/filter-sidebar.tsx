import { type FC } from 'react'
import { Checkbox } from '@/core/components/ui/checkbox'
import { cn } from '@/core/lib/utils'
import { type FilterSidebarProps } from '../interfaces/filter.interface'
import { type ProductCategory, type ProductColor, type ProductSize } from '../interfaces/product.interface'
import { useFilterStore } from '../store/filter-store'
import { availableBrands } from '../data/mock-products'
import { FilterSection } from './filter-section'
import { ColorSwatch } from './color-swatch'
import { SizeButton } from './size-button'
import { RatingFilter } from './rating-filter'

const categories: ProductCategory[] = [
  'Clothing',
  'Shoes',
  'Accessories',
  'Sportswear',
  'Outerwear',
  'Formal Wear',
  'Casual Wear',
]

const colors: ProductColor[] = [
  'Black',
  'White',
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Purple',
  'Orange',
]

const sizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const ratings = [4, 3, 2, 1]

export const FilterSidebar: FC<FilterSidebarProps> = ({ className }) => {
  const {
    categories: selectedCategories,
    brands: selectedBrands,
    colors: selectedColors,
    sizes: selectedSizes,
    minRating,
    openSections,
    toggleCategory,
    toggleBrand,
    toggleColor,
    toggleSize,
    setMinRating,
    toggleSection,
  } = useFilterStore()

  return (
    <aside
      className={cn('w-64 space-y-0 rounded-lg border border-border bg-card p-6', className)}
    >
      <h2 className="mb-6 text-lg font-bold">Filters</h2>

      <FilterSection
        title="Categories"
        isOpen={openSections.has('categories')}
        onToggle={() => toggleSection('categories')}
      >
        {categories.map((category) => (
          <label key={category} className="flex cursor-pointer items-center gap-2 py-1.5 hover:opacity-80">
            <Checkbox
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => toggleCategory(category)}
            />
            <span className="text-sm">{category}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection
        title="Brands"
        isOpen={openSections.has('brands')}
        onToggle={() => toggleSection('brands')}
      >
        {availableBrands.map((brand) => (
          <label key={brand} className="flex cursor-pointer items-center gap-2 py-1.5 hover:opacity-80">
            <Checkbox
              checked={selectedBrands.includes(brand)}
              onCheckedChange={() => toggleBrand(brand)}
            />
            <span className="text-sm">{brand}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection
        title="Colors"
        isOpen={openSections.has('colors')}
        onToggle={() => toggleSection('colors')}
      >
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              isSelected={selectedColors.includes(color)}
              onToggle={() => toggleColor(color)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Sizes"
        isOpen={openSections.has('sizes')}
        onToggle={() => toggleSection('sizes')}
      >
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <SizeButton
              key={size}
              size={size}
              isSelected={selectedSizes.includes(size)}
              onToggle={() => toggleSize(size)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Rating"
        isOpen={openSections.has('rating')}
        onToggle={() => toggleSection('rating')}
      >
        {ratings.map((rating) => (
          <RatingFilter
            key={rating}
            rating={rating}
            isSelected={minRating === rating}
            onToggle={() => setMinRating(rating)}
          />
        ))}
      </FilterSection>
    </aside>
  )
}
