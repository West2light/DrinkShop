"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List } from "lucide-react"
import ProductCard from "@/components/products/product-card"
import BreadcrumbComponent from "@/components/breadcrumb/BreadcrumbComponent"
import { products } from "@/lib/products"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("default")

  // Set category from URL params when component mounts
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      setSelectedCategory(decodeURIComponent(categoryFromUrl))
    }
  }, [searchParams])

  const categories = [
    { name: "Tất cả", value: "all", count: products.length },
    {
      name: "Rượu Vang Đỏ",
      value: "Rượu Vang Đỏ",
      count: products.filter((p) => p.category === "Rượu Vang Đỏ").length,
    },
    {
      name: "Rượu Vang Trắng",
      value: "Rượu Vang Trắng",
      count: products.filter((p) => p.category === "Rượu Vang Trắng").length,
    },
    { name: "Champagne", value: "Champagne", count: products.filter((p) => p.category === "Champagne").length },
    {
      name: "Rượu Vang Rosé",
      value: "Rượu Vang Rosé",
      count: products.filter((p) => p.category === "Rượu Vang Rosé").length,
    },
    {
      name: "Rượu Vang Ngọt",
      value: "Rượu Vang Ngọt",
      count: products.filter((p) => p.category === "Rượu Vang Ngọt").length,
    },
  ]

  const tags = ["Rượu Ngoại", "Tết", "Phụ kiện", "Cao cấp", "Giá tốt", "Ấn tượng", "Thơm ngon", "Tết mới", "Đặc biệt"]

  // Filter and sort products
  let filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number.parseInt(a.price.replace(/\./g, "")) - Number.parseInt(b.price.replace(/\./g, "")),
    )
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number.parseInt(b.price.replace(/\./g, "")) - Number.parseInt(a.price.replace(/\./g, "")),
    )
  } else if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
  }

  // Prepare breadcrumb items
  const breadcrumbItems: Array<{ label: string, href?: string }> = [
    { label: "Trang chủ", href: "/" }
  ];

  if (selectedCategory !== "all") {
    // Khi có category được chọn, "Sản phẩm" là link và category là trang hiện tại
    breadcrumbItems.push({ label: "Sản phẩm", href: "/products" });
    breadcrumbItems.push({ label: selectedCategory });
  } else {
    // Khi không có category (all), "Sản phẩm" là trang hiện tại
    breadcrumbItems.push({ label: "Sản phẩm" });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <BreadcrumbComponent items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative overflow-hidden">
        <img
          style={{
            width: "100%", height: "auto",
            maxHeight: "400px", objectFit: "cover"
          }}
          src="/Image_Rudu/slide-3.jpg"
          alt="Banner rượu vang cao cấp"
        />
      </div>

      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            {/* Categories */}
            <div className="mb-6 lg:mb-8">
              <h3 className="text-lg font-bold mb-4 border-b pb-2">DANH MỤC SẢN PHẨM
                <img src="/Image_Rudu/titleleft-dark.png" alt="arrow-trang-tri" />
              </h3>

              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setSelectedCategory(category.value)}
                      className={`text-sm hover:text-yellow-600 flex justify-between w-full text-left py-1 ${selectedCategory === category.value ? "text-yellow-600 font-medium" : "text-gray-600"
                        }`}
                    >
                      <span>{category.name}</span>
                      <span>({category.count})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Count */}
            <div className="mb-6 lg:mb-8 hidden lg:block">
              <h3 className="text-lg font-bold mb-4 border-b pb-2">SO SÁNH SẢN PHẨM
                <img src="/Image_Rudu/titleleft-dark.png" alt="arrow-trang-tri" />
              </h3>
              <p className="text-sm text-gray-600">Bạn chưa có sản phẩm nào để so sánh</p>
            </div>

            {/* Tags */}
            <div className="mb-6 lg:mb-8">
              <h3 className="text-lg font-bold mb-4 border-b pb-2">TAG SẢN PHẨM
                <img src="/Image_Rudu/titleleft-dark.png" alt="arrow-trang-tri" />
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="cursor-pointer hover:bg-yellow-100 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Promotional Banner */}
            <div className="mb-6 lg:mb-8 hidden lg:block">

              <img src="/Image_Rudu/introduction.jpg" alt="Promotional Banner" />

            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Hiển thị 1-{filteredProducts.length} của {filteredProducts.length} kết quả
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Mặc định</SelectItem>
                    <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                    <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                    <SelectItem value="name">Tên A-Z</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-4 lg:gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled className="hidden sm:inline-flex bg-transparent">
                  Trước
                </Button>
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  2
                </Button>
                <Button variant="outline" size="sm" className="hidden sm:inline-flex bg-transparent">
                  3
                </Button>
                <Button variant="outline" size="sm" className="hidden sm:inline-flex bg-transparent">
                  Sau
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
