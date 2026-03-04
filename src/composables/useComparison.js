import { ref, computed, watch } from 'vue'
import { fetchMovieDetails } from './useMovieDetails.js'

const movies = ref([])
const loadingIds = ref(new Set())
const sortOrder = ref(localStorage.getItem('sortOrder') || 'none')
const movieShowtimes = ref(new Map())

function buildUrl(ids) {
  const base = window.location.origin + window.location.pathname
  if (!ids.length) return base

  const data = { f: ids }

  const showtimesObj = {}
  for (const id of ids) {
    const st = movieShowtimes.value.get(id)
    if (st && st.length) {
      showtimesObj[id] = st.map(({ cinema, chain, time }) => ({
        c: cinema,
        ch: chain,
        t: time,
      }))
    }
  }
  if (Object.keys(showtimesObj).length) {
    data.s = showtimesObj
  }

  const hash = btoa(JSON.stringify(data))
  return `${base}#${hash}`
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
  return `Check out ${titles.length === 1 ? 'this film' : 'these films'} on CinemaSync: ${titles.join(', ')} — ${url}`
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

  function setShowtimes(tmdbId, showtimes) {
    const next = new Map(movieShowtimes.value)
    next.set(tmdbId, showtimes)
    movieShowtimes.value = next
  }

  function removeMovie(tmdbId) {
    movies.value = movies.value.filter((m) => m.id !== tmdbId)
    if (movieShowtimes.value.has(tmdbId)) {
      const next = new Map(movieShowtimes.value)
      next.delete(tmdbId)
      movieShowtimes.value = next
    }
  }

  function clearMovies() {
    movies.value = []
    movieShowtimes.value = new Map()
  }

  function loadFromUrl() {
    const hash = window.location.hash.slice(1)
    if (hash) {
      try {
        const data = JSON.parse(atob(hash))
        const ids = data.f || []
        for (const id of ids) {
          addMovie(id)
        }
        if (data.s) {
          for (const [movieId, showtimes] of Object.entries(data.s)) {
            setShowtimes(
              Number(movieId),
              showtimes.map((st) => ({ cinema: st.c, chain: st.ch, time: st.t }))
            )
          }
        }
        return
      } catch {
        // invalid hash, fall through to legacy format
      }
    }

    // Legacy format: ?films=550,278
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
  watch(movieShowtimes, updateUrl, { deep: true })
  watch(sortOrder, (val) => localStorage.setItem('sortOrder', val))

  return {
    movies, sortedMovies, loadingIds, sortOrder, movieShowtimes,
    addMovie, removeMovie, clearMovies, loadFromUrl, setShowtimes,
    getShareUrl, getShareMessage,
  }
}
