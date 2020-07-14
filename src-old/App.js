import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./components/Home";
import Post from './components/Post'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<div>
						<Route exact path="/" component={Home} />
						<Route exact path="/post" component={Post} />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
