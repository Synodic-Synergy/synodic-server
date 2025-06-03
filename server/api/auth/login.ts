import { defineEventHandler, readBody, createError } from 'h3';
import { SignJWT } from 'jose';
import { compare } from 'bcrypt';
import type { LoginCredentials, AuthResponse } from '~/types/user';
import { userStore } from '~/utils/stores/userStore';

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginCredentials>(event);

  // Find user by email
  const user = await userStore.findByEmail(body.email);
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials'
    });
  }

  // Verify password
  const isValid = await compare(body.password, user.password);
  if (!isValid) {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials'
    });
  }

  // Generate tokens
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ sub: user.id, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  const refreshToken = await new SignJWT({ sub: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  // Set HTTP-only cookies
  event.node.res.setHeader('Set-Cookie', [
    `auth_token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
    `refresh_token=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
  ]);

  const response: AuthResponse = {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  };

  return response;
}); 