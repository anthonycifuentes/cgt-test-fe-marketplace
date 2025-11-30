import { type FC } from 'react'
import { type ProductGridProps } from '../interfaces/product.interface'
import { ProductCard } from './product-card'

export const ProductGrid: FC<ProductGridProps> = ({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = new Set(),
}) => {
  if (products.length === 0) {
    return (
      <div className="flex min-h-96 items-center justify-center rounded-lg border border-dashed border-border">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">No products found</p>
          <p className="mt-2 text-muted-foreground text-sm">Try adjusting your filters</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isInWishlist={wishlistIds.has(product.id)}
        />
      ))}
    </div>
  )
}
