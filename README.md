# SuperFans
- If you update your Supabase tables remember to run <code>npx supabase gen types typescript --project-id "Mention Project ID here" --schema public > lib/types/supabase.ts</code>
## Getting Started
### Initial dependency installation
- <code>npm i</code>
### Run the server
- <code>npm run dev</code>
## TechStack Used
- Supabase
- Nextjs
- TypeScript
- TailwindCSS
- ShadCn
- React Query

## How Routes Work?
- Every folder under /app is a new route and page.tsx acts as the content for that route
- For dynamic routing under a route we nest a folder and the name of route is kept as [some dynamic name], have used this for artist routes

## Environment
Refer **env-example.txt** and create a **.env.local** file

## Folder Structure
### App
```
└── 📁app
    └── 📁auth
        └── 📁callback
            └── route.ts
    └── 📁bookings
        └── page.tsx
    └── 📁error
        └── page.tsx
    └── 📁explore
        └── 📁artist
            └── 📁[id]
                └── page.tsx
        └── page.tsx
    └── head.tsx
    └── 📁hook
        └── useUser.tsx
    └── layout.tsx
    └── page.tsx
    └── providers.tsx
    └── 📁signin
        └── page.tsx
    └── 📁signup
        └── page.tsx
```
### Components
```
└── 📁components
    └── 📁Bookings
        └── bookingDashboard.tsx
    └── 📁Common
        └── Breadcrumb.tsx
        └── ScrollUp.tsx
        └── SectionTitle.tsx
    └── 📁Explore
        └── artist.tsx
        └── artistInfo.tsx
        └── explore.tsx
    └── 📁Footer
        └── index.tsx
    └── 📁Header
        └── ThemeToggler.tsx
        └── buttonAvatar.tsx
        └── index.tsx
        └── menuData.tsx
    └── 📁Hero
        └── HeroScroll.tsx
        └── brandsScroll.tsx
        └── heroTooltip.tsx
        └── imageGrid.tsx
        └── index.tsx
    └── 📁ScrollToTop
        └── index.tsx
    └── query-provider.tsx
    └── 📁ui
        └── animated-tooltip.tsx
        └── button.tsx
        └── container-scroll-animation.tsx
        └── input.tsx
        └── label.tsx
        └── skeleton.tsx
        └── table.tsx
        └── textarea.tsx
```
### Lib
```
└── 📁lib
    └── 📁constants
        └── index.ts
    └── 📁supabase
        └── browser.ts
        └── server.ts
    └── 📁types
        └── supabase.ts
    └── utils.ts
```
