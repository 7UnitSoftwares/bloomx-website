#!/usr/bin/env node

/**
 * Debug script to check authentication database status
 * Run this inside the Kubernetes pod to diagnose login issues
 */

const fs = require('fs');
const path = require('path');

const AUTH_DB_PATH = path.join(process.cwd(), 'src/data/auth.json');
const BLOG_DB_PATH = path.join(process.cwd(), 'data/blog-posts.json');

console.log('🔍 Authentication Database Debug\n');
console.log('='.repeat(60));

// Check working directory
console.log(`📁 Working Directory: ${process.cwd()}`);

// Check auth database
console.log('\n📝 Authentication Database:');
console.log(`   Path: ${AUTH_DB_PATH}`);
console.log(`   Exists: ${fs.existsSync(AUTH_DB_PATH)}`);

if (fs.existsSync(AUTH_DB_PATH)) {
  try {
    const stats = fs.statSync(AUTH_DB_PATH);
    console.log(`   Size: ${stats.size} bytes`);
    console.log(`   Modified: ${stats.mtime}`);
    console.log(`   Permissions: ${stats.mode.toString(8)}`);
    
    const data = JSON.parse(fs.readFileSync(AUTH_DB_PATH, 'utf8'));
    console.log(`   Users count: ${data.users ? data.users.length : 0}`);
    console.log(`   Sessions count: ${data.sessions ? data.sessions.length : 0}`);
    
    if (data.users && data.users.length > 0) {
      console.log('\n   Users:');
      data.users.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.email} (${user.username})`);
        console.log(`      Role: ${user.role}`);
        console.log(`      Root: ${user.isRoot === true ? 'Yes' : 'No'}`);
        console.log(`      Last Login: ${user.lastLogin || 'Never'}`);
        console.log(`      Password Temp: ${user.passwordTemporary === true ? 'Yes' : 'No'}`);
      });
      
      const rootUser = data.users.find(u => u.email === 'root@bloom-bi.it');
      if (rootUser) {
        console.log('\n   ✅ Root user found!');
        console.log(`      Email: ${rootUser.email}`);
        console.log(`      Username: ${rootUser.username}`);
        console.log(`      Password hash: ${rootUser.password.substring(0, 20)}...`);
      } else {
        console.log('\n   ⚠️  Root user NOT found!');
        console.log('   The initialization code should create it automatically.');
      }
    } else {
      console.log('\n   ⚠️  No users found in database!');
    }
  } catch (error) {
    console.log(`   ❌ Error reading file: ${error.message}`);
  }
} else {
  console.log('   ⚠️  File does not exist!');
  console.log('   The initialization code should create it automatically.');
}

// Check blog database
console.log('\n📚 Blog Posts Database:');
console.log(`   Path: ${BLOG_DB_PATH}`);
console.log(`   Exists: ${fs.existsSync(BLOG_DB_PATH)}`);

if (fs.existsSync(BLOG_DB_PATH)) {
  try {
    const stats = fs.statSync(BLOG_DB_PATH);
    console.log(`   Size: ${stats.size} bytes`);
    const data = JSON.parse(fs.readFileSync(BLOG_DB_PATH, 'utf8'));
    console.log(`   Posts count: ${data.posts ? data.posts.length : 0}`);
  } catch (error) {
    console.log(`   ❌ Error reading file: ${error.message}`);
  }
}

console.log('\n' + '='.repeat(60));
console.log('\n💡 Troubleshooting Tips:');
console.log('   1. If auth.json is missing, check if it was copied during Docker build');
console.log('   2. If root user is missing, the initialization code should create it');
console.log('   3. Check application logs for authentication errors');
console.log('   4. Verify file permissions: chmod 644 src/data/auth.json');
console.log('\n');

