import { createFileRoute } from '@tanstack/react-router'
import { CartTemplate } from '@/modules/cart/templates/cart-template'

export const Route = createFileRoute('/cart')({
  component: CartTemplate,
})
