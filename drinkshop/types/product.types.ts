export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  categoryId: number;
  stock: number;
  isNew: boolean;
  isHot: boolean;
  isSale: boolean;
  discount: number;
  rating: number;
  reviewCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
