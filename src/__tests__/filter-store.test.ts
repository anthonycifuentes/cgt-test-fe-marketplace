import { describe, test, expect, beforeEach } from 'vitest'
import { useFilterStore } from '@/modules/products/store/filter-store'

describe('Filter Store', () => {
  // Reset the store before each test
  beforeEach(() => {
    useFilterStore.setState({
      categories: [],
      brands: [],
      minRating: 0,
      openSections: new Set(['categories', 'brands', 'rating']),
      wishlistIds: new Set(),
    })
  })

  test('toggles category filter on', () => {
    const store = useFilterStore.getState()

    // Toggle "Phones" category on
    store.toggleCategory('Phones')

    // Check: Phones should be in the categories array
    const state = useFilterStore.getState()
    expect(state.categories).toContain('Phones')
    expect(state.categories).toHaveLength(1)
  })

  test('toggles category filter off', () => {
    const store = useFilterStore.getState()

    // Toggle on then off
    store.toggleCategory('Phones')
    store.toggleCategory('Phones')

    // Check: categories should be empty
    const state = useFilterStore.getState()
    expect(state.categories).not.toContain('Phones')
    expect(state.categories).toHaveLength(0)
  })

  test('toggles brand filter on and off', () => {
    const store = useFilterStore.getState()

    // Toggle Apple on
    store.toggleBrand('Apple')
    expect(useFilterStore.getState().brands).toContain('Apple')

    // Toggle Apple off
    store.toggleBrand('Apple')
    expect(useFilterStore.getState().brands).not.toContain('Apple')
  })

  test('sets minimum rating filter', () => {
    const store = useFilterStore.getState()

    // Set minimum rating to 4
    store.setMinRating(4)

    // Check: minRating should be 4
    const state = useFilterStore.getState()
    expect(state.minRating).toBe(4)
  })

  test('clears rating when clicking same value', () => {
    const store = useFilterStore.getState()

    // Set rating to 4, then click 4 again
    store.setMinRating(4)
    store.setMinRating(4)

    // Check: rating should be cleared (0)
    const state = useFilterStore.getState()
    expect(state.minRating).toBe(0)
  })

  test('adds product to wishlist', () => {
    const store = useFilterStore.getState()

    // Add product with id "1" to wishlist
    store.toggleWishlist('1')

    // Check: product should be in wishlist
    const state = useFilterStore.getState()
    expect(state.wishlistIds.has('1')).toBe(true)
  })

  test('removes product from wishlist', () => {
    const store = useFilterStore.getState()

    // Add then remove from wishlist
    store.toggleWishlist('1')
    store.toggleWishlist('1')

    // Check: product should not be in wishlist
    const state = useFilterStore.getState()
    expect(state.wishlistIds.has('1')).toBe(false)
  })

  test('clears all filters', () => {
    const store = useFilterStore.getState()

    // Set some filters
    store.toggleCategory('Phones')
    store.toggleBrand('Apple')
    store.setMinRating(4)

    // Clear all filters
    store.clearFilters()

    // Check: all filters should be reset
    const state = useFilterStore.getState()
    expect(state.categories).toHaveLength(0)
    expect(state.brands).toHaveLength(0)
    expect(state.minRating).toBe(0)
  })
})
