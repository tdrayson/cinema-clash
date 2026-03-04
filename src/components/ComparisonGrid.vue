<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import MovieCard from './MovieCard.vue'
import { useComparison } from '../composables/useComparison.js'

const { sortedMovies, loadingIds, removeMovie, movieShowtimes } = useComparison()

defineEmits(['add'])

const track = ref(null)
let isDragging = false
let startX = 0
let startScroll = 0
let hasMoved = false

function onMouseDown(e) {
  isDragging = true
  hasMoved = false
  startX = e.pageX
  startScroll = track.value.scrollLeft
  track.value.style.cursor = 'grabbing'
  track.value.style.userSelect = 'none'
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(e) {
  if (!isDragging) return
  const dx = e.pageX - startX
  if (Math.abs(dx) > 3) hasMoved = true
  track.value.scrollLeft = startScroll - dx
}

function onMouseUp() {
  isDragging = false
  track.value.style.cursor = ''
  track.value.style.userSelect = ''
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  if (hasMoved) {
    track.value.addEventListener('click', suppress, { capture: true, once: true })
  }
}

function suppress(e) {
  e.stopPropagation()
  e.preventDefault()
}

const canScrollLeft = ref(false)
const canScrollRight = ref(false)
const canScroll = computed(() => canScrollLeft.value || canScrollRight.value)

function checkOverflow() {
  if (!track.value) return
  const el = track.value
  canScrollLeft.value = el.scrollLeft > 1
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

function scrollBy(direction) {
  if (!track.value) return
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
  track.value?.removeEventListener('scroll', checkOverflow)
  resizeObserver?.disconnect()
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
})

watch([sortedMovies, loadingIds], () => nextTick(checkOverflow))
</script>

<template>
  <div>
    <!-- Title & scroll arrows -->
    <div class="max-w-[1400px] mx-auto px-6 flex items-center justify-between mb-2">
      <h2 v-if="sortedMovies.length" class="font-serif text-2xl text-ink">
        {{ sortedMovies.length }} {{ sortedMovies.length === 1 ? 'Film' : 'Films' }} for Comparison
      </h2>
      <span v-else></span>
      <div
        v-if="canScrollLeft || canScrollRight"
        class="flex gap-2"
      >
      <button
        :disabled="!canScrollLeft"
        @click="scrollBy(-1)"
        class="w-7 h-7 flex items-center justify-center border border-border hover:border-ink-lighter disabled:opacity-25 disabled:cursor-default cursor-pointer transition-colors"
        aria-label="Scroll left"
      >
        <svg class="w-3.5 h-3.5 text-ink" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10 3l-5 5 5 5" />
        </svg>
      </button>
      <button
        :disabled="!canScrollRight"
        @click="scrollBy(1)"
        class="w-7 h-7 flex items-center justify-center border border-border hover:border-ink-lighter disabled:opacity-25 disabled:cursor-default cursor-pointer transition-colors"
        aria-label="Scroll right"
      >
        <svg class="w-3.5 h-3.5 text-ink" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 3l5 5-5 5" />
        </svg>
      </button>
      </div>
    </div>

    <!-- Scrollable track -->
    <div
      ref="track"
      class="flex gap-8 overflow-x-auto hide-scrollbar pb-4"
      :class="canScroll ? 'cursor-grab' : ''"
      @mousedown="onMouseDown"
    >
    <div class="grid-breakout-spacer shrink-0" aria-hidden="true"></div>
    <MovieCard
      v-for="movie in sortedMovies"
      :key="movie.id"
      :movie="movie"
      :showtimes="movieShowtimes.get(movie.id)"
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
    <div class="grid-breakout-spacer shrink-0" aria-hidden="true"></div>
    </div>
  </div>
</template>
