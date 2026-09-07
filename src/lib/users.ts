import crypto from 'crypto';
import { getDb } from './mongo';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
}

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function getUsers(): Promise<User[]> {
  try {
    const db = await getDb();
    const users = await db.collection('users').find({}).toArray();
    return users.map(u => {
      const { _id, ...rest } = u;
      return rest as User;
    });
  } catch (error) {
    return [];
  }
}

export async function saveUser(user: User): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection('users').updateOne({ id: user.id }, { $set: user }, { upsert: true });
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection('users').deleteOne({ id });
    return true;
  } catch (error) {
    return false;
  }
}

export async function getUserByUsername(username: string): Promise<User | null> {
  try {
    const db = await getDb();
    const user = await db.collection('users').findOne({ username });
    if (!user) return null;
    const { _id, ...rest } = user;
    return rest as User;
  } catch (error) {
    return null;
  }
}
