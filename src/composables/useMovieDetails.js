import { tmdbFetch, omdbFetch, tmdbImage } from '../utils/api.js'
import { normalizeRatings } from '../utils/ratings.js'

function pickTrailerKey(videos) {
  if (!videos || !videos.results) return null
  const ytVideos = videos.results.filter(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  )
  const official = ytVideos.find((v) => v.official) || ytVideos[0]
  if (official) return official.key

  const anyYT = videos.results.find(
    (v) => v.site === 'YouTube' && (v.type === 'Teaser' || v.type === 'Clip')
  )
  return anyYT ? anyYT.key : null
}

function getDirector(credits) {
  if (!credits || !credits.crew) return null
  const director = credits.crew.find((c) => c.job === 'Director')
  return director ? director.name : null
}

export async function fetchMovieDetails(tmdbId) {
  const data = await tmdbFetch(`/movie/${tmdbId}`, {
    append_to_response: 'credits,videos,external_ids',
  })

  let omdbRatings = []
  const imdbId = data.external_ids?.imdb_id || data.imdb_id
  if (imdbId) {
    try {
      const omdb = await omdbFetch({ i: imdbId })
      if (omdb.Ratings) omdbRatings = omdb.Ratings
    } catch {
      // OMDB failure is non-fatal
    }
  }

  const { ratings, overall } = normalizeRatings(data.vote_average, omdbRatings)

  const cast = (data.credits?.cast || []).slice(0, 5).map((c) => ({
    name: c.name,
    character: c.character,
    profileUrl: tmdbImage(c.profile_path, 'w185'),
  }))

  return {
    id: data.id,
    title: data.title,
    year: data.release_date ? data.release_date.substring(0, 4) : '',
    runtime: data.runtime ? `${data.runtime}m` : null,
    director: getDirector(data.credits),
    overview: data.overview,
    posterUrl: tmdbImage(data.poster_path, 'w500'),
    genres: (data.genres || []).map((g) => g.name),
    cast,
    ratings,
    overall,
    trailerKey: pickTrailerKey(data.videos),
  }
}
