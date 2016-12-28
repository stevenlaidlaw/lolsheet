import axios from 'axios';

export function getSummoner(region, summonerName) {
  return {
    type: 'GET_SUMMONER',
  	payload: axios.get('/api/summoner/' + region + '/' + summonerName)
  }
}

export function clearSummoner() {
	return {
		type: 'CLEAR_SUMMONER'
	}
}

