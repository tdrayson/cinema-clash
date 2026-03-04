import { ref, computed, watch } from 'vue'
import { fetchMovieDetails } from './useMovieDetails.js'

const movies = ref([])
const loadingIds = ref(new Set())
const sortOrder = ref('none')

function buildUrl(ids) {
  const base = window.location.origin + window.location.pathname
  if (!ids.length) return base
  return `${base}?films=${ids.join(',')}`
}

function updateUrl() {
  const ids = movies.value.map((m) => m.id)
  window.history.replaceState({}, '', buildUrl(ids))
}

function getShareUrl() {
  const ids = movies.value.map((m) => m.id)
  return buildUrl(ids)
}

function getShareMessage() {
  const titles = movies.value.map((m) => m.title)
  const url = getShareUrl()
  if (!titles.length) return url
  return `Check out ${titles.length === 1 ? 'this film' : 'these films'} on Cinema Clash: ${titles.join(', ')} — ${url}`
}

export function useComparison() {
  const sortedMovies = computed(() => {
    if (sortOrder.value === 'none') return movies.value
    return [...movies.value].sort((a, b) => {
      const aScore = a.overall ?? -1
      const bScore = b.overall ?? -1
      return sortOrder.value === 'desc' ? bScore - aScore : aScore - bScore
    })
  })

  async function addMovie(tmdbId) {
    if (movies.value.some((m) => m.id === tmdbId)) return
    if (loadingIds.value.has(tmdbId)) return

    loadingIds.value = new Set([...loadingIds.value, tmdbId])
    try {
      const movie = await fetchMovieDetails(tmdbId)
      if (!movies.value.some((m) => m.id === tmdbId)) {
        movies.value = [...movies.value, movie]
      }
    } finally {
      const next = new Set(loadingIds.value)
      next.delete(tmdbId)
      loadingIds.value = next
    }
  }

  function removeMovie(tmdbId) {
    movies.value = movies.value.filter((m) => m.id !== tmdbId)
  }

  function loadFromUrl() {
    const params = new URLSearchParams(window.location.search)
    const filmsParam = params.get('films')
    if (!filmsParam) return
    const ids = filmsParam.split(',').map(Number).filter(Boolean)
    for (const id of ids) {
      addMovie(id)
    }
  }

  // Keep URL in sync
  watch(movies, updateUrl, { deep: true })

  return {
    movies, sortedMovies, loadingIds, sortOrder,
    addMovie, removeMovie, loadFromUrl,
    getShareUrl, getShareMessage,
  }
}
