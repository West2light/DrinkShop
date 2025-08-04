export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  categoryId: string;
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
