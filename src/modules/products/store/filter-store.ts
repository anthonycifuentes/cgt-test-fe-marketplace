import { create } from 'zustand'
import { type ProductCategory, type ProductColor, type ProductSize } from '../interfaces/product.interface'

interface FilterState {
  categories: ProductCategory[]
  brands: string[]
  colors: ProductColor[]
  sizes: ProductSize[]
  minRating: number
  openSections: Set<string>
  wishlistIds: Set<string>
}

interface FilterActions {
  toggleCategory: (category: ProductCategory) => void
  toggleBrand: (brand: string) => void
  toggleColor: (color: ProductColor) => void
  toggleSize: (size: ProductSize) => void
  setMinRating: (rating: number) => void
  toggleSection: (section: string) => void
  toggleWishlist: (productId: string) => void
  clearFilters: () => void
}

type FilterStore = FilterState & FilterActions

const initialState: FilterState = {
  categories: [],
  brands: [],
  colors: [],
  sizes: [],
  minRating: 0,
  openSections: new Set(['categories', 'brands', 'colors', 'sizes', 'rating']),
  wishlistIds: new Set(),
}

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,

  toggleCategory: (category) =>
    set((state) => ({
      categories: state.categories.includes(category)
        ? state.categories.filter((c) => c !== category)
        : [...state.categories, category],
    })),

  toggleBrand: (brand) =>
    set((state) => ({
      brands: state.brands.includes(brand)
        ? state.brands.filter((b) => b !== brand)
        : [...state.brands, brand],
    })),

  toggleColor: (color) =>
    set((state) => ({
      colors: state.colors.includes(color)
        ? state.colors.filter((c) => c !== color)
        : [...state.colors, color],
    })),

  toggleSize: (size) =>
    set((state) => ({
      sizes: state.sizes.includes(size)
        ? state.sizes.filter((s) => s !== size)
        : [...state.sizes, size],
    })),

  setMinRating: (rating) =>
    set((state) => ({
      minRating: state.minRating === rating ? 0 : rating,
    })),

  toggleSection: (section) =>
    set((state) => {
      const newOpenSections = new Set(state.openSections)
      if (newOpenSections.has(section)) {
        newOpenSections.delete(section)
      } else {
        newOpenSections.add(section)
      }
      return { openSections: newOpenSections }
    }),

  toggleWishlist: (productId) =>
    set((state) => {
      const newWishlistIds = new Set(state.wishlistIds)
      if (newWishlistIds.has(productId)) {
        newWishlistIds.delete(productId)
      } else {
        newWishlistIds.add(productId)
      }
      return { wishlistIds: newWishlistIds }
    }),

  clearFilters: () =>
    set({
      categories: [],
      brands: [],
      colors: [],
      sizes: [],
      minRating: 0,
    }),
}))
