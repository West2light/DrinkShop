import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, User, Eye, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

import { getBlogPostById, getAllBlogPosts } from "@/lib/api"
import CommentsSection from "./commentSection"
import BreadcrumbComponent from "@/components/breadcrumb/BreadcrumbComponent"

// Tạo các tham số tĩnh cho trang
export async function generateStaticParams() {
    try {
        const posts = await getAllBlogPosts()
        return posts.map((post) => ({
            id: post.id.toString(),
        }))
    } catch (error) {
        console.error("Error generating static params for blog posts:", error)
        return []
    }
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
    try {
        const post = await getBlogPostById(Number.parseInt(params.id))

        // Tạo mảng breadcrumb items
        const breadcrumbItems = [
            { label: "Trang chủ", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title }  // Item cuối không có href
        ];

        return (
            <div className="min-h-screen bg-white">
                {/* Breadcrumb */}
                <div className="bg-gray-50 py-4">
                    <div className="container mx-auto px-4">
                        <BreadcrumbComponent items={breadcrumbItems} />
                    </div>
                </div>

                <div className="container mx-auto px-4 py-6 lg:py-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <div className="mb-6">
                            <Link href="/blog">
                                <Button variant="outline" className="bg-transparent">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Quay lại Blog
                                </Button>
                            </Link>
                        </div>

                        {/* Blog Header */}
                        <div className="mb-6 lg:mb-8">
                            <h1 className="text-2xl lg:text-3xl font-bold mb-4">{post.title}</h1>
                            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 lg:mb-6 gap-2 lg:gap-4">
                                <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(post.date).toLocaleDateString("vi-VN")}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <User className="w-4 h-4" />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{post.views} lượt xem</span>
                                </div>
                                <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">{post.category}</div>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="mb-6 lg:mb-8">
                            <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                width={800}
                                height={450}
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Blog Content */}
                        <div className="prose max-w-none">
                            {post.content.split("\n\n").map((paragraph, index) => (
                                <p key={index} className="mb-4 text-gray-700 leading-relaxed text-sm lg:text-base">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Share Section */}
                        <div className="mt-8 lg:mt-12 pt-6 border-t">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="font-medium">Chia sẻ bài viết:</div>
                                <div className="flex space-x-2">
                                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                                        Facebook
                                    </button>
                                    <button className="bg-blue-400 text-white px-3 py-1 rounded text-sm hover:bg-blue-500 transition-colors">
                                        Twitter
                                    </button>
                                    <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                                        Pinterest
                                    </button>
                                </div>
                            </div>
                        </div>

                        <CommentsSection />

                        {/* Back to Blog */}
                        <div className="mt-6 lg:mt-8 text-center">
                            <Link href="/blog">
                                <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Quay lại Blog
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    } catch (error) {
        console.error("Error fetching blog post:", error)
        notFound()
    }
}