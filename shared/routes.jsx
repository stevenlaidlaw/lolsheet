import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/App';
import Home from 'components/Home';
import Summoner from 'components/Summoner';
import Privacy from 'components/global/Privacy';

export default (
	<Route name="app" component={App} path="/">
		<IndexRoute component={Home}/>
		<Route path="/*/*" component={Summoner}/>
		<Route path="/privacy" component={Privacy}/>
	</Route>
);
