import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import MovieDetail from './MovieDetail';

global.fetch = require('jest-fetch-mock');  // this replaces global fetch with mock fetch. right off the bat this will help resolve 'Network request failed' error but it will result in 'Unexpected end of JSON input' error off the bat. 

afterEach(() => {
	cleanup();
	console.error.mockClear();
});  // removes everything from the dom giving us a clean slate

const match = {
	params: {
		id: 'mike'
	}
}

console.error = jest.fn();

const movie = {
	id: 'hi',
	title: 'mike rules!'
}

test('<MovieDetail />', async () => {  // async will be used for a good number of times
	// mock response
	fetch.mockResponseOnce(JSON.stringify(  // even if data exists, because Js is async this isn't going to always show. instead we can use `waitForElement` to serve data asyncronously. use with `getByText`. 
		movie
	));

	const { debug, getByText, getByTestId } = render(<MovieDetail match={match} />); 

	// console.log('*** movie',movie)
	// await waitForElement(() => getByText('mike rules!'));
	await waitForElement(() => getByTestId('movie-title'));  // doing it this way allows the code to be a bit more buttoned up and reduces transposing errors. 

	expect(getByTestId('movie-title').textContent).toBe(movie.title);

	// debug();
})