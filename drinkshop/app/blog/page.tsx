import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Eye } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

import { getAllBlogPosts } from "@/lib/api"
import BreadcrumbComponent from "@/components/breadcrumb/BreadcrumbComponent"

export default async function BlogPage() {
    // Fetch blog posts
    const blogPosts = await getAllBlogPosts().catch(() => [])

    return (
        <div className="min-h-screen bg-white">


            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4">
                <div className="container mx-auto px-4">
                    <BreadcrumbComponent
                        items={[
                            { label: "Trang chủ", href: "/" },
                            { label: "Blog" }, // current page, no href
                        ]}
                    />
                </div>
            </div>
            <h2 className="text-lg font-bold mb-4 ">BLOG
                <img src="/Image_Rudu/titleleft-dark.png" alt="arrow-trang-tri" />
            </h2>
            {/* Hero Section */}
            <div className="h-48 lg:h-64 bg-cover bg-center">
                <img
                    style={{ width: "100%", height: "auto", objectFit: "cover", maxHeight: "400px", }}
                    src="Image_Rudu/slide-1.jpg" alt="anh-banner" />
                <div className="container mx-auto px-4 py-6 lg:py-8">
                    <div className="text-center mb-8 lg:mb-12">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4">TIN TỨC & BÀI VIẾT</h2>
                        <img src="Image_Rudu/title-dark.png" alt="trang-tri"
                            style={{
                                width: "250px",
                                height: "auto",
                                maxHeight: "300px",
                                display: "block",
                                margin: "0px auto",
                                marginBottom: "10px",
                                justifyContent: "center",
                            }} />
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {blogPosts.length > 0
                        ? blogPosts.map((post) => (
                            <Card key={post.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                                <div className="relative">
                                    <Image
                                        src={post.image || "/placeholder.svg"}
                                        alt={post.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-yellow-500 text-black text-xs">{post.category}</Badge>
                                </div>
                                <CardContent className="p-4 lg:p-6">
                                    <Link href={`/blog/${post.id}`}>
                                        <h3 className="font-bold text-base lg:text-lg mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2 cursor-pointer">
                                            {post.title}
                                        </h3>
                                    </Link>

                                    <div className="flex flex-wrap items-center text-xs lg:text-sm text-gray-500 mb-3 gap-2 lg:gap-4">
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                                            <span>{new Date(post.date).toLocaleDateString("vi-VN")}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <User className="w-3 h-3 lg:w-4 lg:h-4" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                                            <span>{post.views}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                                    >
                                        Đọc thêm
                                    </Link>
                                </CardContent>
                            </Card>
                        ))
                        : // Skeleton loading for blog posts
                        Array(6)
                            .fill(0)
                            .map((_, i) => (
                                <Card key={i} className="overflow-hidden">
                                    <Skeleton className="w-full h-48" />
                                    <CardContent className="p-4 lg:p-6">
                                        <Skeleton className="h-6 w-3/4 mb-3" />
                                        <div className="flex items-center mb-3 space-x-4">
                                            <Skeleton className="h-4 w-20" />
                                            <Skeleton className="h-4 w-20" />
                                            <Skeleton className="h-4 w-16" />
                                        </div>
                                        <Skeleton className="h-4 w-full mb-1" />
                                        <Skeleton className="h-4 w-full mb-1" />
                                        <Skeleton className="h-4 w-2/3 mb-4" />
                                        <Skeleton className="h-4 w-24" />
                                    </CardContent>
                                </Card>
                            ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8 lg:mt-12">
                    <div className="flex items-center space-x-2">
                        <button
                            className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 hidden sm:block"
                            disabled
                        >
                            Trước
                        </button>
                        <button className="px-3 py-2 text-sm bg-black text-white rounded">1</button>
                        <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
                        <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 hidden sm:block">
                            3
                        </button>
                        <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 hidden sm:block">
                            Sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
