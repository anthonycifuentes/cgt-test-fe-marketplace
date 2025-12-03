import { type FC, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/core/components/ui/button";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(
    () => filterProducts(mockProducts, { categories, brands, minRating }),
    [categories, brands, minRating]
  );

  const activeFiltersCount =
    categories.length + brands.length + (minRating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex gap-6 lg:gap-8">
          {/* Mobile Filter Overlay */}
          {isFilterOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          {/* Filters Sidebar - Hidden on mobile, shown on lg+ */}
          <div
            className={`
              fixed inset-y-0 left-0 z-50 w-72 transform bg-background transition-transform duration-300 ease-in-out lg:relative lg:z-0 lg:block lg:w-64 lg:transform-none
              ${isFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            <div className="flex h-full flex-col">
              {/* Mobile close button */}
              <div className="flex items-center justify-between border-b p-4 lg:hidden">
                <span className="font-semibold">Filters</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="size-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 lg:p-0">
                <FilterSidebar />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-bold sm:text-2xl">Products</h1>
                <p className="mt-1 text-sm text-muted-foreground sm:mt-2">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"} found
                </p>
              </div>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                className="flex items-center gap-2 lg:hidden"
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal className="size-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
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
