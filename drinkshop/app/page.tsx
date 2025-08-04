import FeaturedProduct from "@/components/products/featured-product";
import ProductCard from "@/components/products/product-card";
import TestimonialCard from "@/components/products/testimonial-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    getAbout,
    getBestSellers,
    getFeatured,
    getNewProducts,
    getRecentBlogPosts,
    getTestimonials,
} from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
    // Fetch data in parallel
    const [newProducts, bestSellers, blogPosts, testimonials, about, featured] =
        await Promise.all([
            getNewProducts().catch(() => []),
            getBestSellers().catch(() => []),
            getRecentBlogPosts().catch(() => []),
            getTestimonials().catch(() => []),
            getAbout().catch(() => ({
                title: "GIỚI THIỆU",
                content:
                    "Chào mừng đến với DinkShop - nơi cung cấp những chai rượu vang tuyệt hảo từ khắp nơi trên thế giới.",
                image: "/Image_Rudu/df3218bb45274009c6c3d5de8a6b98bf.jpg",
            })),
            getFeatured().catch(() => null),
        ]);

    const galleryData = [
        {
            id: 1,
            src: "/Image_Rudu/47bb1d096966d29c98926a156318c767.jpg",
            alt: "Wine barrels in cellar",
            gridClass: "col-span-6 md:col-span-3 row-span-2",
            width: 400,
            height: 400,
        },
        {
            id: 2,
            src: "/Image_Rudu/Depositphotos_6971969_original-1240x698.jpg",
            alt: "RUOU wine cellar",
            gridClass: "col-span-6 md:col-span-6 row-span-2",
            width: 600,
            height: 400,
        },
        {
            id: 3,
            src: "/Image_Rudu/Depositphotos_3010981_original1.jpg",
            alt: "Fresh green grapes",
            gridClass: "col-span-6 md:col-span-3 row-span-2",
            width: 400,
            height: 400,
        },
        {
            id: 4,
            src: "/Image_Rudu/product.jpg",
            alt: "White grapes with wine bottle",
            gridClass: "col-span-6 md:col-span-3 row-span-2",
            width: 400,
            height: 400,
        },
        {
            id: 5,
            src: "/Image_Rudu/8bd367294fd54ff78565e6a73329e848.jpg",
            alt: "Wine glass in vineyard",
            gridClass: "col-span-6 md:col-span-3 row-span-2",
            width: 400,
            height: 400,
        },
        {
            id: 6,
            src: "/Image_Rudu/Depositphotos_3010981_original1.jpg",
            alt: "Wine cork and accessories",
            gridClass: "col-span-6 md:col-span-3 row-span-2",
            width: 400,
            height: 400,
        },
        {
            id: 7,
            src: "/Image_Rudu/slide-1-2050x898.jpg",
            alt: "Wine bottles collection",
            gridClass: "col-span-6 md:col-span-3 row-span-2",
            width: 400,
            height: 400,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* About Section */}
            <section className="py-12 lg:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 lg:mb-12">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-1">
                            {about.title}
                        </h2>
                        <Image
                            className="block mx-auto"
                            alt="Hinhf anh"
                            src="/Image_Rudu/title-dark.png"
                            width={200}
                            height={20}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <Image
                                src={
                                    "/Image_Rudu/df3218bb45274009c6c3d5de8a6b98bf.jpg"
                                }
                                alt="Wine grapes"
                                width={600}
                                height={400}
                                className="rounded-lg w-full h-[300px] object-contain"
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <p className="text-gray-700 leading-relaxed mb-6 text-sm lg:text-base">
                                {about.content}
                            </p>
                            <Link href="/about">
                                <Button className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
                                    ĐỌC THÊM
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Product */}
            <section
                className="py-12 lg:py-16 bg-cover bg-center relative"
                style={{
                    backgroundImage:
                        "url('/placeholder.svg?height=600&width=1200')",
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <div className="container mx-auto px-4 relative z-10">
                    {featured ? (
                        <FeaturedProduct product={featured} />
                    ) : (
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 lg:p-8 max-w-sm lg:max-w-md mx-auto text-center">
                            <Skeleton className="h-8 w-20 mx-auto mb-4" />
                            <Skeleton className="h-48 lg:h-64 w-full mx-auto mb-4" />
                            <Skeleton className="h-6 w-40 mx-auto mb-2" />
                            <Skeleton className="h-8 w-32 mx-auto mb-4" />
                            <Skeleton className="h-10 w-full mb-4" />
                            <div className="grid grid-cols-4 gap-2">
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* New Products */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 lg:mb-12">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                            SẢN PHẨM MỚI
                        </h2>
                        <Image
                            className="block mx-auto"
                            alt="Hinhf anh"
                            src="/Image_Rudu/title-dark.png"
                            width={200}
                            height={20}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {newProducts.length > 0
                            ? newProducts.map((product) => (
                                  <ProductCard
                                      key={product.id}
                                      product={product}
                                      badge="MỚI"
                                      badgeColor="bg-green-500"
                                  />
                              ))
                            : // Skeleton loading for products
                              Array(4)
                                  .fill(0)
                                  .map((_, i) => (
                                      <Card
                                          key={i}
                                          className="group hover:shadow-lg transition-shadow"
                                      >
                                          <CardContent className="p-4">
                                              <Skeleton className="w-full h-48 lg:h-64 mb-4" />
                                              <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                                              <Skeleton className="h-5 w-1/2 mx-auto mb-4" />
                                              <Skeleton className="h-10 w-full" />
                                          </CardContent>
                                      </Card>
                                  ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/products">
                            <Button
                                variant="outline"
                                className="bg-transparent"
                            >
                                XEM TẤT CẢ SẢN PHẨM
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Image_Gallery */}
            <section className="py-12 lg:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    {/* Gallery Grid với layout tùy chỉnh */}
                    <div className="grid grid-cols-12 grid-rows-4 gap-2 h-[600px] lg:h-[800px]">
                        {galleryData.map((image) => (
                            <div key={image.id} className={image.gridClass}>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={image.width}
                                    height={image.height}
                                    className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 lg:mb-12">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                            SẢN PHẨM BÁN CHẠY
                        </h2>
                        <Image
                            className="block mx-auto"
                            alt="Hinhf anh"
                            src="/Image_Rudu/title-dark.png"
                            width={200}
                            height={20}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {bestSellers.length > 0
                            ? bestSellers.map((product) => (
                                  <ProductCard
                                      key={product.id}
                                      product={product}
                                  />
                              ))
                            : // Skeleton loading for products
                              Array(4)
                                  .fill(0)
                                  .map((_, i) => (
                                      <Card
                                          key={i}
                                          className="group hover:shadow-lg transition-shadow"
                                      >
                                          <CardContent className="p-4">
                                              <Skeleton className="w-full h-48 lg:h-64 mb-4" />
                                              <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                                              <Skeleton className="h-5 w-1/2 mx-auto mb-4" />
                                              <Skeleton className="h-10 w-full" />
                                          </CardContent>
                                      </Card>
                                  ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/products">
                            <Button
                                variant="outline"
                                className="bg-transparent"
                            >
                                XEM TẤT CẢ SẢN PHẨM
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-12 lg:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 lg:mb-12">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                            TIN TỨC & BLOG
                        </h2>
                        <Image
                            className="block mx-auto"
                            alt="Hinhf anh"
                            src="/Image_Rudu/title-dark.png"
                            width={200}
                            height={20}
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        {blogPosts.length > 0
                            ? blogPosts.map((post) => (
                                  <Card
                                      key={post.id}
                                      className="overflow-hidden hover:shadow-lg transition-shadow"
                                  >
                                      <Image
                                          src={post.image|| "/placeholder.svg"}
                                          alt={post.title}
                                          width={400}
                                          height={250}
                                          className="w-full h-48 object-cover"
                                      />
                                      <CardContent className="p-4 lg:p-6">
                                          <Link href={`/blog/${post.id}`}>
                                              <h3 className="font-bold text-lg mb-2 hover:text-yellow-600 transition-colors cursor-pointer">
                                                  {post.title}
                                              </h3>
                                          </Link>
                                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                              {post.excerpt}
                                          </p>
                                          <Link
                                              href={`/blog/${post.id}`}
                                              className="text-yellow-600 hover:underline text-sm"
                                          >
                                              Đọc thêm
                                          </Link>
                                      </CardContent>
                                  </Card>
                              ))
                            : // Skeleton loading for blog posts
                              Array(2)
                                  .fill(0)
                                  .map((_, i) => (
                                      <Card key={i} className="overflow-hidden">
                                          <Skeleton className="w-full h-48" />
                                          <CardContent className="p-4 lg:p-6">
                                              <Skeleton className="h-6 w-3/4 mb-2" />
                                              <Skeleton className="h-4 w-full mb-1" />
                                              <Skeleton className="h-4 w-full mb-1" />
                                              <Skeleton className="h-4 w-2/3 mb-4" />
                                              <Skeleton className="h-4 w-24" />
                                          </CardContent>
                                      </Card>
                                  ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/blog">
                            <Button
                                variant="outline"
                                className="bg-transparent"
                            >
                                XEM TẤT CẢ BÀI VIẾT
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Customer Section */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 lg:mb-12">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                            KHÁCH HÀNG NÓI GÌ
                        </h2>
                        <div className="w-16 h-1 bg-yellow-600 mx-auto"></div>
                    </div>
                    {testimonials.length > 0 ? (
                        <TestimonialCard testimonial={testimonials[0]} />
                    ) : (
                        <div className="bg-yellow-100 rounded-lg p-6 lg:p-8 max-w-md mx-auto text-center">
                            <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                            <Skeleton className="h-4 w-3/4 mx-auto mb-1" />
                            <Skeleton className="h-4 w-2/3 mx-auto mb-4" />
                            <Skeleton className="h-5 w-1/3 mx-auto mb-1" />
                            <Skeleton className="h-4 w-1/4 mx-auto" />
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
