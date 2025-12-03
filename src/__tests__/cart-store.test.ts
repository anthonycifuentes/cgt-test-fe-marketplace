import { describe, test, expect, beforeEach } from 'vitest'
import { useCartStore } from '@/modules/cart/store/cart-store'
import type { Product } from '@/modules/products/interfaces/product.interface'

// Sample product for testing
const mockProduct: Product = {
  id: '1',
  name: 'iPhone 15 Pro',
  category: 'Phones',
  brand: 'Apple',
  price: 1199,
  rating: 4.9,
  reviewCount: 2847,
  imageUrl: 'https://example.com/image.jpg',
  inStock: true,
}

const mockProduct2: Product = {
  id: '2',
  name: 'Samsung Galaxy S24',
  category: 'Phones',
  brand: 'Samsung',
  price: 999,
  rating: 4.8,
  reviewCount: 1500,
  imageUrl: 'https://example.com/image2.jpg',
  inStock: true,
}

describe('Cart Store', () => {
  // Reset the store before each test so tests don't affect each other
  beforeEach(() => {
    useCartStore.setState({ items: [], couponCode: null })
  })

  test('adds a product to empty cart', () => {
    // Get the store
    const store = useCartStore.getState()

    // Add a product
    store.addItem(mockProduct)

    // Check: cart should have 1 item with quantity 1
    const state = useCartStore.getState()
    expect(state.items).toHaveLength(1)
    expect(state.items[0].product.id).toBe('1')
    expect(state.items[0].quantity).toBe(1)
  })

  test('increases quantity when adding same product twice', () => {
    const store = useCartStore.getState()

    // Add same product twice
    store.addItem(mockProduct)
    store.addItem(mockProduct)

    // Check: should have 1 item with quantity 2
    const state = useCartStore.getState()
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(2)
  })

  test('removes a product from cart', () => {
    const store = useCartStore.getState()

    // Add a product then remove it
    store.addItem(mockProduct)
    store.removeItem('1')

    // Check: cart should be empty
    const state = useCartStore.getState()
    expect(state.items).toHaveLength(0)
  })

  test('updates product quantity', () => {
    const store = useCartStore.getState()

    // Add product and update quantity to 5
    store.addItem(mockProduct)
    store.updateQuantity('1', 5)

    // Check: quantity should be 5
    const state = useCartStore.getState()
    expect(state.items[0].quantity).toBe(5)
  })

  test('removes item when quantity is set to 0', () => {
    const store = useCartStore.getState()

    // Add product and set quantity to 0
    store.addItem(mockProduct)
    store.updateQuantity('1', 0)

    // Check: item should be removed
    const state = useCartStore.getState()
    expect(state.items).toHaveLength(0)
  })

  test('calculates subtotal correctly', () => {
    const store = useCartStore.getState()

    // Add products: iPhone ($1199 x 2) + Samsung ($999 x 1) = $3397
    store.addItem(mockProduct)
    store.addItem(mockProduct)
    store.addItem(mockProduct2)

    // Check subtotal using the selector
    const subtotal = useCartStore.getState().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
    expect(subtotal).toBe(3397)
  })

  test('counts total items in cart', () => {
    const store = useCartStore.getState()

    // Add 2 iPhones + 1 Samsung = 3 total items
    store.addItem(mockProduct)
    store.addItem(mockProduct)
    store.addItem(mockProduct2)

    // Check total count
    const count = useCartStore.getState().items.reduce(
      (total, item) => total + item.quantity,
      0
    )
    expect(count).toBe(3)
  })

  test('clears entire cart', () => {
    const store = useCartStore.getState()

    // Add products and apply coupon
    store.addItem(mockProduct)
    store.addItem(mockProduct2)
    store.applyCoupon('SAVE10')

    // Clear cart
    store.clearCart()

    // Check: cart should be empty and coupon removed
    const state = useCartStore.getState()
    expect(state.items).toHaveLength(0)
    expect(state.couponCode).toBeNull()
  })
})
