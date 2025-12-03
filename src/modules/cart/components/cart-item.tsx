import { type FC } from 'react'
import { Clock, Trash2 } from 'lucide-react'
import { Checkbox } from '@/core/components/ui/checkbox'
import { type CartItemProps } from '../interfaces/cart.interface'

export const CartItemCard: FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item

  return (
    <div className="flex items-start gap-4 border-b border-border py-6 last:border-b-0">
      {/* Checkbox and Image */}
      <div className="relative">
        <Checkbox className="absolute -left-1 -top-1 z-10" defaultChecked />
        <div className="size-24 overflow-hidden rounded-lg bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="size-full object-cover"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-muted-foreground text-sm">Category: {product.category}</p>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Clock className="size-4" />
          <span>7 days return Available</span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center">
        <select
          value={quantity}
          onChange={(e) => onUpdateQuantity(Number(e.target.value))}
          className="h-10 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="w-28 text-right">
        <span className="text-xl font-semibold">${(product.price * quantity).toLocaleString()}.00</span>
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="p-2 text-muted-foreground transition-colors hover:text-destructive"
        aria-label="Remove item"
      >
        <Trash2 className="size-5" />
      </button>
    </div>
  )
}
