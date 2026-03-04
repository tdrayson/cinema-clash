# Cinema Clash

A film comparison tool built with Vue 3. Search for movies, add them to a side-by-side grid, and compare ratings, cast, trailers, and more.

**[Live Demo](https://tdrayson.github.io/cinema-clash/)**

## Features

- **Search & Compare** — Search films with autocomplete and compare them side-by-side in a scrollable grid
- **Aggregated Ratings** — Scores from IMDB, Rotten Tomatoes, and Metacritic with visual rating bars and an overall score
- **Trailers** — Watch YouTube trailers directly in the app
- **Shareable Links** — Generate a URL with your selected films to share with others
- **Sort** — Order films by score or the order they were added
- **Responsive** — Works across desktop and mobile

## Tech Stack

- [Vue 3](https://vuejs.org/) (Composition API with `<script setup>`)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Plyr](https://plyr.io/) (trailer playback)

## Getting Started

### Prerequisites

You'll need API keys from:

- [TMDB](https://www.themoviedb.org/settings/api) — movie data, images, trailers
- [OMDB](http://www.omdbapi.com/apikey.aspx) — IMDB, Rotten Tomatoes, and Metacritic ratings

### Installation

```bash
git clone https://github.com/tdrayson/cinema-clash.git
cd cinema-clash
npm install
```

Create a `.env` file from the example and add your keys:

```bash
cp .env.example .env
```

```
VITE_TMDB_API_KEY=your_tmdb_key
VITE_OMDB_API_KEY=your_omdb_key
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The output is in the `docs/` folder.

### Preview Build Locally

```bash
npm run preview
```

## Deployment

The site is deployed to GitHub Pages from the `docs/` folder. After building, commit the `docs/` folder and push:

```bash
npm run build
git add docs
git commit -m "Build for deployment"
git push
```

Then in your GitHub repo settings, set Pages to deploy from the `docs/` folder on your main branch.

## Project Structure

```
src/
├── components/
│   ├── ComparisonGrid.vue    # Scrollable film grid
│   ├── MovieCard.vue         # Individual film card
│   ├── RatingDisplay.vue     # Ratings section
│   ├── RatingBar.vue         # Single rating bar
│   ├── SearchBar.vue         # Search input, sort, and share controls
│   ├── SearchResultItem.vue  # Search dropdown item
│   ├── ShareButton.vue       # Share modal with copy options
│   └── TrailerModal.vue      # Trailer video player
├── composables/
│   ├── useComparison.js      # Film list state, sorting, sharing
│   ├── useMovieSearch.js     # Search and popular films
│   └── useMovieDetails.js    # Fetch film details from APIs
├── utils/
│   ├── api.js                # TMDB and OMDB API wrappers
│   └── ratings.js            # Rating normalisation
├── App.vue
├── main.js
└── style.css
```
