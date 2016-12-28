import React from 'react';

export default class Loading extends React.Component {
	render() {
		return (
			<div id="error">
				<p>{this.props.message}</p>
				<img id="loading" src="/images/ripple.svg"/>
			</div>
		);
	}
}
