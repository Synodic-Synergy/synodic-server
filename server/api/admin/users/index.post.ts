import { defineEventHandler, readBody, createError } from 'h3';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';
import type { User } from '~/types/user';

interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'staff' | 'student';
  password: string;
  studentId?: string;
  grade?: string;
  department?: string;
  position?: string;
}

export default defineEventHandler(async (event) => {
  try {
    // Extract tokens from cookies
    const { accessToken } = authService.extractTokensFromCookies(event);
    
    if (!accessToken) {
      throw createError({
        statusCode: 401,
        message: 'No access token provided'
      });
    }

    // Verify access token
    let authContext;
    try {
      authContext = await authService.verifyAccessToken(accessToken);
    } catch (error) {
      throw createError({
        statusCode: 401,
        message: 'Invalid access token'
      });
    }

    // Find user
    const user = await userStore.findById(authContext.userId);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'User not found'
      });
    }

    // Only admin can create users
    if (user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Only admin can create users'
      });
    }

    const body = await readBody<CreateUserRequest>(event);
    const {
      firstName,
      lastName,
      email,
      role,
      password,
      studentId,
      grade,
      department,
      position
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !role || !password) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields: firstName, lastName, email, role, password'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email format'
      });
    }

    // Validate password strength
    const passwordValidation = authService.validatePassword(password);
    if (!passwordValidation.isValid) {
      throw createError({
        statusCode: 400,
        message: `Password validation failed: ${passwordValidation.errors.join(', ')}`
      });
    }

    // Check if email already exists
    const existingUser = await userStore.findByEmail(email);
    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await authService.hashPassword(password);

    // Create user object
    const newUser: User = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add role-specific fields
    if (role === 'student' && studentId) {
      (newUser as any).studentId = studentId;
    }
    if (role === 'student' && grade) {
      (newUser as any).grade = grade;
    }
    if (role === 'staff' && department) {
      (newUser as any).department = department;
    }
    if (role === 'staff' && position) {
      (newUser as any).position = position;
    }

    // Create user
    const createdUser = await userStore.create(newUser);

    // Return user without password
    const { password: _, ...safeUser } = createdUser;

    return {
      success: true,
      data: safeUser
    };
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to create user'
    });
  }
}); 