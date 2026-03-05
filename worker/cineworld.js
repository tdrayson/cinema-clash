const CINEWORLD_BASE = 'https://www.cineworld.co.uk/uk/data-api-service/v1/quickbook/10108'

const HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'Mozilla/5.0',
}

export async function fetchCinemas() {
  const until = new Date()
  until.setDate(until.getDate() + 30)
  const y = until.getFullYear()
  const m = String(until.getMonth() + 1).padStart(2, '0')
  const d = String(until.getDate()).padStart(2, '0')
  const dateStr = `${y}-${m}-${d}`

  const url = `${CINEWORLD_BASE}/cinemas/with-event/until/${dateStr}?attr=&lang=en_GB`
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`Cineworld cinemas: ${res.status}`)
  const data = await res.json()

  return (data.body.cinemas || []).map(c => ({
    id: `cw-${c.id}`,
    rawId: String(c.id),
    name: c.displayName,
    fullName: c.fullName || c.displayName,
    chain: 'cineworld',
    address: c.address || null,
  }))
}

export async function fetchFilms(rawId, date) {
  const url = `${CINEWORLD_BASE}/film-events/in-cinema/${rawId}/at-date/${date}?attr=&lang=en_GB`
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`Cineworld films: ${res.status}`)
  const data = await res.json()

  const films = data.body.films || []
  const events = data.body.events || []

  const filmMap = new Map()
  for (const film of films) {
    filmMap.set(film.id, {
      title: film.name,
      posterUrl: film.posterLink && !film.posterLink.includes('placeholder') ? film.posterLink : null,
      durationMins: film.length || null,
      releaseYear: film.releaseYear || null,
      showtimes: [],
    })
  }

  const SCREEN_TYPES = new Set(['4dx', 'imax', 'screenx', 'superscreen'])

  for (const event of events) {
    const film = filmMap.get(event.filmId)
    if (!film) continue
    const dt = new Date(event.eventDateTime)
    const hh = String(dt.getUTCHours()).padStart(2, '0')
    const mm = String(dt.getUTCMinutes()).padStart(2, '0')
    const attrs = event.attributeIds || []
    const screenType = attrs.find(a => SCREEN_TYPES.has(a))?.toUpperCase() || '2D'
    film.showtimes.push({
      time: `${hh}:${mm}`,
      screenType,
      soldOut: event.soldOut || false,
      bookingLink: event.bookingLink || null,
    })
  }

  return Array.from(filmMap.values())
    .filter(f => f.showtimes.length > 0)
    .map(f => {
      f.showtimes.sort((a, b) => a.time.localeCompare(b.time))
      return f
    })
}
