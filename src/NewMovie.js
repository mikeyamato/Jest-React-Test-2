import React, { Component } from 'react'; 
import MovieForm from './MovieForm';
import Movie from './Movie';

export default class NewMovie extends Component {
	render() {
		return (
			<div>
				<h1 data-testid="page-title">New Movie</h1>
				<MovieForm />
			</div>
		)
	}
}
