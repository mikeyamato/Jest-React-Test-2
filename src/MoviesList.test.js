import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';  // 'Invariant Violation: You should not use <Link> outside a <Router>'
import MoviesList from './MoviesList';

global.fetch = require('jest-fetch-mock');  // this replaces global fetch with mock fetch. right off the bat this will help resolve 'Network request failed' error but it will result in 'Unexpected end of JSON input' error off the bat. 

afterEach(() => {
	cleanup();
	console.error.mockClear();
});  // removes everything from the dom giving us a clean slate

console.error = jest.fn();

const movie = {
	results: [
	{
		id: 'hi',
		title: 'mike rules!',
		poster_path: '/this_is_one_path.jpg',
	},
	{
		id: 'bye',
		title: 'mike sucks!',
		poster_path: '/this_is_another_path.jpg',
	},
	{
		id: 'not_yet',
		title: 'mike is meh!',
		poster_path: '/this_is_one_more_path.jpg',
	},
]}

test('<MoviesList />, movies', async ()=>{
	// mock response
	fetch.mockResponseOnce(JSON.stringify(
		movie
	))
		
	const { debug, getByTestId, queryByTestId, getAllByTestId } = render(
		<MemoryRouter>
			<MoviesList />
		</MemoryRouter>
	); 
	expect(getByTestId('loading')).toBeTruthy();  // 'getBy' assumes it is there. 
	// await waitForElement(() => getByTestId('movie-map'));
	await waitForElement(() => getByTestId('movie-link'));
	// expect(getByTestId('loading')).toBeFalsy();  // getByTestId isn't going to work. need to use 'queryByTestId'
	expect(queryByTestId('loading')).toBeFalsy();  // while 'loading' existed previously, it doesn't exist anymore because movie data is received. 'queryBy' looks for something. 
	expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.results[0].id}`);  // repurposing this from movie.test.js
	// console.log('getAllByTestId:', getAllByTestId('movie-link').length);  // this matches the number we are feeding into via 'movie'
	expect(getAllByTestId('movie-link').length).toBe(movie.results.length);

	// debug(); 
	
	// expect(getByTestId('movie-map').textContent).toBe(movie.results[0].poster_path);


})