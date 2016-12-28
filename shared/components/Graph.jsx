import React, { PropTypes } from 'react';

export default class Graph extends React.Component {
	render() {
		let {title, value, label, goal} = this.props;
		let color = '#AAA';
		const radius = 50;
		const thickness = 13;
		const ratio = value / goal > 1 ? 1 : value / goal;
		
		const style = {
			strokeDashoffset: (440 - (ratio) * (440 - 126)) + 'px'
		};
		
		if (value / goal >= 1) {
			color = '#50c690';
		} else if (value / goal >= 0.5) {
			color = '#F2E28B';
		} else {
			color = '#f26a4a';
		}
		
		return (
			<div className="col-md-2 col-sm-4 col-xs-6">
				<div className="stat">
					<div className="title">{title}</div>
					<div className="graph">
						<div className="value">{((value / goal) * 100).toFixed(0)}%</div>
						<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
							<g>
								<title>Layer 1</title>
								<circle id="bgCircle" className="bgCircle" r={radius} cy="50%" cx="50%"
												strokeWidth={thickness} stroke="#444" fill="none"/>
								<circle id={title} className="circle" r={radius} cy="50%" cx="50%"
												strokeWidth={thickness} stroke={color} fill="none"
												style={style}/>
							</g>
						</svg>
					</div>
					<div className="label">{label}</div>
					<div className="goal">Raw Score: {value.toFixed(2)} / {goal}</div>
				</div>
			</div>
		);
	}
}