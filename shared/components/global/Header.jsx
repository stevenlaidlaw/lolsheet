import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { clearChampions } from '../../actions/championsActions';
import { clearMatches } from '../../actions/matchActions';
import { clearSummoner } from '../../actions/summonerActions';

@connect(state => ({
	summoner: state.summoner
}))
export default class Header extends React.Component {
	constructor() {
		super();
		
		this.state = {
			summoner: '',
			region: 'na',
		};
	}
	
	handleTextChange(e) {
		this.setState({summoner: e.target.value});
	}
	
	handleRegionChange(e) {
		this.setState({region: e.target.value});
	}
	
	handleSubmit(e) {
		e.preventDefault();
		this.props.dispatch(clearSummoner());
		this.props.dispatch(clearChampions());
		this.props.dispatch(clearMatches());
		
		const path = '/' + this.state.region + '/' + this.state.summoner;
		this.props.history.push(path);
	};
	
	render() {
		return (
			<div id="header">
				<div className="container">
					<div className="row">
						<Link to="/" className="col-md-6 title">LOLSHEET</Link>
						<form>
							<div className="col-md-4">
								<input id="summonerName"
											 className="form-control"
											 placeholder="Insert summoner name..."
											 value={this.state.summoner}
											 onChange={this.handleTextChange.bind(this)}/>
							</div>
							<div className="col-md-1 col-xs-6">
								<select id="region"
												className="form-control"
												value={this.state.region}
												onChange={this.handleRegionChange.bind(this)}>
									<option value="br">BR</option>
									<option value="eune">EUNE</option>
									<option value="euw">EUW</option>
									<option value="jp">JP</option>
									<option value="kr">KR</option>
									<option value="lan">LAN</option>
									<option value="las">LAS</option>
									<option value="na">NA</option>
									<option value="oce">OCE</option>
									<option value="ru">RU</option>
									<option value="tr">TR</option>
								</select>
							</div>
							<div className="col-md-1 col-xs-6">
								<button id="submit" type="submit" className="btn btn-default" onClick={this.handleSubmit.bind(this)}>Go</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
