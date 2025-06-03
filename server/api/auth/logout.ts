import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {
  // Clear auth cookies by setting them to expire
  event.node.res.setHeader('Set-Cookie', [
    'auth_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict',
    'refresh_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
  ]);

  return { success: true };
}); 