import { type FC, useMemo } from "react";
import { FilterSidebar } from "../components/filter-sidebar";
import { ProductGrid } from "../components/product-grid";
import { mockProducts } from "../data/mock-products";
import { useFilterStore } from "../store/filter-store";
import { type Product } from "../interfaces/product.interface";

const filterProducts = (
  products: Product[],
  filters: {
    categories: string[];
    brands: string[];
    minRating: number;
  }
): Product[] => {
  return products.filter((product) => {
    // Category filter
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }

    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }

    // Rating filter
    if (filters.minRating > 0 && product.rating < filters.minRating) {
      return false;
    }

    return true;
  });
};

export const ProductListingTemplate: FC = () => {
  const { categories, brands, minRating, wishlistIds, toggleWishlist } =
    useFilterStore();

  const filteredProducts = useMemo(
    () => filterProducts(mockProducts, { categories, brands, minRating }),
    [categories, brands, minRating]
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-screen-2xl px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <FilterSidebar />

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="mb-6">
              <h1 className="font-bold text-2xl">Products</h1>
              <p className="mt-2 text-muted-foreground text-sm">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"} found
              </p>
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={filteredProducts}
              onToggleWishlist={toggleWishlist}
              wishlistIds={wishlistIds}
            />
          </main>
        </div>
      </div>
    </div>
  );
};
