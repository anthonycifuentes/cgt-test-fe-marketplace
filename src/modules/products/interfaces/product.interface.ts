export interface Product {
  id: string
  name: string
  category: string
  brand: string
  description: string
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  imageUrl: string
  colors: string[]
  sizes: ProductSize[]
  inStock: boolean
  onSale: boolean
}

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export type ProductCategory =
  | 'Clothing'
  | 'Shoes'
  | 'Accessories'
  | 'Sportswear'
  | 'Outerwear'
  | 'Formal Wear'
  | 'Casual Wear'

export type ProductColor =
  | 'Black'
  | 'White'
  | 'Red'
  | 'Blue'
  | 'Green'
  | 'Yellow'
  | 'Purple'
  | 'Orange'

export interface ProductCardProps {
  product: Product
  className?: string
  onAddToCart: (productId: string) => void
  onToggleWishlist: (productId: string) => void
  isInWishlist?: boolean
}

export interface ProductGridProps {
  products: Product[]
  onAddToCart: (productId: string) => void
  onToggleWishlist: (productId: string) => void
  wishlistIds?: Set<string>
}
