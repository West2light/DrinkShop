"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Eye } from "lucide-react"
import type { BlogPost } from "@/lib/api"
import BlogCardSkeleton from "@/components/products/BlogCardSkeleton"
import CustomPagination from "@/components/pagination/CustomPagination"
import { useState } from "react"

interface BlogPageClientProps {
    blogPosts: BlogPost[]
}

const POSTS_PER_PAGE = 6

export default function BlogPageClient({ blogPosts }: BlogPageClientProps) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE)
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    const currentPosts = blogPosts.slice(startIndex, endIndex)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {currentPosts.length > 0
                    ? currentPosts.map((post) => (
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
                            <BlogCardSkeleton key={i} />
                        ))}
            </div>

            {/* Pagination - only show if there are multiple pages */}
            {totalPages > 1 && (
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    )
}
