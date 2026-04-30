import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { api } from '@/lib/api';

const COOKIE_NAME = 'token';

// JWT secret with fallback for development
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try { return jwt.verify(token, JWT_SECRET); }
  catch { return null; }
}

export function setAuthCookie(res, token) {
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
}

export function clearAuthCookie(res) {
  res.cookies.set({ name: COOKIE_NAME, value: '', path: '/', maxAge: 0 });
}

export async function getAuthUser() {
  const t = cookies().get(COOKIE_NAME)?.value;
  if (!t) return null;
  const decoded = verifyToken(t);
  if (!decoded) return null;
  
  // Return user data directly from token payload
  // In a real app, you might want to fetch fresh user data from database
  return {
    id: decoded.id,
    role: decoded.role,
    email: 'admin@example.com', // This should come from token or database
    name: 'Admin'
  };
}

export async function requireUser() {
  const u = await getAuthUser();
  if (!u) throw new Error('UNAUTHENTICATED');
  return u;
}

export async function requireAdmin() {
  const u = await requireUser();
  if (u.role !== 'ADMIN') throw new Error('FORBIDDEN');
  return u;
}

export async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}