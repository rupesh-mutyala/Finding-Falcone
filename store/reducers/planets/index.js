import { createSlice } from '@reduxjs/toolkit';

const planetsSlice = createSlice({
	name: 'planets',
	initialState: [],
	reducers: {
		setPlanets: (_, action) => [...action.payload],
	},
});

export const { setPlanets } = planetsSlice.actions;

export default planetsSlice.reducer;
