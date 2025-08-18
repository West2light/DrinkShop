'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import OrderFilters from '@/components/admin/orders/OrderFilters';
import OrderTable from '@/components/admin/orders/OrderTable';
import OrderDetailsDialog from '@/components/admin/orders/OrderDetailsDialog';
import AdminPageLayout from '@/components/layout/AdminPageLayout';

import { useOrderManagement } from '@/hooks/userOrderManagement';
import { useOrderDetails } from '@/hooks/useOrderDetails';

import type { Address as OrderTableRowAddress } from '@/components/admin/orders/OrderTableRow';
import { ORDER_STATUS, ORDER_STATUS_OPTIONS } from '@/constants/order-status';

const OrderManagement = () => {
    const [filterStatus, setFilterStatus] = useState<string>(ORDER_STATUS.ALL);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const {
        orders,
        usersMap,
        addressesMap,
        isLoadingOrders,
        error,
        loadInitialData,
        updateOrderStatus
    } = useOrderManagement();

    const orderDetails = useOrderDetails(selectedOrderId || '');

    const openDetails = (orderId: string) => {
        setSelectedOrderId(orderId);
        setIsDetailsOpen(true);
    };

    const closeDetails = () => {
        setSelectedOrderId(null);
        setIsDetailsOpen(false);
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    const filteredOrders = useMemo(() => {
        if (!orders.length) return [];

        return orders.filter((order) => {
            if (filterStatus !== ORDER_STATUS.ALL && order.status !== filterStatus) {
                return false;
            }

            if (searchQuery.trim()) {
                const user = usersMap.get(order.userId);
                const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '';
                const searchLower = searchQuery.toLowerCase();

                const matchesId = order.id?.toLowerCase().includes(searchLower);
                const matchesName = fullName.toLowerCase().includes(searchLower);

                return matchesId || matchesName;
            }

            return true;
        });
    }, [orders, filterStatus, searchQuery, usersMap]);

    const tableData = useMemo(() => {
        return filteredOrders.map((order) => {
            const user = usersMap.get(order.userId);
            const address = addressesMap.get(order.addressId);

            const addressForRow: OrderTableRowAddress | undefined = address ? {
                id: address.id,
                address: address.address,
                city: address.city,
                phone: address.phone,
            } : undefined;

            return {
                order,
                user,
                address: addressForRow
            };
        });
    }, [filteredOrders, usersMap, addressesMap]);

    if (error) {
        return (
            <AdminPageLayout>
                <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Có lỗi xảy ra</h2>
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button
                        onClick={loadInitialData}
                        variant="outline"
                        className="border-red-300 text-red-700 hover:bg-red-50"
                    >
                        Thử lại
                    </Button>
                </div>
            </AdminPageLayout>
        );
    }

    return (
        <AdminPageLayout>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý đơn hàng</h1>
                <p className="text-gray-600">
                    Tổng cộng: {filteredOrders.length} đơn hàng
                    {filterStatus !== ORDER_STATUS.ALL && ` (lọc: ${ORDER_STATUS_OPTIONS.find(opt => opt.value === filterStatus)?.label})`}
                </p>
            </div>

            {/* Filters */}
            <OrderFilters
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusOptions={ORDER_STATUS_OPTIONS}
            />

            {/* Loading state */}
            {isLoadingOrders ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải danh sách đơn hàng...</p>
                </div>
            ) : (
                <OrderTable
                    tableData={tableData}
                    searchQuery={searchQuery}
                    filterStatus={filterStatus}
                    onOpenDetails={openDetails}
                    onUpdateStatus={updateOrderStatus}
                />
            )}

            {/* Order Details Dialog */}
            {selectedOrderId && (
                <OrderDetailsDialog
                    selectedOrder={orders.find(order => order.id === selectedOrderId) || null}
                    orderDetails={orderDetails}
                    isLoadingDetails={false}
                    usersMap={usersMap}
                    addressesMap={addressesMap}
                    onClose={closeDetails}
                />
            )}
        </AdminPageLayout>
    );
};

export default OrderManagement;
