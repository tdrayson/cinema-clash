const VUE_BASE = 'https://www.myvue.com'

const HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'Mozilla/5.0',
}

export async function fetchCinemas() {
  const res = await fetch(`${VUE_BASE}/api/microservice/showings/cinemas`, {
    headers: HEADERS,
  })
  if (!res.ok) throw new Error(`Vue cinemas: ${res.status}`)
  const data = await res.json()

  const cinemas = []
  for (const group of data.result || []) {
    for (const cinema of group.cinemas || []) {
      cinemas.push({
        id: `vue-${cinema.cinemaId}`,
        rawId: String(cinema.cinemaId),
        name: cinema.cinemaName,
        fullName: cinema.fullName || cinema.cinemaName,
        chain: 'vue',
        address: cinema.address || cinema.cinemaAddress || null,
      })
    }
  }
  return cinemas
}

async function getSessionCookies(cinemaId) {
  const pageRes = await fetch(`${VUE_BASE}/cinema/${cinemaId}/whats-on`, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'text/html',
    },
    redirect: 'manual',
  })

  const cookies = pageRes.headers.getAll?.('set-cookie')
    || [pageRes.headers.get('set-cookie')].filter(Boolean)

  return cookies.map(c => c.split(';')[0]).join('; ')
}

export async function fetchFilms(rawId, date) {
  const cookieStr = await getSessionCookies(rawId)

  const res = await fetch(
    `${VUE_BASE}/api/microservice/showings/cinemas/${rawId}/films`,
    {
      headers: {
        ...HEADERS,
        'Cookie': cookieStr,
        'Referer': `${VUE_BASE}/cinema/${rawId}/whats-on`,
      },
    }
  )
  if (!res.ok) throw new Error(`Vue films: ${res.status}`)
  const data = await res.json()

  const VUE_SCREEN_ATTRS = new Set(['atmos', 'imax', '3d', 'laser', 'hdr', 'biggest-screen', 'epic', 'Lux', 'ultra-lux-and-lux', '4dx', 'screenx'])

  return (data.result || [])
    .map(film => {
      const group = (film.showingGroups || []).find(g => g.date.startsWith(date))

      const showtimes = group
        ? (group.sessions || []).map(s => {
            const attrs = s.attributes || []
            const screenAttr = attrs.find(a => VUE_SCREEN_ATTRS.has(a.value))
            const screenType = screenAttr
              ? (screenAttr.shortName || screenAttr.name)
              : '2D'
            return {
              time: s.startTime.includes('T') ? s.startTime.split('T')[1].slice(0, 5) : s.startTime,
              screenType,
              soldOut: s.isSoldOut || false,
              bookingLink: s.bookingUrl || null,
            }
          })
        : []

      const year = film.releaseDate ? new Date(film.releaseDate).getFullYear() : null

      return {
        title: film.filmTitle,
        posterUrl: film.posterImageSrc || null,
        durationMins: film.runningTime || null,
        releaseYear: year,
        showtimes,
      }
    })
    .filter(f => f.showtimes.length > 0)
}
