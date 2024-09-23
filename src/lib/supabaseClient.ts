import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://niujjitgvtwqxgzxfjza.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdWpqaXRndnR3cXhnenhmanphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxMTE4MzQsImV4cCI6MjA0MjY4NzgzNH0.n-5qZ3H6JnPKz6mhGuWvDQS3ymrpgb6R0Y4UUReSkRs'
);
