import axios from 'axios';

export function getMatches(region, summonerId) {
	return {
		type: 'GET_MATCHES',
		payload: axios.get('/api/matches/' + region + '/' + summonerId)
	}
}

export function clearMatches() {
	return {
		type: 'CLEAR_MATCHES'
	}
}