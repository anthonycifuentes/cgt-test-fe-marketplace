import { type FC } from 'react'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Badge } from '@/core/components/ui/badge'
import { Button } from '@/core/components/ui/button'
import { cn } from '@/core/lib/utils'
import { type ProductCardProps } from '../interfaces/product.interface'

export const ProductCard: FC<ProductCardProps> = ({
  product,
  className,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}) => {
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Sale Badge */}
        {product.onSale && (
          <Badge
            variant="destructive"
            className="absolute left-2 top-2"
          >
            Sale
          </Badge>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={cn(
            'absolute right-2 top-2 rounded-full bg-white p-2 shadow-md transition-all hover:scale-110',
            isInWishlist && 'bg-red-500'
          )}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={cn(
              'h-4 w-4',
              isInWishlist ? 'fill-white text-white' : 'text-gray-600'
            )}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-base leading-tight line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground text-xs">{product.category}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-xs">{product.rating}</span>
          <span className="text-muted-foreground text-xs">({product.reviewCount})</span>
        </div>

        {/* Price and Action */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="font-bold text-base">${product.price}</span>
            {product.onSale && (
              <span className="text-muted-foreground text-xs line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <Button
            onClick={() => onAddToCart(product.id)}
            size="sm"
            className="gap-1.5"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </article>
  )
}
