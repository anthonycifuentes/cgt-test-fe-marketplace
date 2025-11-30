import { createFileRoute } from '@tanstack/react-router'
import { ProductListingTemplate } from '@/modules/products/templates/product-listing-template'

export const Route = createFileRoute('/')({
  component: ProductListingTemplate,
})
