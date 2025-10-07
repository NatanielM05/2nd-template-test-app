#!/usr/bin/env node
/**
 * Test script to verify database initialization works correctly
 * Run with: pnpm test:init
 */

import { Database } from './index.js';

async function testInit() {
  console.log('🧪 Testing database initialization...');

  const db = new Database('./data/test-db.json');

  try {
    await db.init();
    console.log('✅ Database initialized successfully');

    // Test creating a record
    console.log('🧪 Testing create operation...');
    const testTask = await db.createTask({
      title: 'Test Task',
      description: 'This is a test task',
    });
    console.log('✅ Created test task:', testTask.id);

    // Test reading
    console.log('🧪 Testing read operation...');
    const tasks = await db.getTasks();
    console.log('✅ Found', tasks.length, 'task(s)');

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testInit();
