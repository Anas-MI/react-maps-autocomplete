import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./components/Home";
import Post from './components/Post'

class App extends Component {
	render() {
		return (
			<div className="App">
				<nav class="navbar navbar-expand-md bg-danger navbar-dark">

					<div class="navbar-brand-wrapper">
						<button class="" type="button" data-toggle="collapse" data-target="#x">
							<span class="navbar-toggler-icon"></span>
						</button>
						<a class="navbar-brand" href="#">LOGO</a>
						<button class="" type="button" data-toggle="collapse" data-target="#x">
							<span class="navbar-toggler-icon"></span>
						</button>
					</div>
				</nav>
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
