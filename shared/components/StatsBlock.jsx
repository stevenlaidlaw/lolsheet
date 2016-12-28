import React, { PropTypes } from 'react';
import Loading from './global/Loading';
import Error from './global/Error';
import Graph from './Graph';

export default class StatsBlock extends React.Component {
	render() {
		let html = [];
		if (this.props.matches.fetched) {
			let data = this.props.matches.data;
			html.push(<Graph title="CS @ 10" value={data.csAt10Average} label="Creep score at 10 minutes" goal="80"/>);
			html.push(<Graph title="CS @ 20" value={data.csAt20Average} label="Creep score at 20 minutes" goal="160"/>);
			html.push(<Graph title="KDA" value={data.kdaAverage} label="(Kills + Assists) / Deaths" goal="3"/>);
			html.push(<Graph title="Vision Wards" value={data.wardAverage} label="Average bought per 10 minutes" goal="1"/>);
			html.push(<Graph title="Wards Killed" value={data.wardKillAverage} label="Average per 10 minutes" goal="2"/>);
			html.push(<Graph title="Wards Placed" value={data.wardsPlacedAverage} label="Average per 10 minutes" goal="4"/>);
			html.push(<Graph title="Kill Participation" value={data.killParticipationAverage} label="Total Kill Participation" goal="0.5"/>);
		} else if (this.props.matches.error) {
			html.push(<Error message={this.props.matches.error}/>)
		} else {
			html.push(<Loading message="Getting match data"/>)
		}
		
		const style = {
			note: {
				fontStyle: 'italic',
				fontSize: '80%',
				color: '#FF5555',
				textAlign: 'center',
			}
		};
		
		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="rowHeader">Average stats<span>Over the last 10 matches</span></div>
				</div>
				
				<div className="row" id="statsRow">
					{html.map((object) => object)}
				</div>
				
				<div style={style.note}>Control wards are currently not working as expected due to an issue with the Riot API. Once the API is fixed it should start working again automatically.</div>
			</div>
		);
	}
}

