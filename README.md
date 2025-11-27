#run backend
uvicorn main:app --reload

## Environment setup

Create a `.env` file in the project root (same level as `package.json`) with:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
```

Restart the dev server after adding env variables.

## Supabase migrations

Apply migrations (requires Supabase CLI):

```
supabase db push
```

Ensure you are authenticated to the correct project before pushing.