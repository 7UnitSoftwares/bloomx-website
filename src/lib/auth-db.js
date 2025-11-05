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
          id: 'root-1',
          username: 'root',
          email: 'root@bloom-bi.it',
          password: crypto.createHash('sha256').update('rootWinterStrike').digest('hex'),
          role: 'root',
          isRoot: true,
          createdAt: new Date().toISOString(),
          lastLogin: null
        }
      ],
      sessions: []
    };
    
    fs.writeFileSync(AUTH_DB_PATH, JSON.stringify(defaultUsers, null, 2));
    console.log('Auth database initialized with root user (root@bloom-bi.it)');
  } else {
    // Check if root user exists, if not, add it
    try {
      const data = fs.readFileSync(AUTH_DB_PATH, 'utf8');
      const authDB = JSON.parse(data);
      
      const rootUserExists = authDB.users.some(u => 
        u.isRoot === true || u.email === 'root@bloom-bi.it' || u.role === 'root'
      );
      
      if (!rootUserExists) {
        const rootUser = {
          id: 'root-1',
          username: 'root',
          email: 'root@bloom-bi.it',
          password: crypto.createHash('sha256').update('rootWinterStrike').digest('hex'),
          role: 'root',
          isRoot: true,
          createdAt: new Date().toISOString(),
          lastLogin: null
        };
        
        // Add root user at the beginning of the array
        authDB.users.unshift(rootUser);
        fs.writeFileSync(AUTH_DB_PATH, JSON.stringify(authDB, null, 2));
        console.log('Root user added to auth database');
      }
    } catch (error) {
      console.error('Error checking for root user:', error);
    }
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

// Reset password (admin/root only)
export const resetPassword = (userId, newPassword) => {
  const authDB = readAuthDB();
  const userIndex = authDB.users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return null;
  
  const user = authDB.users[userIndex];
  
  // For root account, allow password reset but keep other restrictions
  if (user && (user.isRoot === true || user.email === 'root@bloom-bi.it' || user.role === 'root')) {
    user.password = hashPassword(newPassword);
    user.passwordTemporary = true; // Mark as temporary so root must change it
    writeAuthDB(authDB);
    return user;
  }
  
  // For regular users, reset password and mark as temporary
  authDB.users[userIndex].password = hashPassword(newPassword);
  authDB.users[userIndex].passwordTemporary = true;
  writeAuthDB(authDB);
  
  return authDB.users[userIndex];
};

// Change password (user changes their own password)
export const changePassword = (userId, currentPassword, newPassword) => {
  const authDB = readAuthDB();
  const userIndex = authDB.users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return null;
  
  const user = authDB.users[userIndex];
  
  // Verify current password
  if (!verifyPassword(currentPassword, user.password)) {
    return { error: 'Current password is incorrect' };
  }
  
  // Update password and mark as not temporary
  authDB.users[userIndex].password = hashPassword(newPassword);
  authDB.users[userIndex].passwordTemporary = false;
  writeAuthDB(authDB);
  
  return authDB.users[userIndex];
};

// Get user by ID
export const getUserById = (userId) => {
  const authDB = readAuthDB();
  return authDB.users.find(u => u.id === userId);
};

// Create new user (admin only)
export const createUser = (userData) => {
  const authDB = readAuthDB();
  
  // Check if email or username already exists
  const emailExists = authDB.users.some(u => u.email === userData.email);
  const usernameExists = authDB.users.some(u => u.username === userData.username);
  
  if (emailExists) {
    throw new Error('Email already exists');
  }
  if (usernameExists) {
    throw new Error('Username already exists');
  }
  
  const newUser = {
    id: crypto.randomUUID(),
    name: userData.name || userData.username,
    username: userData.username,
    email: userData.email,
    password: hashPassword(userData.password),
    role: userData.role || 'admin',
    passwordTemporary: true, // Mark password as temporary
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
  
  const user = authDB.users[userIndex];
  
  // Prevent modification of root account properties (except password and lastLogin)
  if (user && (user.isRoot === true || user.email === 'root@bloom-bi.it' || user.role === 'root')) {
    // Allow password and lastLogin updates, but prevent role/email/username changes
    const allowedUpdates = {};
    if (updates.password) {
      allowedUpdates.password = hashPassword(updates.password);
    }
    if (updates.lastLogin !== undefined) {
      allowedUpdates.lastLogin = updates.lastLogin;
    }
    // Only apply allowed updates
    updates = allowedUpdates;
  } else {
    // Normal user - hash password if provided
    if (updates.password) {
      updates.password = hashPassword(updates.password);
    }
  }
  
  authDB.users[userIndex] = { ...authDB.users[userIndex], ...updates };
  writeAuthDB(authDB);
  
  return authDB.users[userIndex];
};

// Delete user
export const deleteUser = (userId) => {
  const authDB = readAuthDB();
  const user = authDB.users.find(u => u.id === userId);
  
  // Prevent deletion of root account
  if (user && (user.isRoot === true || user.email === 'root@bloom-bi.it' || user.role === 'root')) {
    return false; // Cannot delete root account
  }
  
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
// If currentUserId is provided, root users will be hidden from non-root users
export const getAllUsers = (currentUserId = null) => {
  const authDB = readAuthDB();
  
  // Get current user to check if they're root
  let currentUser = null;
  if (currentUserId) {
    currentUser = authDB.users.find(u => u.id === currentUserId);
  }
  
  const isCurrentUserRoot = currentUser && (currentUser.isRoot === true || currentUser.email === 'root@bloom-bi.it' || currentUser.role === 'root');
  
  // Filter users based on visibility rules
  let filteredUsers = authDB.users;
  if (!isCurrentUserRoot) {
    // Hide root users from non-root users
    filteredUsers = authDB.users.filter(user => 
      !(user.isRoot === true || user.email === 'root@bloom-bi.it' || user.role === 'root')
    );
  }
  
  return filteredUsers.map(user => ({
    ...user,
    password: undefined // Don't return password hashes
  }));
};

// Initialize database on import
initializeAuthDB();
