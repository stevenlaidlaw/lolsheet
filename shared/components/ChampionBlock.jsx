import React, { PropTypes } from 'react';
import Loading from './global/Loading';
import Error from './global/Error';
import Champion from './Champion';

import championData from '../lib/champions';

export default class ChampionBlock extends React.Component {
	render() {
		let html = '';
		if (this.props.champions.fetched) {
			html = this.props.champions.data.map(champ => <Champion url={championData[champ.id].image.full} name={championData[champ.id].name} wins={champ.winPercent} kda={champ.kda}/>);
		} else if (this.props.champions.error) {
			html = <Error message={this.props.champions.error}/>
		} else {
			html = <Loading message="Getting champion data"/>
		}
		
		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="rowHeader">Best champions<span>Minimum 10 Matches</span></div>
				</div>
				
				<div className="row" id="championRow">
					{html}
				</div>
			</div>
		);
	}
}

