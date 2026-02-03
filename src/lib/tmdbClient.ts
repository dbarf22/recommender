import { TMDB } from '@lorenzopant/tmdb';
import { TMDB_API_KEY } from '$env/static/private';
const tmdbClient = new TMDB(TMDB_API_KEY)