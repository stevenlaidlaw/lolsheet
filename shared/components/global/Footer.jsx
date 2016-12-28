import React from 'react';
import { Link } from 'react-router';

export default class Footer extends React.Component {
	render() {
		return (
			<div>
				<div id="about">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h3>What is LolSheet.com?</h3>
								<p>LolSheet is an app designed to help you improve at League of Legends in two specific ways:</p>
								<ol>
									<li>Your six best champs are displayed to help show who you should be playing in your matches. A minimum of ten games with a champ is required for them to show, because we can all go on a lucky streak with any champ but you will average out over ten games.</li>
									<li>Using your last ten matches a series of graphs are created to help you see which areas you need to work on. There are a few set metrics to help improve in areas such as CSing, warding, map awareness, and dying. These metrics are listed under their respective graphs as the 'raw score'.</li>
								</ol>
							</div>
							<div className="col-md-6 col-sm-6">
								<h4>SUPPORT MAINS</h4>
								<p>If you're confused about the CS graphs, they are the sum or your own CS and the CS of your carry.</p>
							</div>
							
							<div className="col-md-6 col-sm-6">
								<h4>JUNGLE MAINS</h4>
								<p>Riot's API doesn't allow us to get CS@10 and CS@20 data for neutral monsters, so please ignore these metrics for now.</p>
							</div>
						</div>
					</div>
				</div>
				<div id="footer">
					<div className="container">
						<div className="row">
							<div id="copy" className="col-sm-10">&copy; 2016 <span className="white">LOLSHEET</span></div>
							<div className="col-sm-2">
								<Link to="/privacy">Privacy</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
