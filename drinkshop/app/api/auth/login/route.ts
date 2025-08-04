import { NextRequest, NextResponse } from "next/server";
import { publicApi } from "@/lib/api/axios";
import { User, UserResponse, UserWithoutPassword } from "@/types/user.types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email and password
    const users = await publicApi.get<User[]>(
      `/users?email=${email}&password=${password}`
    );

    if (!users || !Array.isArray(users) || users.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = users[0];

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    const successResponse: UserResponse = {
      success: true,
      data: userWithoutPassword,
      message: "Login successful",
    };

    return NextResponse.json(successResponse);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
