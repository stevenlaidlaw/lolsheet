import React from 'react';

export default class Error extends React.Component {
	render() {
		return (
			<div id="error" className="col-md-12">
				<p>{this.props.message}</p>
			</div>
		);
	}
}
