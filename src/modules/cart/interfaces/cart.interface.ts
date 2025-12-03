import { type Product } from '@/modules/products/interfaces/product.interface'

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  couponCode: string | null
}

export interface CartActions {
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  applyCoupon: (code: string) => void
  removeCoupon: () => void
  clearCart: () => void
}

export interface CartItemProps {
  item: CartItem
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export interface CartSummaryProps {
  subtotal: number
  tax: number
  shipping: number | 'free'
  total: number
}
