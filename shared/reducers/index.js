import { combineReducers } from 'redux';
import summoner from './summonerReducer';
import champions from './championsReducer';
import matches from './matchReducer';

export default combineReducers({
	summoner,
	champions,
	matches,
})
