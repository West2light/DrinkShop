import { User } from '../types/user.types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE}/users`);
    const data = await response.json();
    return data.map((user: Record<string, unknown>) => ({
        ...user,
        id: user.id
    }));
};

export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const existingUsers = await getUsers();
    const maxId = Math.max(...existingUsers.map(u => u.id), 0);
    const nextId = maxId + 1;
    const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...user,
            id: nextId.toString()
        }),
    });

    const newUser = await response.json();
    return {
        ...newUser,
        id: nextId
    };
};

export const updateUser = async (id: number, form: Omit<User, "id">, user: User): Promise<User> => {
    const response = await fetch(`${API_BASE}/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...user,
            id: user.id.toString()
        }),
    });
    const updatedUser = await response.json();

    return {
        ...updatedUser,
        id: parseInt(updatedUser.id, 10)
    };
};

export const deleteUser = async (id: number): Promise<void> => {
    await fetch(`${API_BASE}/users/${id.toString()}`, {
        method: 'DELETE',
    });
};
