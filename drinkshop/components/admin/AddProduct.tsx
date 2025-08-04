'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Product } from '../../types/product.types';
import { Category } from '../../types/category.types';
import Image from 'next/image';
import { toast, Toaster } from 'sonner';
import { useProducts, useCategories } from '../../hooks/useProduct';

export default function AddProduct() {
    const { products, loading: productsLoading, addProduct, deleteProduct } = useProducts();
    const { categories, loading: categoriesLoading } = useCategories();
    const loading = productsLoading || categoriesLoading;

    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        slug: '',
        description: '',
        price: 0,
        originalPrice: 0,
        categoryId: 0,
        stock: 0,
        isNew: false,
        isHot: false,
        isSale: false,
        discount: 0,
        rating: 0,
        reviewCount: 0,
        status: 'active',
        image: 'Image_Rudu/wine1.jpg',
        images: ['Image_Rudu/wine1.jpg'],
    });
    const [editingProductId, setEditingProductId] = useState<string | null>(null);

    const tableHeaders = [
        'Image',
        'Name',
        'Category',
        'Price',
        'Discount',
        'Stock',
        'Rating',
        'Status',
        'Actions'];



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!formData.name || !formData.slug || !formData.categoryId || formData.categoryId === 0) {
                toast.error('Vui lòng điền đầy đủ thông tin sản phẩm');
                return;
            }

            const loadingToast = toast.loading('Đang thêm sản phẩm...', {
                description: 'Vui lòng đợi trong giây lát',
            });

            const newProduct = await addProduct(formData as Omit<Product, 'id'>);

            toast.dismiss(loadingToast);
            toast.success('Thêm sản phẩm thành công!', {
                description: `Sản phẩm ${newProduct.name} đã được thêm.`,
                duration: 3000,
            });

            setFormData({
                name: '',
                slug: '',
                description: '',
                price: 0,
                originalPrice: 0,
                categoryId: 0,
                stock: 0,
                isNew: false,
                isHot: false,
                isSale: false,
                discount: 0,
                rating: 0,
                reviewCount: 0,
                status: 'active',
                image: 'Image_Rudu/wine1.jpg',
                images: ['Image_Rudu/wine1.jpg'],
            });

        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Có lỗi xảy ra!', {
                description: 'Lỗi không xác định khi thêm sản phẩm',
                duration: 5000,
                action: {
                    label: 'Thử lại',
                    onClick: () => handleSubmit(e),
                },
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSelectChange = (name: string) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'categoryId' ? value : value,
        }));
    };

    const handleCheckboxChange = (name: string) => (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleEdit = (product: Product) => {
        setFormData({
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice,
            categoryId: product.categoryId,
            stock: product.stock,
            isNew: product.isNew,
            isHot: product.isHot,
            isSale: product.isSale,
            discount: product.discount,
            rating: product.rating,
            reviewCount: product.reviewCount,
            status: product.status,
            image: product.image,
            images: product.images,
        });
        setEditingProductId(product.id.toString());
    };

    const handleDelete = async (productId: string) => {
        try {
            const loadingToast = toast.loading('Đang xóa sản phẩm...', {
                description: 'Vui lòng đợi trong giây lát',
            });

            await deleteProduct(productId.toString());

            toast.dismiss(loadingToast);
            toast.success('Xóa sản phẩm thành công!', {
                duration: 3000,
            });
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Có lỗi xảy ra!', {
                description: 'Lỗi khi xóa sản phẩm',
                duration: 5000,
                action: {
                    label: 'Thử lại',
                    onClick: () => handleDelete(productId),
                },
            });
        }
    };

    const getCategoryDisplayName = (category: Category) => {
        if (!category.parentId) return category.name;
        const parent = (categories as unknown as Category[]).find(cat => typeof cat !== 'string' && cat.id === category.parentId) as Category | undefined;
        return parent ? `${parent.name} > ${category.name}` : category.name;
    };

    const getImageSrc = (imagePath: string | undefined) => {
        if (!imagePath) return '/Image_Rudu/wine1.jpg';
        else if (imagePath.startsWith('http')) return imagePath;
        else if (imagePath.startsWith('/')) return imagePath;
        return `/${imagePath}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-right" richColors />
            <div className="max-w-7xl mx-auto space-y-8">
                <Card className="shadow-lg py-0">
                    <CardHeader className="bg-teal-600 text-white rounded-t-lg">
                        <CardTitle className="text-2xl font-bold text-center py-2">
                            Add New Product
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Product Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug" className="text-sm font-medium text-gray-700">Slug</Label>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        required
                                        className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-sm font-medium text-gray-700">Price</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="originalPrice" className="text-sm font-medium text-gray-700">Original Price</Label>
                                    <Input
                                        id="originalPrice"
                                        name="originalPrice"
                                        type="number"
                                        value={formData.originalPrice}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="categoryId" className="text-sm font-medium text-gray-700">Category</Label>
                                    <Select
                                        name="categoryId"
                                        value={formData.categoryId?.toString() || ""}
                                        onValueChange={handleSelectChange('categoryId')}
                                    >
                                        <SelectTrigger className="border-gray-300 focus:ring-teal-500 focus:border-teal-500">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {(categories as unknown as Category[])
                                                .filter((category): category is Category => typeof category !== 'string')
                                                .map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {getCategoryDisplayName(category)}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="stock" className="text-sm font-medium text-gray-700">Stock</Label>
                                    <Input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="isNew"
                                        name="isNew"
                                        checked={formData.isNew}
                                        onCheckedChange={handleCheckboxChange('isNew')}
                                        className="border-gray-300 text-teal-600 focus:ring-teal-500"
                                    />
                                    <Label htmlFor="isNew" className="text-sm font-medium text-gray-700">New Product</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="isHot"
                                        name="isHot"
                                        checked={formData.isHot}
                                        onCheckedChange={handleCheckboxChange('isHot')}
                                        className="border-gray-300 text-teal-600 focus:ring-teal-500"
                                    />
                                    <Label htmlFor="isHot" className="text-sm font-medium text-gray-700">Hot Product</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="isSale"
                                        name="isSale"
                                        checked={formData.isSale}
                                        onCheckedChange={handleCheckboxChange('isSale')}
                                        className="border-gray-300 text-teal-600 focus:ring-teal-500"
                                    />
                                    <Label htmlFor="isSale" className="text-sm font-medium text-gray-700">On Sale</Label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="discount" className="text-sm font-medium text-gray-700">Discount (%)</Label>
                                    <Input
                                        id="discount"
                                        name="discount"
                                        type="number"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">Status</Label>
                                    <Select
                                        name="status"
                                        value={formData.status}
                                        onValueChange={handleSelectChange('status')}
                                    >
                                        <SelectTrigger className="border-gray-300 focus:ring-teal-500 focus:border-teal-500">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="draft">Draft</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6"
                                    disabled={loading}
                                >
                                    {loading ? 'Đang xử lý...' : 'Add Product'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <Card className="shadow-lg py-0 mt-10">
                    <CardHeader className="bg-teal-600 text-white rounded-t-lg">
                        <CardTitle className="text-2xl font-bold text-center">
                            Existing Products
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {loading ? (
                            <p className="text-center text-gray-500">Loading products...</p>
                        ) : products.length === 0 ? (
                            <p className="text-center text-gray-500">No products available.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100">
                                            {tableHeaders.map((header, index) => (
                                                <TableHead
                                                    key={index}
                                                    className="font-semibold text-gray-700"
                                                >
                                                    {header}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product.id} className="hover:bg-gray-50">
                                                <TableCell>
                                                    <Image
                                                        src={getImageSrc(product.image)}
                                                        alt={product.name || 'Product image'}
                                                        width={40}
                                                        height={40}
                                                        className="object-cover rounded-md"
                                                        style={{ width: 'auto', height: 'auto' }}
                                                        priority={false}
                                                    />
                                                </TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>
                                                    {(categories as unknown as Category[])
                                                        .filter((cat): cat is Category => typeof cat !== 'string')
                                                        .find(cat => cat.id.toString() === product.categoryId.toString())
                                                        ?.name || 'Unknown'}
                                                </TableCell>
                                                <TableCell>${product.price?.toFixed(2) || '0.00'}</TableCell>
                                                <TableCell>{product.discount || 0}%</TableCell>
                                                <TableCell>{product.stock || 0}</TableCell>
                                                <TableCell>
                                                    {product.rating || 0} ({product.reviewCount || 0} reviews)
                                                </TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-green-100 text-green-800' :
                                                        product.status === 'inactive' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {product.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleEdit(product)}
                                                            className="border-teal-600 text-teal-600 hover:bg-teal-50"
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDelete(product.id.toString())}
                                                            className="bg-red-600 hover:bg-red-700 text-white"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}