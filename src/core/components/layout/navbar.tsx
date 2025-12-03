import { type FC } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCartItemCount } from "@/modules/cart/store/cart-store";

export const Navbar: FC = () => {
  const cartItemCount = useCartItemCount();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6">
        <Link to="/" className="text-xl font-bold">
          CGT Marketplace
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ShoppingCart className="size-4" />
            Cart
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};
