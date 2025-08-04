'use client';

import { useState } from 'react';
import UserTable from '../../../components/admin/UserTable';
import { User } from '../../../types/user.types';
import UserForm from '../../../components/admin/UserForm';

export default function AdminUserPage() {
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleEdit = (user: User) => {
        setEditingUser(user);
    };

    const handleSave = () => {
        setEditingUser(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4 text-center">Quản lý người dùng</h1>
            <UserForm user={editingUser} onSave={handleSave} />
            <UserTable onEdit={handleEdit} />
        </div>
    );
}
