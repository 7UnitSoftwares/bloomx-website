// Simple authentication database using JSON file
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const AUTH_DB_PATH = path.join(process.cwd(), 'src/data/auth.json');

// Initialize auth database if it doesn't exist
const initializeAuthDB = () => {
  if (!fs.existsSync(AUTH_DB_PATH)) {
    const defaultUsers = {
      users: [
        {
          id: 'admin-1',
          username: 'admin',
          email: 'admin@bloom-bi.it',
          password: crypto.createHash('sha256').update('admin123').digest('hex'), // Default password
          role: 'admin',
          createdAt: new Date().toISOString(),
          lastLogin: null
        }
      ],
      sessions: []
    };
    
    fs.writeFileSync(AUTH_DB_PATH, JSON.stringify(defaultUsers, null, 2));
    console.log('Auth database initialized with default admin user (admin/admin123)');
  }
};

// Read auth database
const readAuthDB = () => {
  try {
    initializeAuthDB();
    const data = fs.readFileSync(AUTH_DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading auth database:', error);
    return { users: [], sessions: [] };
  }
};

// Write auth database
const writeAuthDB = (data) => {
  try {
    fs.writeFileSync(AUTH_DB_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing auth database:', error);
    return false;
  }
};

// Hash password
export const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Verify password
export const verifyPassword = (password, hashedPassword) => {
  return hashPassword(password) === hashedPassword;
};

// Create session
export const createSession = (userId) => {
  const sessionId = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
  const authDB = readAuthDB();
  authDB.sessions.push({
    id: sessionId,
    userId,
    expiresAt: expiresAt.toISOString(),
    createdAt: new Date().toISOString()
  });
  
  // Clean up expired sessions
  authDB.sessions = authDB.sessions.filter(session => 
    new Date(session.expiresAt) > new Date()
  );
  
  writeAuthDB(authDB);
  return sessionId;
};

// Verify session
export const verifySession = (sessionId) => {
  const authDB = readAuthDB();
  const session = authDB.sessions.find(s => s.id === sessionId);
  
  if (!session) return null;
  
  // Check if session is expired
  if (new Date(session.expiresAt) <= new Date()) {
    // Remove expired session
    authDB.sessions = authDB.sessions.filter(s => s.id !== sessionId);
    writeAuthDB(authDB);
    return null;
  }
  
  // Get user info
  const user = authDB.users.find(u => u.id === session.userId);
  return user ? { ...user, sessionId } : null;
};

// Authenticate user
export const authenticateUser = (username, password) => {
  const authDB = readAuthDB();
  const user = authDB.users.find(u => 
    u.username === username || u.email === username
  );
  
  if (!user || !verifyPassword(password, user.password)) {
    return null;
  }
  
  // Update last login
  user.lastLogin = new Date().toISOString();
  writeAuthDB(authDB);
  
  return user;
};

// Get user by ID
export const getUserById = (userId) => {
  const authDB = readAuthDB();
  return authDB.users.find(u => u.id === userId);
};

// Create new user (admin only)
export const createUser = (userData) => {
  const authDB = readAuthDB();
  const newUser = {
    id: crypto.randomUUID(),
    ...userData,
    password: hashPassword(userData.password),
    createdAt: new Date().toISOString(),
    lastLogin: null
  };
  
  authDB.users.push(newUser);
  writeAuthDB(authDB);
  
  return newUser;
};

// Update user
export const updateUser = (userId, updates) => {
  const authDB = readAuthDB();
  const userIndex = authDB.users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return null;
  
  if (updates.password) {
    updates.password = hashPassword(updates.password);
  }
  
  authDB.users[userIndex] = { ...authDB.users[userIndex], ...updates };
  writeAuthDB(authDB);
  
  return authDB.users[userIndex];
};

// Delete user
export const deleteUser = (userId) => {
  const authDB = readAuthDB();
  authDB.users = authDB.users.filter(u => u.id !== userId);
  authDB.sessions = authDB.sessions.filter(s => s.userId !== userId);
  writeAuthDB(authDB);
  
  return true;
};

// Logout (remove session)
export const logout = (sessionId) => {
  const authDB = readAuthDB();
  authDB.sessions = authDB.sessions.filter(s => s.id !== sessionId);
  writeAuthDB(authDB);
  
  return true;
};

// Get all users (admin only)
export const getAllUsers = () => {
  const authDB = readAuthDB();
  return authDB.users.map(user => ({
    ...user,
    password: undefined // Don't return password hashes
  }));
};

// Initialize database on import
initializeAuthDB();
