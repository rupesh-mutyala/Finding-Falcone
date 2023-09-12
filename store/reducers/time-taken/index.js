import { createSlice } from '@reduxjs/toolkit';

const timeTakenSlice = createSlice({
	name: 'Time Taken',
	initialState: {},
	reducers: {
		setTimeTaken: (state, action) => ({ ...state, ...action.payload }),
		resetTimeTaken: () => ({}),
	},
});

export const { setTimeTaken, resetTimeTaken } = timeTakenSlice.actions;

export default timeTakenSlice.reducer;
