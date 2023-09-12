import { createSlice } from '@reduxjs/toolkit';

const vehiclesSlice = createSlice({
	name: 'vehicles',
	initialState: [],
	reducers: {
		setVehicles: (_, action) => [...action.payload],
	},
});

export const { setVehicles } = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
