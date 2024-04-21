# SuperFans
- If you update your Supabase tables remember to run <code>npx supabase gen types typescript --project-id "Mention Project ID here" --schema public > lib/types/supabase.ts</code>
## Getting Started
- <code>npm i</code>
- <code>npm run dev</code>
## TechStack Used
- Supabase
- Nextjs
- TypeScript
- TailwindCSS
- ShadCn

## How Routes Work?
- Every folder under /app is a new route and page.tsx acts as the content for that route
- For dynamic routing under a route we nest a folder and the name of route is kept as [some dynamic name], have used this for artist routes
