import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Counter from './Counter';

afterEach(cleanup);  // removes everything from the dom giving us a clean slate

test('<Counter Component>', () => {
	// renders component
	const {getByText, getByTestId, debug} = render(<Counter />);  // render can accept a bunch of react or a single react component

	// // outputs DOM as string
	// debug();  // debug gives insight as to what wrapper is looking at 

	const counterButton = getByTestId('counter-button');  // used to help clean up code
	
	// console.log(getByText('0').tagName);
	// asserts text value 0 is found within a button
	expect(getByText('0').tagName).toBe('BUTTON');  // this will break once the counter moves away from 0
	// asserts counter-button is a button
	expect(counterButton.tagName).toBe('BUTTON');  // this will break once the counter moves away from 0
	// asserts counter-button starts at 0
	expect(counterButton.textContent).toBe('0');  // this will break once the counter moves away from 0

	fireEvent.click(counterButton);
	expect(counterButton.textContent).toBe('1');
	fireEvent.click(counterButton);
	expect(counterButton.textContent).toBe('2');

	// debug();  // you can see that the state is now 2
})