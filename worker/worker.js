import { fetchCinemas as fetchCwCinemas, fetchFilms as fetchCwFilms } from './cineworld.js'
import { fetchCinemas as fetchVueCinemas, fetchFilms as fetchVueFilms } from './vue.js'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })
}

function normaliseTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]/g, '')
}

async function handleCinemas(chain) {
  const errors = []

  if (chain === 'cineworld') {
    try {
      const cinemas = await fetchCwCinemas()
      return jsonResponse({ cinemas: cinemas.sort((a, b) => a.name.localeCompare(b.name)), errors })
    } catch (e) {
      return jsonResponse({ cinemas: [], errors: [e.message] }, 502)
    }
  }

  if (chain === 'vue') {
    try {
      const cinemas = await fetchVueCinemas()
      return jsonResponse({ cinemas: cinemas.sort((a, b) => a.name.localeCompare(b.name)), errors })
    } catch (e) {
      return jsonResponse({ cinemas: [], errors: [e.message] }, 502)
    }
  }

  // Both chains
  const [cwResult, vueResult] = await Promise.allSettled([
    fetchCwCinemas(),
    fetchVueCinemas(),
  ])

  const cinemas = []
  if (cwResult.status === 'fulfilled') {
    cinemas.push(...cwResult.value)
  } else {
    errors.push(cwResult.reason?.message || 'Cineworld fetch failed')
  }
  if (vueResult.status === 'fulfilled') {
    cinemas.push(...vueResult.value)
  } else {
    errors.push(vueResult.reason?.message || 'Vue fetch failed')
  }

  cinemas.sort((a, b) => a.name.localeCompare(b.name))
  return jsonResponse({ cinemas, errors })
}

async function handleFilms(idString, date) {
  if (!date) {
    return jsonResponse({ films: [], errors: ['Missing date query parameter'] }, 400)
  }

  const ids = idString.split(',').map(s => s.trim()).filter(Boolean)
  const errors = []

  // Group by chain
  const cwIds = []
  const vueIds = []
  for (const id of ids) {
    if (id.startsWith('cw-')) cwIds.push({ id, rawId: id.slice(3) })
    else if (id.startsWith('vue-')) vueIds.push({ id, rawId: id.slice(4) })
    else errors.push(`Unknown chain prefix: ${id}`)
  }

  // Fetch all in parallel
  const fetches = [
    ...cwIds.map(async ({ id, rawId }) => {
      try {
        const films = await fetchCwFilms(rawId, date)
        return { cinemaId: id, chain: 'cineworld', films }
      } catch (e) {
        errors.push(`${id}: ${e.message}`)
        return { cinemaId: id, chain: 'cineworld', films: [] }
      }
    }),
    ...vueIds.map(async ({ id, rawId }) => {
      try {
        const films = await fetchVueFilms(rawId, date)
        return { cinemaId: id, chain: 'vue', films }
      } catch (e) {
        errors.push(`${id}: ${e.message}`)
        return { cinemaId: id, chain: 'vue', films: [] }
      }
    }),
  ]

  const results = await Promise.all(fetches)

  // Merge by normalised title
  const titleMap = new Map()
  for (const { cinemaId, chain, films } of results) {
    for (const film of films) {
      const key = normaliseTitle(film.title)
      if (!titleMap.has(key)) {
        titleMap.set(key, {
          title: film.title,
          posterUrl: film.posterUrl || null,
          durationMins: film.durationMins || null,
          releaseYear: film.releaseYear || null,
          cinemaShowtimes: [],
        })
      }
      const entry = titleMap.get(key)
      if (!entry.posterUrl && film.posterUrl) entry.posterUrl = film.posterUrl
      if (!entry.durationMins && film.durationMins) entry.durationMins = film.durationMins
      if (!entry.releaseYear && film.releaseYear) entry.releaseYear = film.releaseYear

      entry.cinemaShowtimes.push({
        cinemaId,
        chain,
        showtimes: film.showtimes || [],
      })
    }
  }

  const films = Array.from(titleMap.values()).sort((a, b) =>
    a.title.localeCompare(b.title)
  )

  return jsonResponse({ films, errors })
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS })
    }

    const url = new URL(request.url)
    const path = url.pathname

    // GET /cinemas
    if (path === '/cinemas') {
      return handleCinemas()
    }

    // GET /cinemas/vue
    if (path === '/cinemas/vue') {
      return handleCinemas('vue')
    }

    // GET /cinemas/cineworld
    if (path === '/cinemas/cineworld') {
      return handleCinemas('cineworld')
    }

    // GET /cinemas/:ids/films?date=YYYY-MM-DD
    const filmsMatch = path.match(/^\/cinemas\/([^/]+)\/films$/)
    if (filmsMatch) {
      const date = url.searchParams.get('date')
      return handleFilms(filmsMatch[1], date)
    }

    return new Response('Not found', { status: 404, headers: CORS_HEADERS })
  },
}
