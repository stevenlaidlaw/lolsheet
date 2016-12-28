import axios from 'axios';

export function getChampions(region, summonerId) {
	return {
		type: 'GET_CHAMPIONS',
		payload: axios.get('/api/rankedData/' + region + '/' + summonerId)
	}
}

export function clearChampions() {
	return {
		type: 'CLEAR_CHAMPIONS'
	}
}