<script setup>
import { ref, provide, computed, onMounted } from 'vue'
import SearchBar from './components/SearchBar.vue'
import ComparisonGrid from './components/ComparisonGrid.vue'
import TrailerModal from './components/TrailerModal.vue'
import CinemaModal from './components/CinemaModal.vue'
import CinemaBar from './components/CinemaBar.vue'
import { useComparison } from './composables/useComparison.js'
import { tmdbFetch } from './utils/api.js'

const { movies, loadFromUrl, addMovie, setShowtimes } = useComparison()
const trailerVideoId = ref(null)
const searchBar = ref(null)
const stickyHeader = ref(null)

const filmCount = computed(() => movies.value.length)

function openTrailer(key) {
  trailerVideoId.value = key
}

function closeTrailer() {
  trailerVideoId.value = null
}

provide('openTrailer', openTrailer)

async function onAddCinemaFilms(films) {
  for (const film of films) {
    try {
      const params = { query: film.name }
      if (film.releaseYear) params.year = film.releaseYear
      const data = await tmdbFetch('/search/movie', params)
      if (data.results && data.results.length > 0) {
        const tmdbId = data.results[0].id
        await addMovie(tmdbId)
        if (film.showtimes?.length) {
          setShowtimes(tmdbId, film.showtimes)
        }
      }
    } catch {
      // skip films that can't be found
    }
  }
}

onMounted(() => {
  loadFromUrl()
  if (stickyHeader.value) {
    const update = () => {
      document.documentElement.style.setProperty('--sticky-header-h', stickyHeader.value.offsetHeight + 'px')
    }
    update()
    new ResizeObserver(update).observe(stickyHeader.value)
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="border-b border-border">
      <div class="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        <h1 class="font-serif text-xl text-ink">CinemaSync</h1>
        <div class="flex items-center gap-4">
          <p class="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-ink-lighter">
            Built by <a href="https://taylordrayson.com" target="_blank" rel="noopener" aria-label="Taylor Drayson (opens in a new tab)" class="text-ink hover:text-accent transition-colors">Taylor Drayson</a>
          </p>
          <a href="https://github.com/tdrayson/cinema-clash" target="_blank" rel="noopener" aria-label="Open GitHub repo (opens in a new tab)" class="text-ink-lighter hover:text-ink transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>

    <!-- Secondary bar -->
    <div ref="stickyHeader" class="sticky top-0 z-20 bg-cream">
      <SearchBar ref="searchBar" />
      <CinemaBar />
    </div>

    <!-- Main -->
    <main class="flex-1 py-8 w-full grid-breakout">
      <ComparisonGrid @add="searchBar?.openSearch()" />
    </main>

    <!-- Footer -->
    <footer class="border-t border-border">
      <div class="max-w-[1400px] mx-auto px-6 py-4">
        <p class="text-[10px] uppercase tracking-widest text-ink-lighter">
          CinemaSync &middot; Film Comparison Tool
        </p>
      </div>
    </footer>

    <!-- Trailer Modal -->
    <TrailerModal :video-id="trailerVideoId" @close="closeTrailer" />
    <CinemaModal @add-films="onAddCinemaFilms" />
  </div>
</template>
