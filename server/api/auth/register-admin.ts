import { defineEventHandler, readBody, createError } from 'h3';
import type { H3Event } from 'h3';
import { SignJWT } from 'jose';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import type { AdminSetupCredentials, AuthResponse } from '~/types/user';
import { userStore } from '~/utils/stores/userStore';

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<AdminSetupCredentials>(event);

  // Validate setup key
  if (body.setupKey !== process.env.ADMIN_SETUP_KEY) {
    throw createError({
      statusCode: 403,
      message: 'Invalid setup key'
    });
  }

  // Check if admin already exists
  const adminExists = await userStore.isAdminExists();
  if (adminExists) {
    throw createError({
      statusCode: 400,
      message: 'Admin user already exists'
    });
  }

  // Hash password
  const hashedPassword = await hash(body.password, 10);

  // Create admin user
  const admin = await userStore.create({
    id: uuidv4(),
    email: body.email,
    password: hashedPassword,
    role: 'admin',
    firstName: body.firstName,
    lastName: body.lastName,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  // Generate tokens
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ sub: admin.id, role: admin.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  const refreshToken = await new SignJWT({ sub: admin.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  const response: AuthResponse = {
    user: {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      firstName: admin.firstName,
      lastName: admin.lastName,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt
    },
    token,
    refreshToken
  };

  return response;
}); 