import { type FC } from 'react'
import { Button } from '@/core/components/ui/button'
import { Separator } from '@/core/components/ui/separator'
import { type CartSummaryProps } from '../interfaces/cart.interface'

export const CartSummary: FC<CartSummaryProps> = ({ subtotal, tax, shipping, total }) => {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold">Price Details</h3>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${subtotal.toLocaleString()}.00</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax 10%</span>
          <span className="font-medium">+${tax.toLocaleString()}.{(tax % 1).toFixed(2).slice(2)}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium">
            {shipping === 'free' ? 'Free Delivery' : `$${shipping.toLocaleString()}.00`}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-lg font-semibold">${total.toLocaleString()}.{((total % 1) * 100).toFixed(0).padStart(2, '0')}</span>
      </div>

      <Button className="mt-6 w-full bg-foreground text-background hover:bg-foreground/90">
        Confirm Payment
      </Button>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <span>We Accept:</span>
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-600">VISA</span>
          <span className="font-bold text-blue-500">P</span>
          <span className="flex">
            <span className="font-bold text-red-500">●</span>
            <span className="font-bold text-orange-500">●</span>
          </span>
        </div>
      </div>
    </div>
  )
}
