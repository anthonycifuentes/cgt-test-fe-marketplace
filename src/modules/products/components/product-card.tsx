import { type FC } from 'react'
import { Heart, Star } from 'lucide-react'
import { cn } from '@/core/lib/utils'
import { type ProductCardProps } from '../interfaces/product.interface'

export const ProductCard: FC<ProductCardProps> = ({
  product,
  className,
  onToggleWishlist,
  isInWishlist = false,
}) => {
  return (
    <article
      className={cn(
        'group flex flex-col gap-6 rounded-xl border border-border bg-card p-6 shadow-none transition-all hover:shadow-lg',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative shrink-0 overflow-hidden rounded-md">
        <a href="#">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          className={cn(
            'absolute top-3.5 right-2.5 rounded-full p-2 shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
            isInWishlist ? 'bg-primary' : 'bg-background'
          )}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={cn(
              'size-4',
              isInWishlist ? 'stroke-primary-foreground' : 'stroke-current'
            )}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-1 flex-col justify-between gap-2">
          <a href="#">
            <h3 className="text-xl font-medium">{product.name}</h3>
          </a>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm border-transparent bg-amber-600 px-2 py-0.5 text-xs font-medium text-white dark:bg-amber-400/60">
              <Star className="size-3" aria-hidden="true" />
              {product.rating}
            </span>
            <a href="#" className="text-muted-foreground font-medium underline">
              {product.reviewCount.toLocaleString()} Reviews
            </a>
          </div>
        </div>

        {/* Price and Buy Button */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold">${product.price.toLocaleString()}.00</span>
          <button
            type="button"
            className="rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Buy
          </button>
        </div>
      </div>
    </article>
  )
}
