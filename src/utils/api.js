const TMDB_BASE = 'https://api.themoviedb.org/3'
const OMDB_BASE = 'https://www.omdbapi.com'
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

export async function tmdbFetch(path, params = {}) {
  const url = new URL(`${TMDB_BASE}${path}`)
  url.searchParams.set('api_key', import.meta.env.VITE_TMDB_API_KEY)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`)
  return res.json()
}

export async function omdbFetch(params = {}) {
  const url = new URL(OMDB_BASE)
  url.searchParams.set('apikey', import.meta.env.VITE_OMDB_API_KEY)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error(`OMDB error: ${res.status}`)
  return res.json()
}

export function tmdbImage(path, size = 'w500') {
  if (!path) return null
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}
