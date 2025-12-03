import { create } from 'zustand'
import { type Product } from '@/modules/products/interfaces/product.interface'
import { type CartState, type CartActions } from '../interfaces/cart.interface'

type CartStore = CartState & CartActions

const initialState: CartState = {
  items: [],
  couponCode: null,
}

export const useCartStore = create<CartStore>((set) => ({
  ...initialState,

  addItem: (product: Product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.product.id === product.id)
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return {
        items: [...state.items, { product, quantity: 1 }],
      }
    }),

  removeItem: (productId: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),

  updateQuantity: (productId: string, quantity: number) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.product.id !== productId),
        }
      }
      return {
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      }
    }),

  applyCoupon: (code: string) =>
    set({ couponCode: code }),

  removeCoupon: () =>
    set({ couponCode: null }),

  clearCart: () =>
    set({ items: [], couponCode: null }),
}))

// Selector hooks
export const useCartItems = () => useCartStore((state) => state.items)
export const useCartItemCount = () =>
  useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0))
export const useCartSubtotal = () =>
  useCartStore((state) =>
    state.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  )
