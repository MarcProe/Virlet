import { Low, JSONFile } from 'lowdb';
import { User } from '@/types';

// Define the database schema
export interface Database {
  users: User[];
}

// Initialize the database
const adapter = new JSONFile<Database>('db.json');
const db = new Low(adapter);

// Initialize the database with default values if empty
export async function initializeDB() {
  await db.read();
  
  if (!db.data) {
    db.data = { users: [] };
    await db.write();
  }
  
  return db;
}

// Get all users
export async function getAllUsers(): Promise<User[]> {
  await db.read();
  return db.data?.users || [];
}

// Get a user by ID
export async function getUserById(id: string): Promise<User | null> {
  await db.read();
  return db.data?.users.find(user => user.id === id) || null;
}

// Get a user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  await db.read();
  return db.data?.users.find(user => user.email === email) || null;
}

// Create or update a user
export async function upsertUser(user: User): Promise<User> {
  await db.read();
  
  if (!db.data) {
    db.data = { users: [] };
  }
  
  const existingIndex = db.data.users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    db.data.users[existingIndex] = user;
  } else {
    db.data.users.push(user);
  }
  
  await db.write();
  return user;
}

// Delete a user
export async function deleteUser(id: string): Promise<boolean> {
  await db.read();
  
  if (!db.data) {
    return false;
  }
  
  const initialLength = db.data.users.length;
  db.data.users = db.data.users.filter(user => user.id !== id);
  
  if (db.data.users.length < initialLength) {
    await db.write();
    return true;
  }
  
  return false;
}

export { db };
