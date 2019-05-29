import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import MovieForm from './MovieForm';

afterEach(cleanup);  // removes everything from the dom giving us a clean slate

// const onSubmit = () => console.log('hi');  // commented out to create a mock function
const onSubmit = jest.fn();  // mock function (aka spy). helps determine if a function was called. 

test('<MovieForm />', ()=>{
	const { debug, getByTestId, queryByTestId, container, getByText, getByLabelText } = render(<MovieForm submitForm={onSubmit}/>);

	expect(queryByTestId("movie-form").tagName).toBeTruthy();
	// console.log('Text:', getByLabelText('Text').outerHTML);
	getByLabelText('Text').value = 'hello';
	fireEvent.change(getByLabelText('Text'));
	fireEvent.click(getByText('Submit'));
	expect(onSubmit).toHaveBeenCalledTimes(1);   // onSubmit references the above function
	expect(onSubmit).toHaveBeenCalledWith({
		text: 'hello'
	});

	// console.log('Mock', onSubmit.mock.calls[0][0])
})