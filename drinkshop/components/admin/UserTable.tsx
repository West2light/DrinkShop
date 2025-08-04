'use client';

import { useEffect, useState } from 'react';
import { User } from '../../types/user.types';
import { getUsers, deleteUser } from '../../services/userApi';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Column {
    key: keyof User | 'actions';
    label: string;
    render?: (user: User) => React.ReactNode;
}

export default function UserTable({ onEdit }: { onEdit: (user: User) => void }) {
    const [users, setUsers] = useState<User[]>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const loadUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    const handleDeleteClick = (user: User) => {
        setUserToDelete(user);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (userToDelete) {
            await deleteUser(userToDelete.id);
            setDeleteModalOpen(false);
            setUserToDelete(null);
            await loadUsers();
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
        setUserToDelete(null);
    };

    const columns: Column[] = [
        { key: 'id', label: 'ID' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' },
        {
            key: 'actions',
            label: 'Actions',
            render: (user: User) => (
                <div className="flex gap-2">
                    <Button
                        onClick={() => onEdit(user)}
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleDeleteClick(user)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                    >
                        Delete
                    </Button>
                </div>
            )
        }
    ];

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column.key}>
                                {column.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            {columns.map((column) => (
                                <TableCell key={column.key}>
                                    {column.render
                                        ? column.render(user)
                                        : user[column.key as keyof User]
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa người dùng</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa người dùng <strong>{userToDelete?.username}</strong> không?
                            Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleDeleteCancel}>
                            Hủy
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}