#!/usr/bin/env node

/**
 * Script to verify data files exist and contain data
 * Run this after deployment to ensure data is preserved
 */

const fs = require('fs');
const path = require('path');

const BLOG_DB_PATH = path.join(process.cwd(), 'data', 'blog-posts.json');
const AUTH_DB_PATH = path.join(process.cwd(), 'src', 'data', 'auth.json');

console.log('🔍 Verifying data files...\n');

let hasErrors = false;

// Check blog posts
console.log('📝 Checking blog posts database...');
if (fs.existsSync(BLOG_DB_PATH)) {
  try {
    const data = JSON.parse(fs.readFileSync(BLOG_DB_PATH, 'utf8'));
    const postCount = data.posts ? data.posts.length : 0;
    console.log(`   ✅ Blog posts file exists`);
    console.log(`   📊 Posts count: ${postCount}`);
    
    if (postCount === 0) {
      console.log('   ⚠️  WARNING: Blog posts database is empty!');
      hasErrors = true;
    }
  } catch (error) {
    console.log(`   ❌ Error reading blog posts: ${error.message}`);
    hasErrors = true;
  }
} else {
  console.log('   ❌ Blog posts file does not exist!');
  hasErrors = true;
}

// Check auth database
console.log('\n👤 Checking authentication database...');
if (fs.existsSync(AUTH_DB_PATH)) {
  try {
    const data = JSON.parse(fs.readFileSync(AUTH_DB_PATH, 'utf8'));
    const userCount = data.users ? data.users.length : 0;
    const rootUser = data.users ? data.users.find(u => u.email === 'root@bloom-bi.it') : null;
    
    console.log(`   ✅ Auth file exists`);
    console.log(`   📊 Users count: ${userCount}`);
    
    if (userCount === 0) {
      console.log('   ⚠️  WARNING: Authentication database is empty!');
      hasErrors = true;
    }
    
    if (!rootUser) {
      console.log('   ⚠️  WARNING: Root user not found!');
      hasErrors = true;
    } else {
      console.log(`   ✅ Root user found: ${rootUser.email}`);
    }
  } catch (error) {
    console.log(`   ❌ Error reading auth database: ${error.message}`);
    hasErrors = true;
  }
} else {
  console.log('   ❌ Auth file does not exist!');
  hasErrors = true;
}

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.log('❌ Data verification failed!');
  console.log('\n⚠️  Action required:');
  console.log('   1. Check if files were deployed correctly');
  console.log('   2. Restore from git if needed');
  console.log('   3. Check file permissions');
  process.exit(1);
} else {
  console.log('✅ All data files verified successfully!');
  process.exit(0);
}

