import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import NewMovie from './NewMovie';

afterEach(cleanup);  // removes everything from the dom giving us a clean slate

test('<NewMovie>', () => {
	const { debug, getByTestId, queryByTestId, container, getByText } = render(<NewMovie />);  // query is 
	
	// debug();

	expect(getByTestId("page-title").textContent).toBe("New Movie");
	expect(queryByTestId("movie-form").tagName).toBeTruthy();
	expect(container.firstChild).toMatchSnapshot();  // snapshot compares what has changed between what's been saved and anything new. saved to the _snapshots_ folder
	// console.log('**** container', container.firstChild)

	fireEvent.click(getByText('Submit'));
})