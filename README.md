# Recommender

A personal media recommendation board built with SvelteKit. Browse and filter movie, TV show, album, and book recommendations in a card-based UI, backed by Supabase for storage and TMDB / iTunes for media lookups.

## Features

- Card grid of recommendations with poster art, title, description, and type badge
- Filter by media type (movies, TV shows, albums)
- Detail modal for each recommendation
- Server-side search integration with TMDB (movies, shows) and iTunes (albums)
- Supabase-backed persistence for posts

## Tech Stack

- [SvelteKit](https://svelte.dev/docs/kit) + [Svelte 5](https://svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/)
- [Supabase](https://supabase.com/) (database)
- [TMDB](https://github.com/leandrowkz/tmdb) (movies/shows search)
- [node-itunes-search](https://github.com/jacob-shuman/node-itunes-search) (album search)
- [Vite](https://vitejs.dev/)

## Getting Started

### Prerequisites

- Node.js
- A [Supabase](https://supabase.com/) project
- A [TMDB API key](https://www.themoviedb.org/settings/api)

### Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create a `.env` file in the project root with the following variables:

   ```
   PUBLIC_SUPABASE_URL=your-supabase-project-url
   PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-supabase-publishable-key
   TMDB_API_KEY=your-tmdb-api-key
   ```

3. In your Supabase project, create a `posts` table with columns for `id`, `title`, `description`, `image_link`, and `type`.

### Development

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

```sh
npm run build
```

Preview the production build with:

```sh
npm run preview
```

> You may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your deployment target.

### Other scripts

- `npm run check` — type-check the project with `svelte-check`
- `npm run lint` — check formatting with Prettier
- `npm run format` — auto-format the project with Prettier

## Project Structure

```
src/
├── lib/
│   ├── server/
│   │   ├── tmdb.ts       # TMDB search (movies, shows)
│   │   └── itunes.ts     # iTunes search (albums)
│   ├── supabaseClient.ts # Supabase client + post creation
│   └── types.ts          # Shared types
└── routes/
    ├── +page.svelte       # Main recommendation board
    ├── +page.server.ts    # Loads posts, handles post creation
    └── api/
        ├── movies/+server.ts
        ├── shows/+server.ts
        └── albums/+server.ts
```

## Credits

- TMDB API: https://github.com/leandrowkz/tmdb
- node-itunes-search: https://github.com/jacob-shuman/node-itunes-search