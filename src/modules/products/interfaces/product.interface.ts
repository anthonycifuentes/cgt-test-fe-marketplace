export interface Product {
  id: string
  name: string
  category: ProductCategory
  brand: ProductBrand
  price: number
  rating: number
  reviewCount: number
  imageUrl: string
  inStock: boolean
}

export type ProductCategory =
  | 'Phones'
  | 'Tablets'
  | 'Laptops'
  | 'Wearables'
  | 'Accessories'

export type ProductBrand =
  | 'Apple'
  | 'Samsung'
  | 'Google'
  | 'Sony'
  | 'Microsoft'
  | 'Dell'
  | 'Lenovo'

export interface ProductCardProps {
  product: Product
  className?: string
  onToggleWishlist: (productId: string) => void
  isInWishlist?: boolean
}

export interface ProductGridProps {
  products: Product[]
  onToggleWishlist: (productId: string) => void
  wishlistIds?: Set<string>
}
