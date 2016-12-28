import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getChampions, clearChampions } from '../actions/championsActions';
import { getMatches, clearMatches } from '../actions/matchActions';
import { getSummoner, clearSummoner } from '../actions/summonerActions';

import Loading from './global/Loading';
import Error from './global/Error';
import Title from './Title';
import ChampionsBlock from './ChampionBlock';
import GraphBlock from './StatsBlock';

@connect(state => ({
	summoner: state.summoner,
	champions: state.champions,
	matches: state.matches,
}))
export default class Summoner extends React.Component {
	componentWillMount() {
		this.props.dispatch(clearSummoner());
		this.props.dispatch(clearChampions());
		this.props.dispatch(clearMatches());
		this.getData(this.props);
	}
	
	componentWillReceiveProps(newProps) {
		this.getData(newProps);
	}
	
	getData(props) {
		// Did we come here directly?
		if (props.summoner.fetched === false && props.summoner.fetching === false && props.summoner.error === null) {
			// Get the summoner data from the URL
			this.props.dispatch(clearChampions());
			this.props.dispatch(clearMatches());
			props.dispatch(getSummoner(props.routeParams.splat[0], props.routeParams.splat[1]));
		}
		
		// Get the champions data
		if (props.summoner.fetched && props.champions.fetched === false && props.champions.fetching === false && props.summoner.error === null) {
			props.dispatch(getChampions(props.summoner.data.region, props.summoner.data.id));
		}
		
		// Get the matches data
		if (props.summoner.fetched && props.matches.fetched === false && props.matches.fetching === false && props.summoner.error === null) {
			props.dispatch(getMatches(props.summoner.data.region, props.summoner.data.id));
		}
	}
	
	render() {
		
		let header = '';
		let champions = '';
		let graph = '';
		
		if (this.props.summoner.fetched) {
			header = <Title summoner={this.props.summoner}/>;
			champions = <ChampionsBlock champions={this.props.champions}/>;
			graph = <GraphBlock matches={this.props.matches}/>;
		} else if (this.props.summoner.error) {
			header = <Error message={this.props.summoner.error}/>
		} else {
			header = <Loading message="Getting summoner data"/>
		}
		
		return (
			<div id="main">
				<div className="container">
					{header}
					{champions}
					{graph}
				</div>
			</div>
		);
	}
}

