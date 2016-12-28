import React, { PropTypes } from 'react';

const IMAGE_URL = 'http://ddragon.leagueoflegends.com/cdn/6.10.1/img/champion/';

export default class Champion extends React.Component {
	render() {
		return (
			<div className="col-md-2 col-sm-4 col-xs-6">
				<div className="champ">
					<img src={IMAGE_URL + this.props.url}/>
					<div className="name">{this.props.name}</div>
					<div className="wins">Wins: {this.props.wins}%</div>
					<div className="kda">KDA: {this.props.kda}</div>
				</div>
			</div>
		);
	}
}