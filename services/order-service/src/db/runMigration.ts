import { createOrdersTable } from './migration';

export async function runMigrations() {
  try {
    console.log('Running database migrations...');
    await createOrdersTable();
    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

