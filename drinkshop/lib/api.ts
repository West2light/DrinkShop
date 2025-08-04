import { API_BASE_URL } from "./config"

// Địa chỉ của JSON server
const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3001"

// Hàm helper để fetch data 
async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return (await response.json()) as T
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    throw error
  }
}

// Interfaces cho các loại dữ liệu
export interface Slide {
  id: number
  image: string
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
}

export interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  category: string
  description: string
  rating: number
  reviews: number
  inStock: boolean
  features: string[]
}

export interface Category {
  id: number
  name: string
  slug: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  views: number
  category: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  content: string
}

export interface About {
  title: string
  content: string
  image: string
}

export interface FeaturedProduct {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  countdown: {
    days: number
    hours: number
    minutes: number
    seconds: number
  }
}
export interface GalleryImage {
  id: string
  src: string
  alt: string
  gridClass: string
  width?: number
  height?: number
}

// API functions
export async function getSlides(): Promise<Slide[]> {
  return fetchData<Slide[]>("slides")
}

export async function getAllProducts(): Promise<Product[]> {
  return fetchData<Product[]>("products")
}

export async function getProductById(id: number): Promise<Product> {
  return fetchData<Product>(`products/${id}`)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return fetchData<Product[]>(`products?category=${encodeURIComponent(category)}`)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return fetchData<Product[]>("products?_limit=4")
}

export async function getBestSellers(): Promise<Product[]> {
  return fetchData<Product[]>("products?_sort=reviews&_order=desc&_limit=4")
}

export async function getNewProducts(): Promise<Product[]> {
  return fetchData<Product[]>("products?_sort=id&_order=desc&_limit=4")
}

export async function getCategories(): Promise<Category[]> {
  return fetchData<Category[]>("categories")
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return fetchData<BlogPost[]>("blogs")
}

export async function getBlogPostById(id: number): Promise<BlogPost> {
  return fetchData<BlogPost>(`blogs/${id}`)
}

export async function getRecentBlogPosts(): Promise<BlogPost[]> {
  return fetchData<BlogPost[]>("blogs?_sort=date&_order=desc&_limit=2")
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchData<Testimonial[]>("testimonials")
}

export async function getAbout(): Promise<About> {
  return fetchData<About>("about")
}

export async function getFeatured(): Promise<FeaturedProduct> {
  return fetchData<FeaturedProduct>("featured")
}


export async function getGallery(): Promise<GalleryImage[]> {
  return fetchData<GalleryImage[]>("gallery")
}