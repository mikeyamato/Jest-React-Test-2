import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import Movie, { POSTER_PATH } from './Movie';

afterEach(() => {  // to reset spy between test to avoid '["Warning: Failed prop type: The prop `movie` is marked as required in `Movie`, but its value is `undefined`. in Movie (at Movie.test.js:14)"]'
	cleanup();  // removes everything from the dom giving us a clean slate
	console.error.mockClear();  // specific Jest action. https://jestjs.io/docs/en/mock-function-api#mockfnmockclear
});  

console.error = jest.fn();  // errors can be mocked if we're expecting an error

test('<Movie /> w/o data', () => {
	const {  } = render(<Movie />);
	
	expect(console.error).toHaveBeenCalled();
})

const movie = {
	title: 'this_is_the_title',
	poster_path: '/this_is_the_path.jpg',
	id: 'this_is_the_id',
};

test('<Movie /> w data', () => {
	// const {  } = render(<Movie movie={movie}/>);  // must add `<MemoryRouter>` or else expect the error, 'Invariant Violation: You should not use <Link> outside a <Router>'
	const { debug, getByTestId } = render(
		<MemoryRouter>
			<Movie movie={movie}/>
		</MemoryRouter>
	);
	
	expect(console.error).not.toHaveBeenCalled();  // 'not' negates
	expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);  // always ask yourself, what is it that i should be testing for. what should I be getting back?. getAttribute gets part of the URL and not the entire address as it can change depending on the environment.
	expect(getByTestId('movie-img').src).toBe(`${POSTER_PATH}${movie.poster_path}`);  

	// debug();
})
