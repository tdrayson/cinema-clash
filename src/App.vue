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
        <p class="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-ink-lighter">
          Compare &middot; Contrast &middot; Decide
        </p>
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
