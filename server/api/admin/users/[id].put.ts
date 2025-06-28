import { defineEventHandler, readBody, createError } from 'h3';
import { userStore } from '~/utils/stores/userStore';
import { authService } from '~/utils/auth';
import type { User } from '~/types/user';

interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: 'admin' | 'staff' | 'student';
  status?: 'active' | 'inactive';
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

    // Only admin can update users
    if (user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Only admin can update users'
      });
    }

    // Extract user ID from URL
    const urlParts = event.path.split('/');
    const userId = urlParts[urlParts.length - 1];
    if (!userId) {
      throw createError({
        statusCode: 400,
        message: 'User ID is required'
      });
    }

    // Find the user to update
    const userToUpdate = await userStore.findById(userId);
    if (!userToUpdate) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      });
    }

    const body = await readBody<UpdateUserRequest>(event);
    const {
      firstName,
      lastName,
      email,
      role,
      status,
      studentId,
      grade,
      department,
      position
    } = body;

    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw createError({
          statusCode: 400,
          message: 'Invalid email format'
        });
      }

      // Check if email already exists (excluding current user)
      const existingUser = await userStore.findByEmail(email);
      if (existingUser && existingUser.id !== userId) {
        throw createError({
          statusCode: 409,
          message: 'User with this email already exists'
        });
      }
    }

    // Update user object
    const updatedUser: Partial<User> = {
      ...userToUpdate,
      updatedAt: new Date()
    };

    if (firstName) updatedUser.firstName = firstName;
    if (lastName) updatedUser.lastName = lastName;
    if (email) updatedUser.email = email;
    if (role) updatedUser.role = role;
    if (status) (updatedUser as any).status = status;

    // Add role-specific fields
    if (role === 'student' && studentId) {
      (updatedUser as any).studentId = studentId;
    }
    if (role === 'student' && grade) {
      (updatedUser as any).grade = grade;
    }
    if (role === 'staff' && department) {
      (updatedUser as any).department = department;
    }
    if (role === 'staff' && position) {
      (updatedUser as any).position = position;
    }

    // Update user
    const result = await userStore.update(userId, updatedUser);
    
    if (!result) {
      throw createError({
        statusCode: 500,
        message: 'Failed to update user'
      });
    }

    // Return user without password
    const { password: _, ...safeUser } = result;

    return {
      success: true,
      data: safeUser
    };
  } catch (error: any) {
    console.error('Error updating user:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to update user'
    });
  }
}); 