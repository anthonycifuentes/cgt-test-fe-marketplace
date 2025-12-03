import { type FC } from 'react'
import { Link } from '@tanstack/react-router'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/core/components/ui/button'
import { useCartStore, useCartSubtotal } from '../store/cart-store'
import { CartItemCard } from '../components/cart-item'
import { CartSummary } from '../components/cart-summary'
import { CouponForm } from '../components/coupon-form'

export const CartTemplate: FC = () => {
  const { items, couponCode, updateQuantity, removeItem, applyCoupon, removeCoupon } = useCartStore()
  const subtotal = useCartSubtotal()
  const tax = subtotal * 0.1
  const shipping = subtotal >= 100 ? 'free' : 15
  const shippingCost = shipping === 'free' ? 0 : shipping
  const total = subtotal + tax + shippingCost

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="mx-auto max-w-screen-2xl px-6 py-12">
          <div className="flex flex-col items-center justify-center py-24">
            <ShoppingCart className="size-24 text-muted-foreground/50" />
            <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild className="mt-6">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-screen-2xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <span className="text-muted-foreground">
            {items.length} {items.length === 1 ? 'Item' : 'Items'} in cart
          </span>
        </div>

        <div className="flex gap-8">
          {/* Cart Items */}
          <div className="flex-1 rounded-lg border border-border bg-card p-6">
            {items.map((item) => (
              <CartItemCard
                key={item.product.id}
                item={item}
                onUpdateQuantity={(quantity) => updateQuantity(item.product.id, quantity)}
                onRemove={() => removeItem(item.product.id)}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-6">
            <CouponForm
              onApply={applyCoupon}
              appliedCode={couponCode}
              onRemove={removeCoupon}
            />
            <CartSummary
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
