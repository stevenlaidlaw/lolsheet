import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Error from './global/Error';

export default class Home extends React.Component {
	// {/*<TodosView todos={todos} {...bindActionCreators(ApiAction, dispatch)} />*/}
	// {/*<TodosForm {...bindActionCreators(ApiAction, dispatch)}/>*/}
		
	render() {
		return (
			<div id="main">
				<div className="container">
					<div className="row">
						<Error message="Enter a summoner name above to get started"/>
					</div>
					
					<div className="row">
						<div className="col-xs-12">
							<h3>Popular Accounts</h3>
						</div>
						<div className="col-md-2 col-sm-3 col-xs-4">
							<table className="pro">
								<thead>
								<tr><th>SKT</th></tr>
								</thead>
								<tbody>
								<tr><td><Link to="/kr/SKT%20T1%20듀크">Duke</Link></td></tr>
								<tr><td><Link to="/kr/ASTCM">Bengi</Link></td></tr>
								<tr><td><Link to="/kr/SKT%20t1%20biank">Blank</Link></td></tr>
								<tr><td><Link to="/kr/hide%20on%20bush">Faker</Link></td></tr>
								<tr><td><Link to="/kr/SKT%20T1%20bang">Bang</Link></td></tr>
								<tr><td><Link to="/kr/SKT%20t1%20woif">Wolf</Link></td></tr>
								</tbody>
							</table>
						</div>
						<div className="col-md-2 col-sm-3 col-xs-4">
							<table className="pro">
								<thead>
								<tr><th>ROX</th></tr>
								</thead>
								<tbody>
								<tr><td><Link to="/kr/춘봉박">Smeb</Link></td></tr>
								<tr><td><Link to="/kr/ROX%20Peanut">Peanut</Link></td></tr>
								<tr><td><Link to="/kr/ROX%20Kuro">Kuro</Link></td></tr>
								<tr><td><Link to="/kr/ROX%20Cry">Cry</Link></td></tr>
								<tr><td><Link to="/kr/살기장인">Pray</Link></td></tr>
								<tr><td><Link to="/kr/ROX%20GorillA">GorillA</Link></td></tr>
								</tbody>
							</table>
						</div>
						<div className="col-md-2 col-sm-3 col-xs-4">
							<table className="pro">
								<thead>
								<tr><th>SSG</th></tr>
								</thead>
								<tbody>
								<tr><td><Link to="/kr/삼성갤럭시%20cuvee">CuVee</Link></td></tr>
								<tr><td><Link to="/kr/Arnbition">Ambition</Link></td></tr>
								<tr><td><Link to="/kr/삼성갤럭시%20Crown">Crown</Link></td></tr>
								<tr><td><Link to="/kr/삼성%20CoreJJ">CoreJJ</Link></td></tr>
								<tr><td><Link to="/kr/삼성갤럭시급식">Ruler</Link></td></tr>
								<tr><td><Link to="/kr/SSG%20Wra1th">Wraith</Link></td></tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

