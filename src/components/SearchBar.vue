<script setup>
import { ref, computed, nextTick } from 'vue'
import SearchResultItem from './SearchResultItem.vue'
import ShareButton from './ShareButton.vue'
import { useMovieSearch } from '../composables/useMovieSearch.js'
import { useComparison } from '../composables/useComparison.js'

const { query, results, popular, loading, fetchPopular } = useMovieSearch()
const { addMovie, sortOrder } = useComparison()
const open = ref(false)
const searchInput = ref(null)
const container = ref(null)
let justSelected = false

const showResults = computed(() => {
  if (query.value.trim().length >= 2) return results.value
  if (open.value) return popular.value
  return []
})

const dropdownLabel = computed(() => {
  if (query.value.trim().length >= 2) return null
  return 'Popular Now'
})

function onFocus() {
  if (justSelected) {
    justSelected = false
    return
  }
  open.value = true
  fetchPopular()
}

function onFocusOut(e) {
  // If focus moves to something still inside our container, keep open
  if (container.value?.contains(e.relatedTarget)) return
  open.value = false
}

function openSearch() {
  open.value = true
  fetchPopular()
  nextTick(() => searchInput.value?.focus())
}

function onSelect(tmdbId) {
  addMovie(tmdbId)
  query.value = ''
  results.value = []
  open.value = false
  justSelected = true
  searchInput.value?.focus()
}

function onInputKeydown(e) {
  if (e.key === 'Escape') {
    open.value = false
    searchInput.value?.blur()
  }
}

defineExpose({ openSearch })
</script>

<template>
  <div class="border-b border-border">
    <div class="max-w-[1400px] mx-auto px-6 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
      <div ref="container" class="relative flex-1 min-w-[180px] max-w-xs" @focusout="onFocusOut">
        <div class="relative">
          <input
            ref="searchInput"
            v-model="query"
            @focus="onFocus"
            @keydown="onInputKeydown"
            type="text"
            role="combobox"
            aria-autocomplete="list"
            :aria-expanded="open && showResults.length > 0"
            aria-controls="search-listbox"
            placeholder="Search films..."
            class="w-full px-3 py-1.5 bg-white text-ink border border-border focus:border-ink focus:outline-none placeholder-ink-lighter text-sm"
          />
          <div v-if="loading" class="absolute right-3 top-1/2 -translate-y-1/2">
            <div class="w-3.5 h-3.5 border-2 border-ink border-t-transparent rounded-full animate-spin" />
          </div>
        </div>

        <!-- Dropdown -->
        <div
          v-if="open && showResults.length"
          id="search-listbox"
          role="listbox"
          class="absolute top-full left-0 mt-1 w-full bg-cream border border-border-dark shadow-lg z-40"
        >
          <p v-if="dropdownLabel" class="px-4 py-2 text-[10px] uppercase tracking-widest text-ink-lighter font-medium border-b border-border">
            {{ dropdownLabel }}
          </p>
          <div class="max-h-80 overflow-y-auto">
            <SearchResultItem
              v-for="movie in showResults"
              :key="movie.id"
              :movie="movie"
              role="option"
              @select="onSelect"
            />
          </div>
        </div>
        <div
          v-else-if="open && query.length >= 2 && !loading"
          class="absolute top-full left-0 mt-1 w-full bg-cream border border-border-dark shadow-lg z-40"
        >
          <div class="px-4 py-6 text-center text-sm text-ink-lighter" role="status">
            No results found
          </div>
        </div>
      </div>

      <!-- Divider + Sort -->
      <div class="border-l border-border h-6 hidden sm:block" />

      <div class="flex items-center gap-2">
        <label for="sort-select" class="text-[10px] uppercase tracking-widest text-ink-lighter font-medium shrink-0 hidden sm:block">
          Sort
        </label>
        <select
          id="sort-select"
          v-model="sortOrder"
          class="text-xs bg-white text-ink border border-border focus:border-ink focus:outline-none py-1.5 px-2 cursor-pointer"
        >
          <option value="none">Order added</option>
          <option value="desc">Score: high to low</option>
          <option value="asc">Score: low to high</option>
        </select>
      </div>

      <div class="ml-auto">
        <ShareButton />
      </div>
    </div>
  </div>
</template>
