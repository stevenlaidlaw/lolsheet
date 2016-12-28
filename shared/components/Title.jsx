import React, { PropTypes } from 'react';

export default class Title extends React.Component {
	render() {
		const { rankedLeague, name, lp, wins, losses, division } = this.props.summoner.data;
		const ratio = Math.round((wins / (wins + losses)) * 100);
		
		return (
			<div className="row" id="headerRow">
				<div className="col-sm-2">
					<div id="rankedLogo">
						<img src={'/images/base_icons/' + rankedLeague.toLowerCase() + '.png'}/>
					</div>
				</div>
				<div className="col-sm-10">
					<div id="summonerInfo">{name}</div>
					<div id="league">{rankedLeague} {division} | {lp}LP</div>
					<div id="ratio">Win Ratio: {ratio}%</div>
					<div id="winloss"><span id="win">W</span>{wins} / <span id="loss">L</span>{losses}</div>
				</div>
			</div>
		);
	}
}