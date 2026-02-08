import { User, UserRole } from '../types';

const USERS_KEY = 'sfb_users';
const CURRENT_USER_KEY = 'sfb_current_user';

// Seed some data if empty
const seedUsers = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    const initialUsers: User[] = [
      { id: '1', name: 'Floris Hatungimana', email: 'admin@sfb.com', role: UserRole.ADMIN, avatar: 'https://picsum.photos/200' },
      { id: '2', name: 'Jean Pierre', email: 'farmer@sfb.com', role: UserRole.FARMER, phone: '+257 77176419', avatar: 'https://picsum.photos/201' },
      { id: '3', name: 'Alice Buyer', email: 'buyer@sfb.com', role: UserRole.BUYER, avatar: 'https://picsum.photos/202' },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  }
};

seedUsers();

export const login = async (email: string): Promise<User | null> => {
  // Simulating network delay
  await new Promise(r => setTimeout(r, 800));
  const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email === email);
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const register = async (name: string, email: string, role: UserRole, phone?: string): Promise<User> => {
  await new Promise(r => setTimeout(r, 800));
  const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  
  if (users.find(u => u.email === email)) {
    throw new Error("User already exists");
  }

  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    role,
    phone,
    avatar: `https://picsum.photos/seed/${Math.random()}/200`
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  return newUser;
};
