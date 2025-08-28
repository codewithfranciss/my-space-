const fs = require('fs');
const path = require('path');
const { writeEnv } = require('./lib/writeEnv');

const envPath = path.resolve(process.cwd(), '.env');

// Helper to read current .env content and log it
function logEnvFile() {
  if (!fs.existsSync(envPath)) {
    console.log('.env file does not exist yet');
    return;
  }
  const content = fs.readFileSync(envPath, 'utf8');
  console.log('Current .env content:\n', content);
}

async function test() {
  console.log('--- Before writing ---');
  logEnvFile();

  console.log('\nWriting new variables...\n');

  writeEnv({
    TEST_KEY: 'hello_world',
    ANOTHER_KEY: '12345',
  });

  console.log('--- After writing ---');
  logEnvFile();

  // Now test updating existing key
  console.log('\nUpdating TEST_KEY...\n');

  writeEnv({
    TEST_KEY: 'updated_value',
  });

  console.log('--- After updating ---');
  logEnvFile();
}

test();
