'use client';

import { useState, useEffect } from 'react';
import { User } from '../../types/user.types';
import { addUser, updateUser } from '../../services/userApi';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

interface Props {
    user: User | null;
    onSave: () => void;
}

export default function UserForm({ user, onSave }: Props) {
    const INITIAL_FORM_STATE: Omit<User, 'id'> = {
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        avatar: '',
        role: 'customer',
        status: 'active',
    };

    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'customer', label: 'Customer' }
    ];

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
    ];

    const [form, setForm] = useState<Omit<User, 'id'>>(
        user
            ? (({ id, ...rest }) => rest)(user)
            : INITIAL_FORM_STATE
    );
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);


    const validatePassword = (password: string): boolean => {
        let error: string | null = null;

        if (password.length < 8) {
            error = 'Mật khẩu phải có ít nhất 8 ký tự';
        } else if (!/[A-Z]/.test(password)) {
            error = 'Mật khẩu phải chứa ít nhất một chữ hoa';
        } else if (!/[a-z]/.test(password)) {
            error = 'Mật khẩu phải chứa ít nhất một chữ thường';
        } else if (!/[0-9]/.test(password)) {
            error = 'Mật khẩu phải chứa ít nhất một số';
        }

        setPasswordError(error);
        return error === null;
    };

    const handleChange = (
        p0: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === 'password') {
            validatePassword(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isPasswordValid = validatePassword(form.password);

        if (!isPasswordValid) return;

        if (user) {
            await updateUser(user.id, form, user);
        } else {
            await addUser(form);
        }

        onSave();
        setForm(INITIAL_FORM_STATE);
    };

    useEffect(() => {
        if (user) {
            setForm({
                username: user.username || '',
                email: user.email || '',
                password: user.password || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                avatar: user.avatar || '',
                role: user.role || 'customer',
                status: user.status || 'active',
            });
        } else {
            setForm(INITIAL_FORM_STATE);
        }
    }, [user]);


    return (
        <Card className="max-w-md mx-auto mt-8 mb-10">
            <CardHeader>
                <CardTitle className='text-center text-2xl'>{user ? 'Update User' : 'Add User'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={(e) => handleChange('username', e)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange('email', e)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={form.password}
                                onChange={(e) => handleChange('password', e)}
                                className={passwordError ? 'border-red-500' : ''}
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {passwordError && (
                            <p className="text-red-500 text-sm">{passwordError}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            value={form.firstName}
                            onChange={(e) => handleChange('firstName', e)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            value={form.lastName}
                            onChange={(e) => handleChange('lastName', e)}
                            required

                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={(e) => handleChange('phone', e)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={form.role} onValueChange={(value) => setForm((prev) => ({ ...prev, role: value as User['role'] }))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roleOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={form.status} onValueChange={(value) => setForm((prev) => ({ ...prev, status: value as User['status'] }))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-400"
                        disabled={!!passwordError}
                    >
                        {user ? 'Update' : 'Add'} User
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

