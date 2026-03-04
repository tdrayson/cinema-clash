<script setup>
import { ref, provide, computed, onMounted } from 'vue'
import SearchBar from './components/SearchBar.vue'
import ComparisonGrid from './components/ComparisonGrid.vue'
import TrailerModal from './components/TrailerModal.vue'
import { useComparison } from './composables/useComparison.js'

const { movies, loadFromUrl } = useComparison()
const trailerVideoId = ref(null)
const searchBar = ref(null)

const filmCount = computed(() => movies.value.length)

function openTrailer(key) {
  trailerVideoId.value = key
}

function closeTrailer() {
  trailerVideoId.value = null
}

provide('openTrailer', openTrailer)

onMounted(loadFromUrl)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="border-b border-border">
      <div class="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        <h1 class="font-serif text-xl text-ink">Cinema Clash</h1>
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
    <SearchBar ref="searchBar" />

    <!-- Main -->
    <main class="flex-1 max-w-[1400px] mx-auto px-6 py-8 w-full">
      <ComparisonGrid @add="searchBar?.openSearch()" />
    </main>

    <!-- Footer -->
    <footer class="border-t border-border">
      <div class="max-w-[1400px] mx-auto px-6 py-4">
        <p class="text-[10px] uppercase tracking-widest text-ink-lighter">
          Cinema Clash &middot; Film Comparison Tool
        </p>
      </div>
    </footer>

    <!-- Trailer Modal -->
    <TrailerModal :video-id="trailerVideoId" @close="closeTrailer" />
  </div>
</template>
