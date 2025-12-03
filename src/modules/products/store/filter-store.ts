import { create } from 'zustand'
import { type ProductBrand, type ProductCategory } from '../interfaces/product.interface'

interface FilterState {
  categories: ProductCategory[]
  brands: ProductBrand[]
  minRating: number
  openSections: Set<string>
  wishlistIds: Set<string>
}

interface FilterActions {
  toggleCategory: (category: ProductCategory) => void
  toggleBrand: (brand: ProductBrand) => void
  setMinRating: (rating: number) => void
  toggleSection: (section: string) => void
  toggleWishlist: (productId: string) => void
  clearFilters: () => void
}

type FilterStore = FilterState & FilterActions

const initialState: FilterState = {
  categories: [],
  brands: [],
  minRating: 0,
  openSections: new Set(['categories', 'brands', 'rating']),
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
      minRating: 0,
    }),
}))
