import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './maps/mapSlice';

export default configureStore({
	reducer: {
		mapsData: mapReducer,
	},
});