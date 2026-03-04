<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import MovieCard from './MovieCard.vue'
import { useComparison } from '../composables/useComparison.js'

const { sortedMovies, loadingIds, removeMovie } = useComparison()

defineEmits(['add'])

const track = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

function checkOverflow() {
  if (!track.value) return
  const el = track.value
  canScrollLeft.value = el.scrollLeft > 1
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

function scrollBy(direction) {
  if (!track.value) return
  // Scroll by roughly one card width + gap
  track.value.scrollBy({ left: direction * 304, behavior: 'smooth' })
}

let resizeObserver = null

onMounted(() => {
  checkOverflow()
  if (track.value) {
    track.value.addEventListener('scroll', checkOverflow, { passive: true })
    resizeObserver = new ResizeObserver(checkOverflow)
    resizeObserver.observe(track.value)
  }
})

onBeforeUnmount(() => {
  if (track.value) {
    track.value.removeEventListener('scroll', checkOverflow)
  }
  resizeObserver?.disconnect()
})

// Recheck when movies change
watch([sortedMovies, loadingIds], () => {
  nextTick(checkOverflow)
})
</script>

<template>
  <div class="relative">
    <!-- Left arrow -->
    <button
      v-if="canScrollLeft"
      @click="scrollBy(-1)"
      class="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-start pt-36 justify-center bg-gradient-to-r from-cream to-transparent cursor-pointer"
      aria-label="Scroll left"
    >
      <svg class="w-5 h-5 text-ink" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10 3l-5 5 5 5" />
      </svg>
    </button>

    <!-- Track -->
    <div
      ref="track"
      class="flex gap-8 overflow-x-auto hide-scrollbar pb-4"
    >
      <MovieCard
        v-for="movie in sortedMovies"
        :key="movie.id"
        :movie="movie"
        @remove="removeMovie"
      />
      <!-- Loading placeholders -->
      <div
        v-for="id in loadingIds"
        :key="'loading-' + id"
        class="w-72 shrink-0 animate-pulse"
      >
        <div class="flex justify-end mb-1">
          <span class="text-lg leading-none invisible">&times;</span>
        </div>
        <div class="w-full aspect-[2/3] bg-cream-dark border border-border" />
        <div class="mt-4 space-y-3">
          <div class="h-8 bg-cream-dark w-16" />
          <div class="h-6 bg-cream-dark w-3/4" />
          <div class="h-3 bg-cream-dark w-1/2" />
          <div class="flex gap-1.5 mt-3">
            <div class="h-5 bg-cream-dark w-16" />
            <div class="h-5 bg-cream-dark w-12" />
          </div>
          <div class="h-3 bg-cream-dark w-full mt-3" />
          <div class="h-3 bg-cream-dark w-5/6" />
        </div>
      </div>

      <!-- Add film placeholder -->
      <div class="w-72 shrink-0 self-start">
        <div class="flex justify-end mb-1">
          <span class="text-lg leading-none invisible">&times;</span>
        </div>
        <button
          @click="$emit('add')"
          class="w-full aspect-[2/3] border-2 border-dashed border-border hover:border-ink-lighter focus:border-ink-lighter transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer group focus:outline-none"
        >
          <span class="text-3xl text-ink-lighter group-hover:text-ink group-focus:text-ink transition-colors leading-none">
            +
          </span>
          <span class="text-xs uppercase tracking-widest text-ink-lighter group-hover:text-ink group-focus:text-ink transition-colors font-medium">
            Add Film
          </span>
        </button>
      </div>
    </div>

    <!-- Right arrow -->
    <button
      v-if="canScrollRight"
      @click="scrollBy(1)"
      class="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-start pt-36 justify-center bg-gradient-to-l from-cream to-transparent cursor-pointer"
      aria-label="Scroll right"
    >
      <svg class="w-5 h-5 text-ink" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 3l5 5-5 5" />
      </svg>
    </button>
  </div>
</template>
