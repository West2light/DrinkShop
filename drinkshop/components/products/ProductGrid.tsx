
import ProductCard from "@/components/products/ProductCard"
import type { Product } from "@/lib/api"

interface ProductGridProps {
    products: Product[];
    viewMode: "grid" | "list";
}

export default function ProductGrid({ products, viewMode }: ProductGridProps) {
    return (
        <div
            className={`grid gap-4 lg:gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
        </div>
    )
}
