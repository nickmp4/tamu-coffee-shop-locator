import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnon = process.env.SUPABASE_ANON_KEY;
const SUPABASE_URL = 'https://hcxmubtfpminwqqlknff.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjeG11YnRmcG1pbndxcWxrbmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzOTcwNzQsImV4cCI6MjA3MTk3MzA3NH0.By_2BnPaZZfKUT_CLX3AsQovpsZ2jVaHNmy5IZGeo2M'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);